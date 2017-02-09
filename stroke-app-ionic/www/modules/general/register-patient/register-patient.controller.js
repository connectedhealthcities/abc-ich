'use strict';

angular.module('app.general').controller('RegisterPatientController', RegisterPatientController);

RegisterPatientController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'DateTimeService', 'PatientHttpService', 'ConfigurationCacheService'];

function RegisterPatientController($scope, $state, $ionicPopup, PatientCacheService, DateTimeService, PatientHttpService, ConfigurationCacheService) {

    var vm = this; // S1

    var hospitals = ConfigurationCacheService.getHospitals();
    hospitals.push({"name": "Other"});
    vm.hospitals = hospitals;

    vm.patientId = null;

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
        showDataValidationPopup(handleDataIsValid);
    }

    function handleDataIsValid() {
        saveData();

        PatientHttpService.registerPatient(vm.initials).then(function(response) {
            vm.patientId = response.patientId;
            PatientCacheService.setUniqueId(response.patientId);
            if (response.alreadyRegistered) {
                showPatientAlreadyRegisteredPopup(registerNewPatient, cancelRegisterPatient);
            }
            else {
                registerNewPatient();
            }
        });       
    }

    function registerNewPatient() {
        showPatientNotesPopup(goNextState);
    }

     function goNextState() {
        $state.go('patient-details');
     }

    function cancelRegisterPatient() {
        $state.go('patient-start');
    }
 
    function saveData() {
        PatientCacheService.setUniqueId("dummy_unique_id");//cjd
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

    function onScanNow() {
        var now = new Date();
        now.setSeconds(0);
        now.setMilliseconds(0);
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
