'use strict';

angular.module('app.protocolA').controller('DoacReversalAgentDetailsController', DoacReversalAgentDetailsController);

DoacReversalAgentDetailsController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'DateTimeService', 'GCS_THRESHOLD'];

function DoacReversalAgentDetailsController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, DateTimeService, GCS_THRESHOLD) {

    var vm = this; // S7

    TabStateCacheService.setCurrentState('tabs.doac-reversal-agent-details');
    vm.patientId = PatientCacheService.getUniqueId();

    vm.reversalAgent = null
    vm.reversalDate = null;
    vm.reversalTime = null;

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
        PatientCacheService.setDoacReversalAgentType(vm.reversalAgent);
        if (vm.reversalAgent === "Idarucizumab" || vm.reversalAgent === "PCC") {
            var reversalDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.reversalDate, vm.reversalTime);
            PatientCacheService.setDoacReversalAgentDateTime(reversalDateTime);
        }
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
