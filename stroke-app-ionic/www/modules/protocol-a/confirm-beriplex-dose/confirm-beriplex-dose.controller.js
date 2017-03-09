'use strict';

angular.module('app.protocolA').controller('ConfirmBeriplexDoseController', ConfirmBeriplexDoseController);

ConfirmBeriplexDoseController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'DemoModeCacheService', 'STATE_CONFIRM_BERIPLEX_DOSE', 'STATE_ADMINISTER_BERIPLEX']; 

function ConfirmBeriplexDoseController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, DemoModeCacheService, STATE_CONFIRM_BERIPLEX_DOSE, STATE_ADMINISTER_BERIPLEX) {
 
    var vm = this; //S8

    TabStateCacheService.setCurrentState(STATE_CONFIRM_BERIPLEX_DOSE);
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

    vm.overrideCalculatedDose = null;
    vm.actualDose = null;
    vm.calculatedDose = PatientCacheService.getCalculatedBeriplexDose();

    vm.onNext = onNext;
    vm.isNextButtonEnabled = isNextButtonEnabled;
    vm.onOverrideCalculatedDoseChanged = onOverrideCalculatedDoseChanged;


    function onNext() {
        showDataValidationPopup(handleDataValid);
    }

    function handleDataValid() {
        saveData();
        $state.go(STATE_ADMINISTER_BERIPLEX);
    }

    function saveData() {
        if (vm.overrideCalculatedDose) {
            PatientCacheService.setActualBeriplexDose(vm.actualDose);
        }
        else {
            PatientCacheService.setActualBeriplexDose(vm.calculatedDose);
        }
    }

    function isNextButtonEnabled() {
        var isEnabled = false;

        if (vm.overrideCalculatedDose != null) {

            if (vm.overrideCalculatedDose) {
                if (vm.actualDose != null) {
                    isEnabled = true;
                }
            }
            else {
                isEnabled = true;
            }
        }

        return isEnabled;
    }

    function onOverrideCalculatedDoseChanged() {
        vm.actualDose = null;
    }

    function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/confirm-beriplex-dose/confirm-beriplex-dose-data-validation-popup.html',
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
