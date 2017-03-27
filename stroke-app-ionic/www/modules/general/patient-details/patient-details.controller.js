'use strict';

angular.module('app.general').controller('PatientDetailsController', PatientDetailsController);

PatientDetailsController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientDetailsControllerService', 'PatientCacheService', 'StateCacheService', 'DateTimeService', 'DemoModeCacheService', 'STATE_PATIENT_DETAILS', 'STATE_GCS_ENTRY']; 

function PatientDetailsController($scope, $state, $ionicPopup, PatientDetailsControllerService, PatientCacheService, StateCacheService, DateTimeService, DemoModeCacheService, STATE_PATIENT_DETAILS, STATE_GCS_ENTRY) {
 
    var vm = this;

    function init() {
        // set current state
        StateCacheService.setCurrentState(STATE_PATIENT_DETAILS);

        // initialise vm parameters
        vm.patientId = PatientCacheService.getUniqueId();
        vm.isDemoMode = DemoModeCacheService.getIsDemoMode();
        vm.doorDate = null;
        vm.doorTime = null;
        vm.onsetDate = null;
        vm.onsetTime = null;
        vm.timeSinceOnsetText = null;
        vm.isOnsetLastSeenWell = null;
        vm.isOnsetBestEstimate = null;

        // Setup click handlers
        vm.onNext = onNext;
        vm.onDoorNow = onDoorNow;
        vm.onOnsetNow = onOnsetNow;

        // Setup change handlers
        vm.onOnsetChanged = onOnsetChanged;

        // Setup enable/disable handlers
        vm.isNextButtonEnabled = isNextButtonEnabled;

        // Setup show/hide handlers
        vm.isShowTimeSinceOnsetText = isShowTimeSinceOnsetText;
   }

    init();
 
    // Click handlers
    function onNext() {
        showDataValidationPopup(handleDataValid);
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

    // Change handlers
    function onOnsetChanged() {
        vm.timeSinceOnsetText = DateTimeService.getTimeSinceOnsetText(new Date(), vm.onsetDate, vm.onsetTime);
    }

    // Enable/disable handlers
    function isNextButtonEnabled() {

        return PatientDetailsControllerService.isNextButtonEnabled(
            vm.doorDate,
            vm.doorTime,
            vm.onsetDate,
            vm.onsetTime,
            vm.isOnsetLastSeenWell,
            vm.isOnsetBestEstimate
        );
     }

    // Show/hide handlers
    function isShowTimeSinceOnsetText() {
        return PatientDetailsControllerService.isShowTimeSinceOnsetText(vm.timeSinceOnsetText);
    }

    // Private functions
    function handleDataValid() {
        saveData();
        $state.go(STATE_GCS_ENTRY);
    }

    function saveData() {
        var doorDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.doorDate, vm.doorTime);
        var onsetDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.onsetDate, vm.onsetTime);
        PatientCacheService.setDoorDateTime(doorDateTime);
        PatientCacheService.setOnsetDateTime(onsetDateTime);
        PatientCacheService.setIsLastSeenWellOnset(vm.isOnsetLastSeenWell);
        PatientCacheService.setIsBestEstimateOnset(vm.isOnsetBestEstimate);
    }

    // Popups
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
