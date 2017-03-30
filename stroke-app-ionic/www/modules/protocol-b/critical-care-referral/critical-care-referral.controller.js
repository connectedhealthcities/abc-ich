'use strict';

angular.module('app.protocolB') .controller('CriticalCareReferralController', CriticalCareReferralController);

CriticalCareReferralController.$inject = ['$scope', '$state', '$ionicPopup', 'CriticalCareReferralControllerService', 'PatientCacheService', 'StateCacheService', 'DemoModeCacheService', 'GCS_THRESHOLD', 'STATE_CRITICAL_CARE_REFERRAL', 'STATE_PATIENT_END'];

function CriticalCareReferralController($scope, $state, $ionicPopup, CriticalCareReferralControllerService, PatientCacheService, StateCacheService, DemoModeCacheService, GCS_THRESHOLD, STATE_CRITICAL_CARE_REFERRAL, STATE_PATIENT_END) {
 
    var vm = this;

    function init() {
        // set current state
        StateCacheService.setCurrentState(STATE_CRITICAL_CARE_REFERRAL);

        // initialise vm parameters for header row
        vm.patientId = PatientCacheService.getUniqueId();
        vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

        // initialise vm parameters for page logic
        vm.gcsScore = PatientCacheService.getGcsScore();

        // initialise vm parameters for page content
        vm.isReferredToCriticalCare = PatientCacheService.getIsReferredToCriticalCare();

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
        return CriticalCareReferralControllerService.isNextButtonEnabled(vm.isReferredToCriticalCare);
    }

    // Private functions
    function handleDataValid() {
        saveData();
        goNextState();
    }

    function goNextState(){

        if (vm.gcsScore < GCS_THRESHOLD) {
            $state.go(STATE_PATIENT_END);
        }
        else {
            StateCacheService.goLatestStateTabC();
        }
    }

    function saveData() {
        PatientCacheService.setIsReferredToCriticalCare(vm.isReferredToCriticalCare);
    }

    // Popups
    function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-b/critical-care-referral/critical-care-referral-data-validation-popup.html',
            title: 'Data validation',
            subTitle: 'Please confirm data entered is correct',
            scope: $scope,
            cssClass: 'chi-wide-popup'
        };
        var popup = $ionicPopup.confirm(popupTemplate);

        popup.then(function (res) {
            if (res) {
                okHandler();
            }
        });
    }
}
