'use strict';

angular.module('app.general').controller('GcsEntryController', GcsEntryController);

GcsEntryController.$inject = ['$scope', '$state', '$ionicPopup', 'GcsEntryControllerService', 'PatientCacheService', 'StateCacheService', 'GCS_THRESHOLD', 'DemoModeCacheService', 'STATE_GCS_ENTRY', 'STATE_ANTICOAGULANT_IDENTIFICATION'];

function GcsEntryController($scope, $state, $ionicPopup, GcsEntryControllerService, PatientCacheService, StateCacheService, GCS_THRESHOLD, DemoModeCacheService, STATE_GCS_ENTRY, STATE_ANTICOAGULANT_IDENTIFICATION) {

    var vm = this;

    function init() {
        // set current state
        StateCacheService.setCurrentState(STATE_GCS_ENTRY);

        // initialise vm parameters
        vm.patientId = PatientCacheService.getUniqueId();
        vm.isDemoMode = DemoModeCacheService.getIsDemoMode();
        vm.eyeValue = null;
        vm.verbalValue = null;
        vm.motorValue = null;
        vm.gcsTotal = null;

        // Setup click handlers
        vm.onNext = onNext;

        // Setup change handlers
        vm.gcsValueChanged = gcsValueChanged;

        // Setup enable/disable handlers
        vm.isNextButtonEnabled = isNextButtonEnabled;
    }

    init();

    // Click handlers
    function onNext() {
        showDataValidationPopup(handleDataValid);
    }

    // Change handlers
    function gcsValueChanged() {
    	vm.gcsTotal = GcsEntryControllerService.getGcsTotal(vm.eyeValue, vm.verbalValue, vm.motorValue);
    }

    // Enable/disable handlers
    function isNextButtonEnabled() {
        return GcsEntryControllerService.isNextButtonEnabled(vm.eyeValue, vm.verbalValue, vm.motorValue)
    }
    
    // Private functions
    function handleDataValid() {
        saveData();
        if (vm.gcsTotal < GCS_THRESHOLD) {
            showStabilisePatientPopup(goNextState);
        }
        else {
            goNextState();
        }
     }

    function saveData() {
        PatientCacheService.setGcsScoreEye(vm.eyeValue);       
        PatientCacheService.setGcsScoreVerbal(vm.verbalValue);
        PatientCacheService.setGcsScoreMotor(vm.motorValue);
        PatientCacheService.setGcsScore(vm.gcsTotal);
     }

     function goNextState() {
        $state.go(STATE_ANTICOAGULANT_IDENTIFICATION);
     }

    // Popups
    function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/general/gcs-entry/gcs-entry-data-validation-popup.html',
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

    function showStabilisePatientPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/general/gcs-entry/stabilise-patient-popup.html',
            title: 'Stabilise patient',
            cssClass: 'chi-wide-popup'
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(okHandler);
    }
}
