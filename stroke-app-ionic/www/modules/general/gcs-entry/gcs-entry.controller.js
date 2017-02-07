'use strict';

angular.module('app.general').controller('GcsEntryController', GcsEntryController);

GcsEntryController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService'];

function GcsEntryController($scope, $state, $ionicPopup, PatientCacheService) {

    var vm = this; // S3

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
        showDataValidationPopup(dataValid);
    }

    function dataValid() {
        saveData();
        if (vm.total < 9) {
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
            templateUrl: 'modules/general/gcs-entry/data-validation-popup.html',
            title: 'Data validation',
            subTitle: 'Please confirm data entered is correct',
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
            title: 'Stabilise patient'
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(okHandler);
    }
}
