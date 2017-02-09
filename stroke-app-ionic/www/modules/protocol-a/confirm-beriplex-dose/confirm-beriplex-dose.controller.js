'use strict';

angular.module('app.protocolA').controller('ConfirmBeriplexDoseController', ConfirmBeriplexDoseController);

ConfirmBeriplexDoseController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService']; 

function ConfirmBeriplexDoseController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService) {
 
    var vm = this; //S8

    TabStateCacheService.setStateTabA('tabs.confirm-beriplex-dose');

    vm.overrideCalculatedDose = null;
    vm.actualDose = null;

    vm.onNext = onNext;
    vm.isNextButtonEnabled = isNextButtonEnabled;
    vm.onOverrideCalculatedDoseChanged = onOverrideCalculatedDoseChanged;


    function onNext() {
        showDataValidationPopup(dataValid);
    }

    function dataValid() {
        saveData();
        $state.go('tabs.administer-beriplex');
    }

    function saveData() {
        if (vm.overrideCalculatedDose) {
            PatientCacheService.setActualBeriplexDose(vm.actualDose);
        }
        else {
            var calculatedDose = PatientCacheService.getCalculatedBeriplexDose();
            PatientCacheService.setActualBeriplexDose(calculatedDose);
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
