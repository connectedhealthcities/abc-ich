'use strict';

angular.module('app.protocolA').service('CalculateBeriplexDoseControllerService', CalculateBeriplexDoseControllerService);

CalculateBeriplexDoseControllerService.$inject = [];

function CalculateBeriplexDoseControllerService() {
 
     var service = {
        showReversalAgentAdministeredAtExternalHospitalCard: showReversalAgentAdministeredAtExternalHospitalCard,
        showAdministerBeriplexWithoutInrCard: showAdministerBeriplexWithoutInrCard,
        showInrCard: showInrCard,
        showEstimatedWeightCard: showEstimatedWeightCard,
        showBeriplexAdministrationOverrideCard: showBeriplexAdministrationOverrideCard,
        calculateStonesToKg: calculateStonesToKg,
        calculateKgToStones: calculateKgToStones,
        isInrOutOfRange: isInrOutOfRange,
        isWeightOutOfRange: isWeightOutOfRange,
        isNextButtonEnabled: isNextButtonEnabled
    };

     return service;

    function showReversalAgentAdministeredAtExternalHospitalCard(selectedPCCType, externalScanHospitalName, anticoagulantType) {
        var isShow = false;
        if (selectedPCCType !== null && anticoagulantType != "DOAC" && externalScanHospitalName !== null) {
            isShow = true;
        }
        return isShow;
    }

    function showAdministerBeriplexWithoutInrCard(selectedPCCType, externalScanHospitalName, reversalAgentAdministeredAtExternalHospital, anticoagulantType) {
        var isShow = false;
        if(anticoagulantType === "DOAC"){
            isShow = false;
        }
        else if (selectedPCCType !== null && (externalScanHospitalName === null ||
            (reversalAgentAdministeredAtExternalHospital !== null && !reversalAgentAdministeredAtExternalHospital) )) {
            isShow = true;
        }
        return isShow;
    }

    function showInrCard(selectedPCCType, administerBeriplexWithoutInr, anticoagulantType) {
        var isShow = false;
        if(selectedPCCType !== null){
            if (anticoagulantType === "DOAC"){
                isShow = false;
            }
            else if (administerBeriplexWithoutInr !== null && !administerBeriplexWithoutInr) {
                isShow = true;
            }
        }
        return isShow;
    }

    function showEstimatedWeightCard(selectedPCCType, administerBeriplexWithoutInr, anticoagulantType) {
        var isShow = false;
        if(selectedPCCType !== null){
            if (anticoagulantType === "DOAC"){
                isShow = true;
            }
            else if (administerBeriplexWithoutInr !== null) {
                isShow = true;
            }
        }
        return isShow;
    }

    function showBeriplexAdministrationOverrideCard(selectedPCCType, anticoagulantType, administerBeriplexWithoutInr, inrValue, INR_THRESHOLD) {
        var isShow = false;
        if (selectedPCCType !== null && anticoagulantType != "DOAC" && anticoagulantType === "Unknown" && administerBeriplexWithoutInr != null && !administerBeriplexWithoutInr && inrValue >= INR_THRESHOLD) {
            isShow = true;
        }
        return isShow;
    }
    
    function calculateStonesToKg(weightInStones) {
        if (weightInStones === null) {
            return null;
        }
        var _NUM_KGS_IN_STONES_ = 6.35029;
        var weightInKg = weightInStones * _NUM_KGS_IN_STONES_;
        weightInKg = Math.round(weightInKg); // no decimal places
        return weightInKg;
    }

    function calculateKgToStones(weightInKg) {
        if (weightInKg === null) {
            return null;
        }
        var _NUM_STONES_IN_KG_ = 0.157473;
        var weightInStones = weightInKg * _NUM_STONES_IN_KG_;
        weightInStones = Math.round(weightInStones * 10) / 10; // limit to 1 decimal place
        return weightInStones;
    }

    function isInrOutOfRange(inrValue) {
         var isInrOutOfRange = (inrValue !== null && (inrValue < 0.5 || inrValue > 10));
         return isInrOutOfRange;
    }

    function isWeightOutOfRange(estimatedWeightInKg) {
         var isWeightOutOfRange = (estimatedWeightInKg !== null && (estimatedWeightInKg < 10 || estimatedWeightInKg > 300));

         return isWeightOutOfRange;
    }

    function isNextButtonEnabled(
        reversalAgentAdministeredAtExternalHospital,
        administerBeriplexWithoutInr,
        anticoagulantType,
        inrType,
        inrDate,
        inrTime,
        estimatedWeightInKg,
        inrValue,
        forceAdministerWhenUnknown,
        INR_THRESHOLD) {
        
        var isEnabled = false;

        if(anticoagulantType === "DOAC"){
            if(estimatedWeightInKg!== null && !isWeightOutOfRange(estimatedWeightInKg)){
                isEnabled = true;
            }
        }
        else if (reversalAgentAdministeredAtExternalHospital) {
            isEnabled = true;
        }
        else {
            if (administerBeriplexWithoutInr !== null) {                    
                if (administerBeriplexWithoutInr) {
                    if (estimatedWeightInKg !== null && !isWeightOutOfRange(estimatedWeightInKg)) {
                        isEnabled = true;
                    }                        
                }
                else {
                    if (anticoagulantType === "Unknown") {
                        if (inrValue !== null) {
                            if (inrValue >= INR_THRESHOLD) { 
                                if (inrType !== null && inrDate !== null && inrTime !== null && estimatedWeightInKg !== null && forceAdministerWhenUnknown !== null && (!isInrOutOfRange(inrValue) && !isWeightOutOfRange(estimatedWeightInKg))) {
                                    isEnabled = true;
                                }
                            }
                            else {
                                if (inrType !== null && inrDate !== null && inrTime !== null && estimatedWeightInKg !== null && inrValue && (!isInrOutOfRange(inrValue) && !isWeightOutOfRange(estimatedWeightInKg))) {
                                    isEnabled = true;
                                }
                            }
                        }
                    }
                    else {
                        if (inrType !== null && inrDate !== null && inrTime !== null && inrValue !== null && estimatedWeightInKg !== null && (!isInrOutOfRange(inrValue) && !isWeightOutOfRange(estimatedWeightInKg))) {
                            isEnabled = true;
                        }
                    }
                }
            }
        }

        return isEnabled;    
    }

}
