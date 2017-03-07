'use strict';

angular.module('app.protocolB') .controller('CriticalCareReferralController', CriticalCareReferralController);

CriticalCareReferralController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'GCS_THRESHOLD', 'DemoModeCacheService'];

function CriticalCareReferralController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, GCS_THRESHOLD, DemoModeCacheService) {
 
    var vm = this; // S4

    TabStateCacheService.setCurrentState('tabs.critical-care-referral');
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

    vm.destination = displayValueFromEnumValueForDestination(PatientCacheService.getDestination());
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
            $state.go('patient-end');
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
        PatientCacheService.setDestination(enumValueFromDisplayValueForDestination(vm.destination));
        if (vm.destination === "None of the above") {
            PatientCacheService.setOtherDestination(vm.destinationOther);
        }
    }

    function displayValueFromEnumValueForDestination(enumValue) {
        var displayValue;
        switch(enumValue) {
            case "STROKE_UNIT":
                displayValue = "Stroke unit";
                break;
            case "ICU":
                displayValue = "ICU";
                break;
            case "HDU":
                displayValue = "HDU";
                break;
            case "NOT_YET_DECIDED":
                displayValue = "Not yet decided";
                break;
            case "OTHER":
                displayValue = "None of the above";
                break;
            default:
                displayValue = null;                
        }
        return displayValue;
    }

    function enumValueFromDisplayValueForDestination(displayValue) {
        var enumValue;
        switch(displayValue) {
            case "Stroke unit":
                enumValue = "STROKE_UNIT";
                break;
            case "ICU":
                enumValue = "ICU";
                break;
            case "HDU":
                enumValue = "HDU";
                break;
            case "Not yet decided":
                enumValue = "NOT_YET_DECIDED";
                break;
            case "None of the above":
                enumValue = "OTHER";
                break;
            default:
                enumValue = null;                
        }
        return enumValue;
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
