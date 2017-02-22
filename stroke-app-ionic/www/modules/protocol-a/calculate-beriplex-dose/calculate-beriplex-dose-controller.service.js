'use strict';

angular.module('app.protocolA').service('CalculateBeriplexDoseControllerService', CalculateBeriplexDoseControllerService);

CalculateBeriplexDoseControllerService.$inject = ['INR_THRESHOLD'];

function CalculateBeriplexDoseControllerService(INR_THRESHOLD) {
 
     var service = {
        showBeriplexAdministrationOverride: showBeriplexAdministrationOverride,
        calculateStonesToKg: calculateStonesToKg,
        calculateKgToStones: calculateKgToStones,
        isNextButtonEnabled: isNextButtonEnabled,
        calculateBeriplexDose: calculateBeriplexDose
    };

    return service

    function showBeriplexAdministrationOverride(anticoagulantType, inrValue) {
        if (anticoagulantType === "UNKNOWN" && inrValue > INR_THRESHOLD) {
            return true;
        }
        return false
    }

    function calculateStonesToKg(weightInStones) {
        var _NUM_KGS_IN_STONES_ = 6.35;
        var weightInKg = Math.round(weightInStones * _NUM_KGS_IN_STONES_);

        return weightInKg;
    }

    function calculateKgToStones(weightInKg) {
        var _NUM_STONES_IN_KG_ = 0.15;
        var weightInStones = Math.round(weightInKg * _NUM_STONES_IN_KG_);

        return weightInStones;
     }

    function isNextButtonEnabled(anticoagulantType, inrType, inrDate, inrTime, estimatedWeightInKg, inrValue, forceAdministerWhenUnknown) {
        var isEnabled = false;

        if (anticoagulantType === "UNKNOWN") {
            if (inrType && inrDate && inrTime && estimatedWeightInKg && inrValue && inrValue <= INR_THRESHOLD) {
                isEnabled = true;
            }

            if (inrType && inrDate && inrTime && estimatedWeightInKg && inrValue && inrValue > INR_THRESHOLD) {
                if (forceAdministerWhenUnknown !== null) {
                    isEnabled = true;
                }
            }

        } else {
            if (inrType && inrDate && inrTime && estimatedWeightInKg && inrValue) {
                isEnabled = true;
            }
        }

        return isEnabled;
    }

    function calculateBeriplexDose(inrValue, weightInKg) {
        var dose = null;
        if (inrValue && weightInKg) {            
            var weight = (Math.round(weightInKg / 10) * 10);
            if (weight > 100) {
                weight = 100;
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
}
