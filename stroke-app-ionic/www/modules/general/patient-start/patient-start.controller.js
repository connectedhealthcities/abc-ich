'use strict';

angular.module('app.general').controller('PatientStartController', PatientStartController);

PatientStartController.$inject = ['$scope', '$state', '$ionicPopup', 'TabStateCacheService', 'PatientCacheService', 'BpStateCacheService', 'DemoModeCacheService', 'STATE_REGISTER_PATIENT'];

function PatientStartController($scope, $state, $ionicPopup, TabStateCacheService, PatientCacheService, BpStateCacheService, DemoModeCacheService, STATE_REGISTER_PATIENT) {
 
    var vm = this; // S17

    DemoModeCacheService.setIsDemoMode(false);
    vm.patientId = PatientCacheService.getUniqueId();

    vm.onNewPatient = onNewPatient;
    vm.onResumePatient = onResumePatient;

    function onNewPatient() {
        if (vm.patientId) {
            showConfirmNewPatientPopup(startNewPatient);
        }
        else {
            startNewPatient();
        }
     }

    function startNewPatient() {
        PatientCacheService.clearAll();
        TabStateCacheService.clearAll();
        BpStateCacheService.clearAll();
 
        PatientCacheService.setAppStartDateTime(new Date());
 
        $state.go(STATE_REGISTER_PATIENT);
    }

    function onResumePatient() {
        TabStateCacheService.goCurrentState();
    }

    function showConfirmNewPatientPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/general/patient-start/confirm-new-patient-popup.html',
            title: 'Confirm new patient',
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
}
