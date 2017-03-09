'use strict';

angular.module('app.general').controller('PatientDetailsController', PatientDetailsController);

PatientDetailsController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'DateTimeService', 'DemoModeCacheService', 'STATE_PATIENT_DETAILS', 'STATE_GCS_ENTRY']; 

function PatientDetailsController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, DateTimeService, DemoModeCacheService, STATE_PATIENT_DETAILS, STATE_GCS_ENTRY) {
 
    var vm = this; // S2

    TabStateCacheService.setCurrentState(STATE_PATIENT_DETAILS);
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

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
        if( vm.doorDate != null &&
            vm.doorTime != null && 
            vm.onsetDate != null && 
            vm.onsetTime != null && 
            vm.isOnsetLastSeenWell != null 
            && vm.isOnsetBestEstimate != null) {
    		isEnabled = true;
    	}
        return isEnabled;
    }

    function onNext() {
        showDataValidationPopup(handleDataValid);
    }

    function handleDataValid() {
        saveData();
        $state.go(STATE_GCS_ENTRY);
    }

    function onDoorNow() {
        var now = DateTimeService.getNowWithZeroSeconds();
        vm.doorDate = now;
        vm.doorTime = now;
    }

    function onOnsetNow() {
        var now = DateTimeService.getNowWithZeroSeconds();
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
