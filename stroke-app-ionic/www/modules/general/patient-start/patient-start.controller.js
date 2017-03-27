'use strict';

angular.module('app.general').controller('PatientStartController', PatientStartController);

PatientStartController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientStartControllerService', 'PatientCacheService', 'StateCacheService', 'BpStateCacheService', 'DemoModeCacheService', 'STATE_REGISTER_PATIENT'];

function PatientStartController($scope, $state, $ionicPopup, PatientStartControllerService, PatientCacheService, StateCacheService, BpStateCacheService, DemoModeCacheService, STATE_REGISTER_PATIENT) {
 
    var vm = this;

    function init() {
        DemoModeCacheService.setIsDemoMode(false);

        // initialise vm parameter for header row
        vm.patientId = PatientCacheService.getUniqueId();

        // Setup click handlers
        vm.onNewPatient = onNewPatient;
        vm.onResumePatient = onResumePatient;

        // Setup show/hide handlers
        vm.isShowResumePatient = isShowResumePatient
    }

    init();

    // Click handlers
    function onNewPatient() {
        if (vm.patientId !== null) {
            showConfirmNewPatientPopup(startNewPatient);
        }
        else {
            startNewPatient();
        }
   }

    function onResumePatient() {
        StateCacheService.goCurrentState();
    }

    // Show/hide handlers
    function isShowResumePatient() {
        return PatientStartControllerService.isShowResumePatient(vm.patientId);
    }

    // Private functions
    function startNewPatient() {
        PatientCacheService.clearAll();
        StateCacheService.clearAll();
        BpStateCacheService.clearAll();
 
        saveData();

        $state.go(STATE_REGISTER_PATIENT);
    }

    function saveData() {
       PatientCacheService.setAppStartDateTime(new Date());
    }

    // Popups
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
