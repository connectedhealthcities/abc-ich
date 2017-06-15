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
        calculateBeriplexDose: calculateBeriplexDose,
        isNextButtonEnabled: isNextButtonEnabled
    };

     return service;

    function showReversalAgentAdministeredAtExternalHospitalCard(externalScanHospitalName) {
        var isShow = false;
        if (externalScanHospitalName !== null) {
            isShow = true;
        }
        return isShow;
    }

    function showAdministerBeriplexWithoutInrCard(externalScanHospitalName, reversalAgentAdministeredAtExternalHospital) {
        var isShow = false;
        if ( externalScanHospitalName === null ||
            (reversalAgentAdministeredAtExternalHospital !== null && !reversalAgentAdministeredAtExternalHospital) ) {
            isShow = true;
        }
        return isShow;
    }

    function showInrCard(administerBeriplexWithoutInr) {
        var isShow = false;
        if (administerBeriplexWithoutInr !== null && !administerBeriplexWithoutInr) {
            isShow = true;
        }
        return isShow;
    }

    function showEstimatedWeightCard(administerBeriplexWithoutInr) {
        var isShow = false;
        if (administerBeriplexWithoutInr !== null) {
            isShow = true;
        }
        return isShow;
    }

    function showBeriplexAdministrationOverrideCard(anticoagulantType, administerBeriplexWithoutInr, inrValue, INR_THRESHOLD) {
        var isShow = false;
        if (anticoagulantType === "Unknown" && administerBeriplexWithoutInr != null && !administerBeriplexWithoutInr && inrValue >= INR_THRESHOLD) {
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
    
    function calculateBeriplexDose(inrValue, weightInKg) {
        var dose = null;
        if (inrValue && weightInKg) {            
            var weight = (Math.round(weightInKg / 10) * 10);
            if (weight > 100) {
                weight = 100;
            }
            if (weight < 30) {
                weight = 30;
            }
            var inr = inrValue.toFixed(1);
            dose = 0;

            if (inr >= 1.3 && inr <= 3.9) {
                dose = weight * 25;
            }
            else if (inr >= 4 && inr <= 6) {
                dose = weight * 35;
           }
            else if (inr > 6) {
                dose = weight * 50;
           }
        }

        return dose;
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

        if (reversalAgentAdministeredAtExternalHospital) {
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
