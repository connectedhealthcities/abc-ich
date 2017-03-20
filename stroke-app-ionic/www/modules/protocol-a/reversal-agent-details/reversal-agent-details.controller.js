'use strict';

angular.module('app.protocolA').controller('ReversalAgentDetailsController', ReversalAgentDetailsController);

ReversalAgentDetailsController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'DateTimeService', 'GCS_THRESHOLD', 'DemoModeCacheService', 'STATE_REVERSAL_AGENT_DETAILS'];

function ReversalAgentDetailsController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, DateTimeService, GCS_THRESHOLD, DemoModeCacheService, STATE_REVERSAL_AGENT_DETAILS) {

    var vm = this;

    TabStateCacheService.setCurrentState(STATE_REVERSAL_AGENT_DETAILS);
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

    vm.reversalAgentAdministeredAtExternalHospital = PatientCacheService.getReversalAgentAdministeredAtExternalHospital();
    vm.reversalAgent = PatientCacheService.getReversalAgentType();
    vm.reversalAgentAdministeredTimeKnown = PatientCacheService.getReversalAgentAdministeredTimeKnown();
    var reversalDateTime = PatientCacheService.getReversalAgentStartDateTime();
    vm.reversalDate = reversalDateTime;
    vm.reversalTime = reversalDateTime;

    vm.onNext = onNext;
    vm.isNextButtonEnabled = isNextButtonEnabled;
    vm.onReversalNow = onReversalNow;
    vm.onReversalAgentChanged = onReversalAgentChanged;
    vm.onReversalAgentAdministeredTimeKnownChanged = onReversalAgentAdministeredTimeKnownChanged;

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
        PatientCacheService.setReversalAgentType(vm.reversalAgent);
        PatientCacheService.setReversalAgentAdministeredTimeKnown(vm.reversalAgentAdministeredTimeKnown);
        if (vm.reversalAgentAdministeredTimeKnown) {
            var reversalDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.reversalDate, vm.reversalTime);
            PatientCacheService.setReversalAgentStartDateTime(reversalDateTime);
        }
     }

     function isNextButtonEnabled() {
         var isEnabled = false;

         if (vm.reversalAgent != null) {
            if (vm.reversalAgent === "None") {
                isEnabled = true;
            }
            else if (vm.reversalAgentAdministeredAtExternalHospital) {
                if (vm.reversalAgentAdministeredTimeKnown != null) {
                    if (!vm.reversalAgentAdministeredTimeKnown) {
                        isEnabled = true;
                    }
                    else if (vm.reversalDate != null && vm.reversalTime != null) {
                        isEnabled = true;
                    }
                }
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
         vm.reversalAgentAdministeredTimeKnown = null;
         vm.reversalDate = null;
         vm.reversalTime = null;
      }

     function onReversalAgentAdministeredTimeKnownChanged() {
        vm.reversalDate  = null;
        vm.reversalTime  = null;
     }

     function onReversalNow() {
        var now = DateTimeService.getNowWithZeroSeconds();
        vm.reversalDate = now;
        vm.reversalTime = now;
     }

     function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/reversal-agent-details/reversal-agent-details-data-validation-popup.html',
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
