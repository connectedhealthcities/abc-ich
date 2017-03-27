'use strict';

angular.module('app.protocolA').controller('ConfirmBeriplexDoseController', ConfirmBeriplexDoseController);

ConfirmBeriplexDoseController.$inject = ['$scope', '$state', '$ionicPopup', 'ConfirmBeriplexDoseControllerService', 'PatientCacheService', 'StateCacheService', 'DemoModeCacheService', 'STATE_CONFIRM_BERIPLEX_DOSE', 'STATE_ADMINISTER_BERIPLEX']; 

function ConfirmBeriplexDoseController($scope, $state, $ionicPopup, ConfirmBeriplexDoseControllerService, PatientCacheService, StateCacheService, DemoModeCacheService, STATE_CONFIRM_BERIPLEX_DOSE, STATE_ADMINISTER_BERIPLEX) {
 
    var vm = this;

    function init() {
        // set current state
        StateCacheService.setCurrentState(STATE_CONFIRM_BERIPLEX_DOSE);

        // initialise vm parameters
        vm.patientId = PatientCacheService.getUniqueId();
        vm.isDemoMode = DemoModeCacheService.getIsDemoMode();
        vm.overrideCalculatedDose = null;
        vm.actualDose = null;
        vm.calculatedDose = PatientCacheService.getCalculatedBeriplexDose();

        // Setup click handlers
        vm.onNext = onNext;
 
        // Setup change handlers
        vm.onOverrideCalculatedDoseChanged = onOverrideCalculatedDoseChanged;

        // Setup enable/disable handlers
        vm.isNextButtonEnabled = isNextButtonEnabled;

        // Setup show/hide handlers
        vm.isShowActualDose = isShowActualDose;
    }

    init(); 

    // Click handlers
    function onNext() {
        showDataValidationPopup(handleDataValid);
    }

    // Change handlers
    function onOverrideCalculatedDoseChanged() {
        vm.actualDose = null;
    }

    // Enable/disable handlers
    function isNextButtonEnabled() {
        return ConfirmBeriplexDoseControllerService.isNextButtonEnabled(vm.overrideCalculatedDose, vm.actualDose);
    }

    // Show/hide handlers
    function isShowActualDose() {
        return ConfirmBeriplexDoseControllerService.isShowActualDose(vm.overrideCalculatedDose);
    }

    // Private functions
    function handleDataValid() {
        saveData();
        $state.go(STATE_ADMINISTER_BERIPLEX);
    }

    function saveData() {
        PatientCacheService.setActualBeriplexDose(vm.actualDose);
    }

    // Popups
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
