'use strict';

angular.module('app.protocolA').service('AdministerTopupDoseControllerService', AdministerTopupDoseControllerService);

AdministerTopupDoseControllerService.$inject = [];

function AdministerTopupDoseControllerService() {
 
    var service = {
        isTopupDoseValid: isTopupDoseValid,
        isInrValueValid: isInrValueValid,
        isCalculatedDoseValid: isCalculatedDoseValid,
        isActualDoseValid: isActualDoseValid,
        showCalculatedDoseCard: showCalculatedDoseCard,
        showActualDoseCard: showActualDoseCard,
        isNextButtonEnabled: isNextButtonEnabled
    };

    return service;

    function isTopupDoseValid(topupDose){
        var isValid = false;

        if(topupDose > 0){
            isValid = true;
        }

        return isValid;
    }

    function isInrValueValid(inrValue){
        var isValid = false;

        if(inrValue >= 1.3 && inrValue <= 10.0){
            isValid = true;
        }

        return isValid;
    }

    function isCalculatedDoseValid(calculatedDose, overrideCalculatedDose){
        var isValid = false;

        if(isTopupDoseValid(calculatedDose) || overrideCalculatedDose){
            isValid = true;
        }

        return isValid;
    }

    function isActualDoseValid(actualDose, overrideCalculatedDose){
        var isValid = false;

        if(isTopupDoseValid(actualDose) || !overrideCalculatedDose){
            isValid = true;
        }

        return isValid;
    }

    function showCalculatedDoseCard(inrValue){
        var isShow = false;

        if(isInrValueValid(inrValue) && inrValue != null){
            isShow = true;
        }

        return isShow;
    }

    function showActualDoseCard(inrValue, overrideCalculatedDose){
        var isShow = false;

        if(isInrValueValid(inrValue) && inrValue != null && overrideCalculatedDose){
            isShow = true;
        }

        return isShow;
    }

    function isNextButtonEnabled(inrValue, topupCalculatedDose, topupActualDose, overrideCalculatedDose){
        var isEnabled = false;

        if(isInrValueValid(inrValue) && isCalculatedDoseValid(topupCalculatedDose, overrideCalculatedDose)
            && isActualDoseValid(topupActualDose, overrideCalculatedDose)){
            isEnabled = true;
        }

        return isEnabled;
    }
}