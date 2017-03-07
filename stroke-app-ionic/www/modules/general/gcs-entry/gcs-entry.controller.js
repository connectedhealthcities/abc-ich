'use strict';

angular.module('app.general').controller('GcsEntryController', GcsEntryController);

GcsEntryController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'GCS_THRESHOLD', 'DemoModeCacheService'];

function GcsEntryController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, GCS_THRESHOLD, DemoModeCacheService) {

    var vm = this; // S3

    TabStateCacheService.setCurrentState('gcs-entry');
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

    vm.eye = null;
    vm.verbal = null;
    vm.motor = null;
    vm.total = null;

    vm.gcsValueChanged = gcsValueChanged;
    vm.isNextButtonEnabled = isNextButtonEnabled;
    vm.onNext = onNext;

    function gcsValueChanged() {
    	if(vm.eye && vm.verbal && vm.motor){
    		vm.total = vm.eye + vm.verbal + vm.motor;
    	}
    }

    function isNextButtonEnabled() {
        return vm.total != null;
    }
    
    function onNext() {
        showDataValidationPopup(handleDataValid);
    }

    function handleDataValid() {
        saveData();
        if (vm.total < GCS_THRESHOLD) {
            showStabilisePatientPopup(goNextState);
        }
        else {
            goNextState();
        }
     }

     function goNextState() {
        $state.go('tabs.anticoagulant-identification');
     }

    function saveData() {
        PatientCacheService.setGcsScoreEye(vm.eye);       
        PatientCacheService.setGcsScoreVerbal(vm.verbal);
        PatientCacheService.setGcsScoreMotor(vm.motor);
        PatientCacheService.setGcsScore(vm.total);
    }

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
