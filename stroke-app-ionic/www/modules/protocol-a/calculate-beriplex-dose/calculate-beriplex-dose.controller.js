'use strict';

angular.module('app.protocolA').controller('CalculateBeriplexDoseController', CalculateBeriplexDoseController);

CalculateBeriplexDoseController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'DateTimeService', 'TabStateCacheService', 'CalculateBeriplexDoseControllerService', 'INR_THRESHOLD', 'GCS_THRESHOLD'];

function CalculateBeriplexDoseController($scope, $state, $ionicPopup, PatientCacheService, DateTimeService, TabStateCacheService, CalculateBeriplexDoseControllerService, INR_THRESHOLD, GCS_THRESHOLD) {
 
    var vm = this; // S9

    TabStateCacheService.setStateTabA('tabs.calculate-beriplex-dose');

    vm.inrValue;
    vm.inrType;
    vm.inrDate;
    vm.inrTime;

    vm.estimatedWeightInKg;
    vm.estimatedWeightInStones;
    vm.weightGivenInKg;

    vm.forceAdministerWhenUnknown = null; //only appears when anti-coag is unknown and INR > INR_THRESHOLD    
    vm.anticoagulantType = PatientCacheService.getAnticoagulantType();

    vm.onNext = onNext;
    vm.onInrNow = onInrNow;
    vm.showBeriplexAdministrationOverride = showBeriplexAdministrationOverride;
    vm.isNextButtonEnabled = isNextButtonEnabled;
    vm.onWeightInKgChanged = onWeightInKgChanged;
    vm.onWeightInStonesChanged = onWeightInStonesChanged;
    vm.onInrValueChanged = onInrValueChanged;

    function showBeriplexAdministrationOverride() {
        return CalculateBeriplexDoseControllerService.showBeriplexAdministrationOverride(vm.anticoagulantType, vm.inrValue);
    }

    function onInrNow() {
        var now = new Date();
        now.setSeconds(0);
        now.setMilliseconds(0);
        vm.inrDate = now;
        vm.inrTime = now;
    }

    function onInrValueChanged() {
        vm.forceAdministerWhenUnknown = null
    }

    function onWeightInKgChanged() {
        vm.weightGivenInKg = true;
        vm.estimatedWeightInStones = CalculateBeriplexDoseControllerService.calculateKgToStones(vm.estimatedWeightInKg);
    }

    function onWeightInStonesChanged() {
        vm.weightGivenInKg = false;
        vm.estimatedWeightInKg = CalculateBeriplexDoseControllerService.calculateStonesToKg(vm.estimatedWeightInStones);
    }

    function isNextButtonEnabled() {
        return CalculateBeriplexDoseControllerService.isNextButtonEnabled(vm.anticoagulantType, vm.inrType, vm.inrDate, vm.inrTime, vm.estimatedWeightInKg, vm.inrValue, vm.forceAdministerWhenUnknown);
    }

    function onNext() {
        showDataValidationPopup(dataValid);
    }

    function dataValid() {
        saveData();
        if (vm.inrValue <= INR_THRESHOLD) {
            showInrBelowTreamentRangePopup(goNextState);
        } else {
            goNextState();
        }        
    }

    function goNextState() {
        
        if (PatientCacheService.getInrValue() <= INR_THRESHOLD) {
            if (PatientCacheService.getGcsScore() < GCS_THRESHOLD) {
                TabStateCacheService.goLatestStateTabC();
            }
            else {
                TabStateCacheService.goLatestStateTabB();
            }
        }
        else {
            if (PatientCacheService.getAnticoagulantType() === "VITK") {
                TabStateCacheService.setStateTabA('tabs.confirm-beriplex-dose');
                $state.go('tabs.confirm-beriplex-dose');
            }
            else if (PatientCacheService.getAnticoagulantType() === "UNKNOWN") {
                if (PatientCacheService.getShouldAdministerBeriplexWhenAnticoagulatUnknown()) {
                    TabStateCacheService.setStateTabA('tabs.confirm-beriplex-dose');
                    $state.go('tabs.confirm-beriplex-dose');
                }
                else {
                    if (PatientCacheService.getGcsScore() < GCS_THRESHOLD) {
                        TabStateCacheService.goLatestStateTabC();
                    }
                    else {
                        TabStateCacheService.goLatestStateTabB();
                    }
                }
            }
        }
   }

    function saveData() {
        var beriplexAdministeredDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.inrDate, vm.inrTime);
        PatientCacheService.setInrValue(vm.inrValue);
        PatientCacheService.setInrType(vm.inrType);
        PatientCacheService.getInrDateTime(beriplexAdministeredDateTime);
        PatientCacheService.setEstimatedWeightInKg(vm.estimatedWeightInKg);

        if (PatientCacheService.getAnticoagulantType() === "UNKNOWN" && PatientCacheService.getInrValue() > INR_THRESHOLD) {
            PatientCacheService.setShouldAdministerBeriplexWhenAnticoagulatUnknown(vm.forceAdministerWhenUnknown);
        }
    }

    function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/calculate-beriplex-dose/calculate-beriplex-dose-data-validation-popup.html',
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

    function showInrBelowTreamentRangePopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/calculate-beriplex-dose/inr-below-treatment-range-popup.html',
            title: 'INR Below treatment range',
            scope: $scope,
            cssClass: 'chi-wide-popup'
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(function (res) {
            if (res) {
                okHandler();
            }
        });
    }
}
