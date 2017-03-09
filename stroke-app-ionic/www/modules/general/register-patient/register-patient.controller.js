'use strict';

angular.module('app.general').controller('RegisterPatientController', RegisterPatientController);

RegisterPatientController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'DateTimeService', 'PatientHttpService', 'HospitalHttpService', 'DemoModeCacheService', 'STATE_REGISTER_PATIENT', 'STATE_PATIENT_START', 'STATE_PATIENT_DETAILS'];

function RegisterPatientController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, DateTimeService, PatientHttpService, HospitalHttpService, DemoModeCacheService, STATE_REGISTER_PATIENT, STATE_PATIENT_START, STATE_PATIENT_DETAILS) {

    var vm = this; // S1

    TabStateCacheService.setCurrentState(STATE_REGISTER_PATIENT);
    vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

    vm.hospitals = [];
    HospitalHttpService.getHospitals().then(function(hospitals) {
        for (var i = 0; i < hospitals.length; i++) {
            vm.hospitals.push(hospitals[i]);
        }
        vm.hospitals.push({"name": "Other"});
    });

    vm.isDateOfBirthKnown = null;
    vm.isExternalScan = null;

    vm.initials = null;
    vm.day = null;
    vm.month = null;
    vm.year = null;
    vm.dateOfBirth = null;
    vm.estimatedAge = null;
    vm.scanDate = null;
    vm.scanTime = null;
    vm.selectedHospital = null;
    vm.otherHospital = null;

    vm.onNext = onNext;
    vm.isNextButtonEnabled = isNextButtonEnabled;
    vm.onScanNow = onScanNow;
    vm.isDateOfBirthKnownChanged = isDateOfBirthKnownChanged;
    vm.isExternalScanChanged = isExternalScanChanged;
    vm.selectedHospitalChanged = selectedHospitalChanged;
    vm.onInitialsChanged = onInitialsChanged;
    vm.onDateChanged = onDateChanged;

    function isNextButtonEnabled() {
        var isEnabled = false;

        if (vm.initials != null) {
            if (vm.isDateOfBirthKnown != null) {
                if ((vm.isDateOfBirthKnown && vm.dateOfBirth != null) || 
                    (!vm.isDateOfBirthKnown && vm.estimatedAge != null)) {
                    if (vm.isExternalScan != null) {
                        if ( (!vm.isExternalScan && vm.scanDate != null && vm.scanTime != null) ||
                             (vm.isExternalScan && vm.selectedHospital != null && vm.selectedHospital != "Other") ||
                             (vm.isExternalScan && vm.selectedHospital != null && vm.selectedHospital == "Other" && vm.otherHospital != null) ) {
                            isEnabled = true;
                        }
                    }
                }
            }
        }

        return isEnabled;
    }

    function onNext() {
        showDataValidationPopup(handleDataValid);
    }

    function handleDataValid() {
        if (vm.isDemoMode) {
            vm.uniqueId = "demo-mode-patient";
            savePatient("demo-mode-patient", 0);
        }
        else {
            var isDuplicateAllowed = false;
            PatientHttpService.registerPatient(vm.initials, vm.dateOfBirth, vm.estimatedAge, isDuplicateAllowed).then(function(response) {
                if (response.success) {
                    vm.uniqueId = response.patient.uniqueId;
                    if (response.patient.isDuplicate) {
                        showPatientAlreadyRegisteredPopup(confirmRegisterPatient, cancelRegisterPatient);
                    }
                    else {
                        savePatient(response.patient.uniqueId, response.patient.id);
                    }
                }
                else {
                    showPatientRegistrationFailedPopup(handleRegistrationFailed);
                }
            });       
        }
    }

    function confirmRegisterPatient() {
        var isDuplicateAllowed = true;
        PatientHttpService.registerPatient(vm.initials, vm.dateOfBirth, vm.estimatedAge, isDuplicateAllowed).then(function(response) {
            vm.uniqueId = response.patient.uniqueId;
            if (response.success) {
                savePatient(response.patient.uniqueId, response.patient.id);
            }
            else {
                showPatientRegistrationFailedPopup(handleRegistrationFailed);
            }
        });       
    }

    function cancelRegisterPatient() {
         $state.go(STATE_PATIENT_START);
     }

    function savePatient(uniqueId, id) {
        saveData(uniqueId, id);
        showPatientNotesPopup(goNextState);
    }

    function goNextState() {
        $state.go(STATE_PATIENT_DETAILS);
    }

    function handleRegistrationFailed() {
        $state.go(STATE_PATIENT_START);
    }
 
    function saveData(uniqueId, id) {
        PatientCacheService.setUniqueId(uniqueId);
        PatientCacheService.setId(id);        
        PatientCacheService.setInitials(vm.initials);
        if (vm.isDateOfBirthKnown) {
            PatientCacheService.setBirthDate(vm.dateOfBirth);
        }
        else {
            PatientCacheService.setEstimatedAge(vm.estimatedAge);
        }
        if (vm.isExternalScan) {
            if (vm.selectedHospital === "Other") {
                PatientCacheService.setExternalScanHospitalName(vm.otherHospital);
            }
            else {
                PatientCacheService.setExternalScanHospitalName(vm.selectedHospital);
            }
        }
        else {
            var scanDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.scanDate, vm.scanTime);
            PatientCacheService.setScanDateTime(scanDateTime);
        }
    }

    function isDateOfBirthKnownChanged() {
        vm.day = null;
        vm.month = null;
        vm.year = null;
        vm.dateOfBirth = null;
        vm.estimatedAge = null;
    }

    function isExternalScanChanged() {
        vm.scanDate = null;
        vm.scanTime = null;
        vm.selectedHospital = null;
        vm.otherHospital = null;
    }

    function selectedHospitalChanged() {
        vm.otherHospital = null;
    }

    function onScanNow() {
        var now = DateTimeService.getNowWithZeroSeconds();
        vm.scanDate = now;
        vm.scanTime = now;
    }

    function onInitialsChanged(initials) {
        vm.initials = initials.toUpperCase();
    }

    function onDateChanged() {
        if (vm.day != null && vm.month != null && vm.year != null) {
            vm.dateOfBirth = new Date(vm.year, vm.month-1, vm.day);
        }
    }

    function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/general/register-patient/register-patient-data-validation-popup.html',
            title: 'Data validation',
            subTitle: 'Please confirm data entered is correct',
            cssClass: 'chi-wide-popup',
            scope: $scope
        };       
        var popup = $ionicPopup.confirm(popupTemplate);

        popup.then(function(res) {
            if (res) {
                okHandler();
            }
        });
    }

    function showPatientAlreadyRegisteredPopup(okHandler, cancelHandler) {
        var popupTemplate = {
            templateUrl: 'modules/general/register-patient/patient-already-registered-popup.html',
            title: 'Patient already registered',
            cssClass: 'chi-wide-popup',
            scope: $scope
        };       
        var popup = $ionicPopup.confirm(popupTemplate);

        popup.then(function(res) {
            if (res) {
                okHandler();
            }
            else {
                cancelHandler();
            }
        });
    }

    function showPatientNotesPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/general/register-patient/patient-notes-popup.html',
            title: 'Patient notes',
            cssClass: 'chi-wide-popup',
            scope: $scope
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(okHandler);
    }

    function showPatientRegistrationFailedPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/general/register-patient/patient-registration-failed-popup.html',
            title: 'Patient registration failed',
            cssClass: 'chi-wide-popup'
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(okHandler);
    }
    
}
