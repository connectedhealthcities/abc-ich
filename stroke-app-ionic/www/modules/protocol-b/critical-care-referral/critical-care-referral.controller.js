/// <reference path="critical-care-referral-data-validation-popup.html" />
'use strict';

angular.module('app.protocolB') .controller('CriticalCareReferralController', CriticalCareReferralController);

CriticalCareReferralController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'GCS_THRESHOLD'];

function CriticalCareReferralController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, GCS_THRESHOLD) {
 
    var vm = this; // S4

    TabStateCacheService.setStateTabB('tabs.critical-care-referral');

    vm.destination;
    vm.destinationOther;

    vm.onNext = onNext;
    vm.isNextButtonEnabled = isNextButtonEnabled;
    vm.OnOtherChanged = OnOtherChanged;

    function OnOtherChanged() {
        vm.destinationOther = null;
    }

    function isNextButtonEnabled() {
        var isEnabled = false;
        if (vm.destination) {
            if (vm.destination !== "Other") {
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
        showDataValidationPopup(dataValid);
    }

    function goNextState(){

        if (PatientCacheService.getGcsScore() < GCS_THRESHOLD) {
            $state.go('patient-end');
        }
        else {
            TabStateCacheService.goLatestStateTabC();
        }

    }

    function dataValid() {
        saveData();
        goNextState();
    }

    function saveData() {
        PatientCacheService.setDestination(vm.destination);
        if (vm.destination === "Other") {
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
