'use strict';

angular.module('app.general').controller('RegisterPatientController', RegisterPatientController);

RegisterPatientController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'DateTimeService', 'PatientHttpService', 'HospitalHttpService'];

function RegisterPatientController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, DateTimeService, PatientHttpService, HospitalHttpService) {

    var vm = this; // S1

    TabStateCacheService.setCurrentState('register-patient');

    vm.hospitals = [];
    HospitalHttpService.getHospitals().then(function(hospitals) {
        for (var i = 0; i < hospitals.length; i++) {
            vm.hospitals.push(hospitals[i]);
        }
        vm.hospitals.push({"uniqueId": "Other"});
    });

    vm.isDateOfBirthKnown = null;
    vm.isExternalScan = null;

    vm.initials = null;
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
        var allowDuplicate = false;
        PatientHttpService.registerPatient(vm.initials, vm.dateOfBirth, vm.estimatedAge, allowDuplicate).then(function(response) {
            if (response.isDuplicate) {
                showPatientAlreadyRegisteredPopup(confirmRegisterPatient, cancelRegisterPatient);
            }
            else {
                 savePatient(response.uniqueId);
            }
        });       
    }

    function confirmRegisterPatient() {
        var allowDuplicate = true;
        PatientHttpService.registerPatient(vm.initials, vm.dateOfBirth, vm.estimatedAge, allowDuplicate).then(function(response) {
            savePatient(response.uniqueId);
        });       
    }

    function savePatient(uniqueId) {
        saveData(uniqueId);
        showPatientNotesPopup(goNextState);
    }

    function goNextState() {
        $state.go('patient-details');
    }

    function cancelRegisterPatient() {
        $state.go('patient-start');
    }
 
    function saveData(uniqueId) {
        PatientCacheService.setUniqueId(uniqueId);
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
            cssClass: 'chi-wide-popup'
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(okHandler);
    }
}
