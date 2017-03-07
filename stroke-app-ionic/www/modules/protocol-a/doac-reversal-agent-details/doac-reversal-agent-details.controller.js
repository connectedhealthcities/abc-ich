'use strict';

angular.module('app.protocolA').controller('DoacReversalAgentDetailsController', DoacReversalAgentDetailsController);

DoacReversalAgentDetailsController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'DateTimeService', 'GCS_THRESHOLD', 'DemoModeCacheService'];

function DoacReversalAgentDetailsController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, DateTimeService, GCS_THRESHOLD, DemoModeCacheService) {

    var vm = this; // S7

    TabStateCacheService.setCurrentState('tabs.doac-reversal-agent-details');
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

    vm.reversalAgent = displayValueFromEnumValueForReversalAgentType(PatientCacheService.getDoacReversalAgentType());
    vm.reversalDate = PatientCacheService.getDoacReversalAgentDateTime();
    vm.reversalTime = PatientCacheService.getDoacReversalAgentDateTime();

    vm.onNext = onNext;
    vm.isNextButtonEnabled = isNextButtonEnabled;
    vm.onReversalNow = onReversalNow;
    vm.onReversalAgentChanged = onReversalAgentChanged;

    function onNext() {
        showDataValidationPopup(handleDataValid); 
    }

    function handleDataValid() {
        saveData();

        if (PatientCacheService.getGcsScore() < GCS_THRESHOLD) {
            TabStateCacheService.goLatestStateTabC();
        }
        else {
            TabStateCacheService.goLatestStateTabB();
        }
     }

    function saveData() {
        PatientCacheService.setDoacReversalAgentType(enumValueFromDisplayValueForReversalAgentType(vm.reversalAgent));
        if (vm.reversalAgent === "Idarucizumab" || vm.reversalAgent === "PCC") {
            var reversalDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.reversalDate, vm.reversalTime);
            PatientCacheService.setDoacReversalAgentDateTime(reversalDateTime);
        }
     }

    function displayValueFromEnumValueForReversalAgentType(enumValue) {
        var displayValue;
        switch(enumValue) {
            case "IDARUCIZUMAB":
                displayValue = "Idarucizumab";
                break;
            case "PCC":
                displayValue = "PCC";
                break;
            case "NONE":
                displayValue = "None";
                break;
            default:
                displayValue = null;                
        }
        return displayValue;
    }

    function enumValueFromDisplayValueForReversalAgentType(displayValue) {
        var enumValue;
        switch(displayValue) {
            case "Idarucizumab":
                enumValue = "IDARUCIZUMAB";
                break;
            case "PCC":
                enumValue = "PCC";
                break;
            case "None":
                enumValue = "NONE";
                break;
            default:
                enumValue = null;                
        }
        return enumValue;
    }

     function isNextButtonEnabled() {
         var isEnabled = false;

         if (vm.reversalAgent != null) {
            if (vm.reversalAgent === "None") {
                isEnabled = true;
            }
            else {
                if (vm.reversalDate != null && vm.reversalTime != null) {
                    isEnabled = true;
                }
            }
         }
         return isEnabled;
     }

     function onReversalAgentChanged() {
         vm.reversalDate = null;
         vm.reversalTime = null;
     }

     function onReversalNow() {
        var now = DateTimeService.getNowWithZeroSeconds();
        vm.reversalDate = now;
        vm.reversalTime = now;
     }

     function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/doac-reversal-agent-details/doac-reversal-agent-details-data-validation-popup.html',
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
