'use strict';

angular.module('app.protocolA').controller('CalculateBeriplexDoseController', CalculateBeriplexDoseController);

CalculateBeriplexDoseController.$inject = ['$scope', '$state', '$ionicPopup', 'CalculateBeriplexDoseControllerService', 'PatientCacheService', 'DateTimeService', 'StateCacheService', 'DemoModeCacheService', 'INR_THRESHOLD', 'GCS_THRESHOLD', 'STATE_CALCULATE_BERIPLEX_DOSE', 'STATE_CONFIRM_BERIPLEX_DOSE', 'STATE_REVERSAL_AGENT_DETAILS', 'STATE_BP_MANAGEMENT'];

function CalculateBeriplexDoseController($scope, $state, $ionicPopup, CalculateBeriplexDoseControllerService, PatientCacheService, DateTimeService, StateCacheService, DemoModeCacheService, INR_THRESHOLD, GCS_THRESHOLD, STATE_CALCULATE_BERIPLEX_DOSE, STATE_CONFIRM_BERIPLEX_DOSE, STATE_REVERSAL_AGENT_DETAILS, STATE_BP_MANAGEMENT) {
 
    var vm = this;

    function init() {
        // set current state
        StateCacheService.setCurrentState(STATE_CALCULATE_BERIPLEX_DOSE);

        // initialise vm parameters for header row
        vm.patientId = PatientCacheService.getUniqueId();
        vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

        // initialise vm parameters for page logic       
        vm.externalScanHospitalName = PatientCacheService.getExternalScanHospitalName();
        vm.anticoagulantType = PatientCacheService.getAnticoagulantType();
        vm.gcsScore = PatientCacheService.getGcsScore();

        // initialise vm parameters for page content
        // Not initialised to null as user can navigate back to this page using tab navigation     
        vm.reversalAgentAdministeredAtExternalHospital = PatientCacheService.getReversalAgentAdministeredAtExternalHospital();
        vm.administerBeriplexWithoutInr = PatientCacheService.getAdministerBeriplexWithoutInr();
        vm.inrValue = PatientCacheService.getInrValue();
        vm.inrType = PatientCacheService.getInrType();
        var inrDateTime = PatientCacheService.getInrDateTime();
        vm.inrDate = inrDateTime;
        vm.inrTime = inrDateTime;
        vm.administerBeriplexWhenUnknown = PatientCacheService.getAdministerBeriplexWhenUnknown(); //only appears when anti-coag is unknown and INR >= INR_THRESHOLD    
        vm.weightGivenInKg = PatientCacheService.getIsWeightGivenInKg();
        vm.estimatedWeightInKg = PatientCacheService.getEstimatedWeightInKg();
        vm.estimatedWeightInStones = CalculateBeriplexDoseControllerService.calculateKgToStones(vm.estimatedWeightInKg);        
        vm.calculatedDose = PatientCacheService.getCalculatedBeriplexDose();

        // Setup click handlers
        vm.onNext = onNext;
        vm.onInrNow = onInrNow;
 
        // Setup change handlers
        vm.onReversalAgentAdministeredAtExternalHospitalChanged = onReversalAgentAdministeredAtExternalHospitalChanged;
        vm.onAdministerBeriplexWithoutInrChanged = onAdministerBeriplexWithoutInrChanged;
        vm.onInrValueChanged = onInrValueChanged;
        vm.onWeightInKgChanged = onWeightInKgChanged;
        vm.onWeightInStonesChanged = onWeightInStonesChanged;

        // Setup enable/disable handlers
        vm.isNextButtonEnabled = isNextButtonEnabled;

        // Setup show/hide handlers
        vm.showReversalAgentAdministeredAtExternalHospitalCard = showReversalAgentAdministeredAtExternalHospitalCard;
        vm.showAdministerBeriplexWithoutInrCard = showAdministerBeriplexWithoutInrCard;
        vm.showInrCard = showInrCard;
        vm.showEstimatedWeightCard = showEstimatedWeightCard;
        vm.showBeriplexAdministrationOverrideCard = showBeriplexAdministrationOverrideCard;
    }

    init();

    // Click handlers
    function onNext() {
        showDataValidationPopup(handleDataValid);
    }

    function onInrNow() {
        var now = DateTimeService.getNowWithZeroSeconds();
        vm.inrDate = now;
        vm.inrTime = now;
    }

     // Change handlers
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

    function onInrValueChanged() {
        vm.administerBeriplexWhenUnknown = null;
        vm.calculatedDose = CalculateBeriplexDoseControllerService.calculateBeriplexDose(vm.inrValue, vm.estimatedWeightInKg);
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

    // Enable/disable handlers
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
            vm.administerBeriplexWhenUnknown,
            INR_THRESHOLD);
    }

    // Show/hide handlers
    function showReversalAgentAdministeredAtExternalHospitalCard() {
        return CalculateBeriplexDoseControllerService.showReversalAgentAdministeredAtExternalHospitalCard(vm.externalScanHospitalName);
    }

    function showAdministerBeriplexWithoutInrCard() {
         return CalculateBeriplexDoseControllerService.showAdministerBeriplexWithoutInrCard(vm.externalScanHospitalName, vm.reversalAgentAdministeredAtExternalHospital);
   }

    function showInrCard() {
         return CalculateBeriplexDoseControllerService.showInrCard(vm.administerBeriplexWithoutInr);
    }
    
    function showEstimatedWeightCard() {
        return CalculateBeriplexDoseControllerService.showEstimatedWeightCard(vm.administerBeriplexWithoutInr);
    }

    function showBeriplexAdministrationOverrideCard() {
        return CalculateBeriplexDoseControllerService.showBeriplexAdministrationOverrideCard(vm.anticoagulantType, vm.administerBeriplexWithoutInr, vm.inrValue, INR_THRESHOLD);
    }

    // Private functions
    function handleDataValid() {
        saveData();
        if (vm.inrValue !== null && vm.inrValue < INR_THRESHOLD) {
            showInrBelowTreamentRangePopup(goNextState);
        } else {
            goNextState();
        }        
    }

    function saveData() {
        PatientCacheService.setReversalAgentAdministeredAtExternalHospital(vm.reversalAgentAdministeredAtExternalHospital);
        PatientCacheService.setAdministerBeriplexWithoutInr(vm.administerBeriplexWithoutInr);
        var beriplexAdministeredDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.inrDate, vm.inrTime);
        PatientCacheService.setInrDateTime(beriplexAdministeredDateTime);
        PatientCacheService.setInrValue(vm.inrValue);
        PatientCacheService.setInrType(vm.inrType);
        PatientCacheService.setEstimatedWeightInKg(vm.estimatedWeightInKg);
        PatientCacheService.setIsWeightGivenInKg(vm.weightGivenInKg);
        PatientCacheService.setCalculatedBeriplexDose(vm.calculatedDose);
        PatientCacheService.setAdministerBeriplexWhenUnknown(vm.administerBeriplexWhenUnknown);
    }

    function goNextState() {
        if (vm.reversalAgentAdministeredAtExternalHospital) {
            $state.go(STATE_REVERSAL_AGENT_DETAILS);
        }
        else {
        if (vm.administerBeriplexWithoutInr) {
            $state.go(STATE_CONFIRM_BERIPLEX_DOSE);
        }
        else {
                if (vm.inrValue < INR_THRESHOLD) {
                    if (vm.gcsScore < GCS_THRESHOLD) {
                        StateCacheService.goLatestStateTabC();
                    }
                    else {
                        $state.go(STATE_BP_MANAGEMENT);
                    }
                }
                else {
                    if (vm.anticoagulantType === "Vitamin K antagonist") {
                        $state.go(STATE_CONFIRM_BERIPLEX_DOSE);
                    }
                    else if (vm.anticoagulantType === "Unknown") {
                        if (vm.administerBeriplexWhenUnknown) {
                            $state.go(STATE_CONFIRM_BERIPLEX_DOSE);
                        }
                        else {
                            if (vm.gcsScore < GCS_THRESHOLD) {
                                StateCacheService.goLatestStateTabC();
                            }
                            else {
                                $state.go(STATE_BP_MANAGEMENT);
                            }
                        }
                    }
                }
            }
        }        
    }

    // Popups
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

        popup.then(okHandler);
    }
}
