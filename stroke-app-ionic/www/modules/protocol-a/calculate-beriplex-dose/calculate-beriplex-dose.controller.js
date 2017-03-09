'use strict';

angular.module('app.protocolA').controller('CalculateBeriplexDoseController', CalculateBeriplexDoseController);

CalculateBeriplexDoseController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'DateTimeService', 'TabStateCacheService', 'CalculateBeriplexDoseControllerService', 'EnumService', 'INR_THRESHOLD', 'GCS_THRESHOLD', 'DemoModeCacheService', 'STATE_CALCULATE_BERIPLEX_DOSE', 'STATE_CONFIRM_BERIPLEX_DOSE', 'STATE_REVERSAL_AGENT_DETAILS'];

function CalculateBeriplexDoseController($scope, $state, $ionicPopup, PatientCacheService, DateTimeService, TabStateCacheService, CalculateBeriplexDoseControllerService, EnumService, INR_THRESHOLD, GCS_THRESHOLD, DemoModeCacheService, STATE_CALCULATE_BERIPLEX_DOSE, STATE_CONFIRM_BERIPLEX_DOSE, STATE_REVERSAL_AGENT_DETAILS) {
 
    var vm = this; // S9

    TabStateCacheService.setCurrentState(STATE_CALCULATE_BERIPLEX_DOSE);
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

    vm.externalScanHospitalName = PatientCacheService.getExternalScanHospitalName();
    vm.reversalAgentAdministeredAtExternalHospital = PatientCacheService.getReversalAgentAdministeredAtExternalHospital();

    vm.administerBeriplexWithoutInr = PatientCacheService.getAdministerBeriplexWithoutInr();
    vm.inrValue = PatientCacheService.getInrValue();
    vm.inrType = EnumService.displayValueFromEnumValueForInrType(PatientCacheService.getInrType());
    vm.inrDate = PatientCacheService.getInrDateTime();
    vm.inrTime = PatientCacheService.getInrDateTime();
    
    vm.weightGivenInKg = PatientCacheService.getIsWeightGivenInKg();
    if (vm.weightGivenInKg != null) {
        var weightInKg = PatientCacheService.getEstimatedWeightInKg();
        if (vm.weightGivenInKg) {
            vm.estimatedWeightInKg = weightInKg;
            onWeightInKgChanged();
        }
        else {
            vm.estimatedWeightInStones = CalculateBeriplexDoseControllerService.calculateKgToStones(weightInKg);
            onWeightInStonesChanged();
        }
    }
    else {
        vm.estimatedWeightInKg = null;
        vm.estimatedWeightInStones = null;
        vm.calculatedDose = null;
   }

    vm.administerBeriplexWhenUnknown = PatientCacheService.getAdministerBeriplexWhenUnknown(); //only appears when anti-coag is unknown and INR > INR_THRESHOLD    
    vm.anticoagulantType = PatientCacheService.getAnticoagulantType();

    vm.onNext = onNext;
    vm.onInrNow = onInrNow;
    vm.showBeriplexAdministrationOverride = showBeriplexAdministrationOverride;
    vm.isNextButtonEnabled = isNextButtonEnabled;
    vm.onWeightInKgChanged = onWeightInKgChanged;
    vm.onWeightInStonesChanged = onWeightInStonesChanged;
    vm.onInrValueChanged = onInrValueChanged;
    vm.onAdministerBeriplexWithoutInrChanged = onAdministerBeriplexWithoutInrChanged;
    vm.onReversalAgentAdministeredAtExternalHospitalChanged = onReversalAgentAdministeredAtExternalHospitalChanged;

    function showBeriplexAdministrationOverride() {
        return CalculateBeriplexDoseControllerService.showBeriplexAdministrationOverride(vm.anticoagulantType, vm.inrValue);
    }

    function onInrNow() {
        var now = DateTimeService.getNowWithZeroSeconds();
        vm.inrDate = now;
        vm.inrTime = now;
    }

    function onInrValueChanged() {
        vm.administerBeriplexWhenUnknown = null;
        vm.calculatedDose = CalculateBeriplexDoseControllerService.calculateBeriplexDose(vm.inrValue, vm.estimatedWeightInKg);
    }

    function onAdministerBeriplexWithoutInrChanged() {
        vm.inrValue = null;
        vm.inrType = null;
        vm.inrDate = null;
        vm.inrTime = null;
        vm.weightGivenInKg = null;
        vm.estimatedWeightInKg = null;
        vm.estimatedWeightInStones = null;

        if (vm.administerBeriplexWithoutInr) {
            vm.inrValue = 2.0; // within 1.3 - 3.9 band!
        }
    }

    function onReversalAgentAdministeredAtExternalHospitalChanged() {
            
        vm.administerBeriplexWithoutInr = null;
        vm.inrValue = null;
        vm.inrType = null;
        vm.inrDate = null;
        vm.inrTime = null;
        vm.weightGivenInKg = null;
        vm.estimatedWeightInKg = null;
        vm.estimatedWeightInStones = null;
    }

    function onWeightInKgChanged() {
        vm.weightGivenInKg = true;
        vm.estimatedWeightInStones = CalculateBeriplexDoseControllerService.calculateKgToStones(vm.estimatedWeightInKg);
        vm.calculatedDose = CalculateBeriplexDoseControllerService.calculateBeriplexDose(vm.inrValue, vm.estimatedWeightInKg);
    }

    function onWeightInStonesChanged() {
        vm.weightGivenInKg = false;
        vm.estimatedWeightInKg = CalculateBeriplexDoseControllerService.calculateStonesToKg(vm.estimatedWeightInStones);
        vm.calculatedDose = CalculateBeriplexDoseControllerService.calculateBeriplexDose(vm.inrValue, vm.estimatedWeightInKg);
    }

    function isNextButtonEnabled() {
        return CalculateBeriplexDoseControllerService.isNextButtonEnabled(
            vm.reversalAgentAdministeredAtExternalHospital,
            vm.administerBeriplexWithoutInr, 
            vm.anticoagulantType, 
            vm.inrType, 
            vm.inrDate, 
            vm.inrTime, 
            vm.estimatedWeightInKg, 
            vm.inrValue, 
            vm.administerBeriplexWhenUnknown);
    }

    function onNext() {
        showDataValidationPopup(handleDataValid);
    }

    function handleDataValid() {
        saveData();
        if (vm.inrValue != null && vm.inrValue <= INR_THRESHOLD) {
            showInrBelowTreamentRangePopup(goNextState);
        } else {
            goNextState();
        }        
    }

    function goNextState() {
        if (PatientCacheService.getReversalAgentAdministeredAtExternalHospital()) {
            $state.go(STATE_REVERSAL_AGENT_DETAILS);
        }
        else {
        if (PatientCacheService.getAdministerBeriplexWithoutInr()) {
            $state.go(STATE_CONFIRM_BERIPLEX_DOSE);
        }
        else {
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
                        $state.go(STATE_CONFIRM_BERIPLEX_DOSE);
                    }
                    else if (PatientCacheService.getAnticoagulantType() === "UNKNOWN") {
                        if (PatientCacheService.getAdministerBeriplexWhenUnknown()) {
                            $state.go(STATE_CONFIRM_BERIPLEX_DOSE);
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
        }
           
    }

    function saveData() {
        PatientCacheService.setReversalAgentAdministeredAtExternalHospital(vm.reversalAgentAdministeredAtExternalHospital);
        if (!vm.reversalAgentAdministeredAtExternalHospital) {
            PatientCacheService.setAdministerBeriplexWithoutInr(vm.administerBeriplexWithoutInr);
            if (!vm.administerBeriplexWithoutInr) {
                var beriplexAdministeredDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.inrDate, vm.inrTime);
                PatientCacheService.setInrDateTime(beriplexAdministeredDateTime);
                PatientCacheService.setInrValue(vm.inrValue);
                PatientCacheService.setInrType(EnumService.enumValueFromDisplayValueForInrType(vm.inrType));
            }
            PatientCacheService.setEstimatedWeightInKg(vm.estimatedWeightInKg);
            PatientCacheService.setIsWeightGivenInKg(vm.weightGivenInKg);
            PatientCacheService.setCalculatedBeriplexDose(vm.calculatedDose);

            if (PatientCacheService.getAnticoagulantType() === "UNKNOWN" && PatientCacheService.getInrValue() > INR_THRESHOLD) {
                PatientCacheService.setAdministerBeriplexWhenUnknown(vm.administerBeriplexWhenUnknown);
            }
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
            title: 'INR below treatment range',
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
