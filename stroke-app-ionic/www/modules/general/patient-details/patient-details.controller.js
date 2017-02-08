'use strict';

angular.module('app.general').controller('PatientDetailsController', PatientDetailsController);

PatientDetailsController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'DateTimeService']; 

function PatientDetailsController($scope, $state, $ionicPopup, PatientCacheService, DateTimeService) {
 
    var vm = this; // S2

    vm.doorDate = null;
    vm.doorTime = null;
    vm.onsetDate = null;
    vm.onsetTime = null;
    vm.timeSinceOnsetText = "";
    vm.isOnsetLastSeenWell = null;
    vm.isOnsetBestEstimate = null;

    vm.isNextButtonEnabled = isNextButtonEnabled;
    vm.onNext = onNext;
    vm.onDoorNow = onDoorNow;
    vm.onOnsetNow = onOnsetNow;
    vm.onOnsetChanged = onOnsetChanged;

    function isNextButtonEnabled() {
        var isEnabled = false;
        if(vm.doorDate && vm.doorTime && vm.onsetDate && vm.onsetTime && vm.isOnsetLastSeenWell != null && vm.isOnsetBestEstimate != null){
    		isEnabled = true;
    	}
        return isEnabled;
    }

    function onNext() {
        showDataValidationPopup(dataValid);
    }

    function dataValid() {
        saveData();
        $state.go('gcs-entry');
    }

    function onDoorNow() {
        var now = new Date();
        now.setSeconds(0);
        now.setMilliseconds(0);
        vm.doorDate = now;
        vm.doorTime = now;
    }

    function onOnsetNow() {
        var now = new Date();
        now.setSeconds(0);
        now.setMilliseconds(0);
        vm.onsetDate = now;
        vm.onsetTime = now;
        onOnsetChanged();
    }

    function onOnsetChanged() {
        if (vm.onsetDate && vm.onsetTime) {
            vm.timeSinceOnsetText = DateTimeService.getTimeSinceOnsetText(new Date(), vm.onsetDate, vm.onsetTime);
        }
    }

    function saveData() {
        var doorDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.doorDate, vm.doorTime);
        var onsetDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.onsetDate, vm.onsetTime);
        PatientCacheService.setDoorDateTime(doorDateTime);
        PatientCacheService.setOnsetDateTime(onsetDateTime);
        PatientCacheService.setIsLastSeenWellOnset(vm.isOnsetLastSeenWell);
        PatientCacheService.setIsBestEstimateOnset(vm.isOnsetBestEstimate);
    }

    function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/general/patient-details/patient-details-data-validation-popup.html',
            title: 'Data validation',
            subTitle: 'Please confirm data entered is correct',
            cssClass: 'wide-popup',
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
