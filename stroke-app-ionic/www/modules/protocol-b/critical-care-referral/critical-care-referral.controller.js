'use strict';

angular.module('app.protocolB') .controller('CriticalCareReferralController', CriticalCareReferralController);

CriticalCareReferralController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'StateCacheService', 'DemoModeCacheService', 'GCS_THRESHOLD', 'STATE_CRITICAL_CARE_REFERRAL', 'STATE_PATIENT_END'];

function CriticalCareReferralController($scope, $state, $ionicPopup, PatientCacheService, StateCacheService, DemoModeCacheService, GCS_THRESHOLD, STATE_CRITICAL_CARE_REFERRAL, STATE_PATIENT_END) {
 
    var vm = this;

    StateCacheService.setCurrentState(STATE_CRITICAL_CARE_REFERRAL);
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

    vm.isReferredToCriticalCare = PatientCacheService.getIsReferredToCriticalCare();

    vm.onNext = onNext;
    vm.isNextButtonEnabled = isNextButtonEnabled;

    function isNextButtonEnabled() {
        var isEnabled = false;
        if (vm.isReferredToCriticalCare !== null) {
            isEnabled = true;
        }
        return isEnabled;
    }

    function onNext() {
        showDataValidationPopup(handleDataValid);
    }

    function goNextState(){

        if (PatientCacheService.getGcsScore() < GCS_THRESHOLD) {
            $state.go(STATE_PATIENT_END);
        }
        else {
            StateCacheService.goLatestStateTabC();
        }

    }

    function handleDataValid() {
        saveData();
        goNextState();
    }

    function saveData() {
        PatientCacheService.setIsReferredToCriticalCare(vm.isReferredToCriticalCare);
    }

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
