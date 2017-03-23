'use strict';

angular.module('app.protocolC').controller('MrsEntryController', MrsEntryController);

MrsEntryController.$inject = ['$scope', '$state', '$ionicPopup', 'MrsEntryControllerService', 'PatientCacheService', 'StateCacheService', 'DemoModeCacheService', 'STATE_MRS_ENTRY', 'STATE_NEUROSURGERY_REFERRAL_CRITERIA'];

function MrsEntryController($scope, $state, $ionicPopup, MrsEntryControllerService, PatientCacheService, StateCacheService, DemoModeCacheService, STATE_MRS_ENTRY, STATE_NEUROSURGERY_REFERRAL_CRITERIA) {
 
    var vm = this;

    function init() {
        // set current state
        StateCacheService.setCurrentState(STATE_MRS_ENTRY);

        // initialise vm parameters
        vm.patientId = PatientCacheService.getUniqueId();
        vm.isDemoMode = DemoModeCacheService.getIsDemoMode();
        vm.mrsValue = null;

        // Setup click handlers
        vm.onNext = onNext;

        // Setup enable/disable handlers
        vm.isNextButtonEnabled = isNextButtonEnabled;
    }

    init();

    // Click handlers
    function onNext() {
        showDataValidationPopup(handleDataValid); 
    }

    // Enable/disable handlers
    function isNextButtonEnabled() {
        return MrsEntryControllerService.isNextButtonEnabled(vm.mrsValue);
    }

    function handleDataValid() {
        saveData();
        $state.go(STATE_NEUROSURGERY_REFERRAL_CRITERIA);
    }

    function saveData() {
        PatientCacheService.setPremorbidMrsScore(vm.mrsValue);
    }

    // Popups
    function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-c/mrs-entry/mrs-entry-data-validation-popup.html',
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

