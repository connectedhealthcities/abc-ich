'use strict';

angular.module('app.protocolB') .controller('CriticalCareReferralController', CriticalCareReferralController);

CriticalCareReferralController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'DemoModeCacheService', 'EnumService', 'GCS_THRESHOLD', 'STATE_CRITICAL_CARE_REFERRAL', 'STATE_PATIENT_END'];

function CriticalCareReferralController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, DemoModeCacheService, EnumService, GCS_THRESHOLD, STATE_CRITICAL_CARE_REFERRAL, STATE_PATIENT_END) {
 
    var vm = this; // S4

    TabStateCacheService.setCurrentState(STATE_CRITICAL_CARE_REFERRAL);
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

    vm.destination = EnumService.displayValueFromEnumValueForDestination(PatientCacheService.getDestination());
    vm.destinationOther = PatientCacheService.getOtherDestination();

    vm.onNext = onNext;
    vm.isNextButtonEnabled = isNextButtonEnabled;
    vm.OnOtherChanged = OnOtherChanged;

    function OnOtherChanged() {
        vm.destinationOther = null;
    }

    function isNextButtonEnabled() {
        var isEnabled = false;
        if (vm.destination) {
            if (vm.destination !== "None of the above") {
                isEnabled = true;
            }
            else {
                if (vm.destinationOther) {
                    isEnabled = true;
                }
            }
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
            TabStateCacheService.goLatestStateTabC();
        }

    }

    function handleDataValid() {
        saveData();
        goNextState();
    }

    function saveData() {
        PatientCacheService.setDestination(EnumService.enumValueFromDisplayValueForDestination(vm.destination));
        if (vm.destination === "None of the above") {
            PatientCacheService.setOtherDestination(vm.destinationOther);
        }
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
