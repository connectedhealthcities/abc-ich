'use strict';

angular.module('app.protocolA').service('ReversalAgentDetailsControllerService', ReversalAgentDetailsControllerService);

ReversalAgentDetailsControllerService.$inject = [];

function ReversalAgentDetailsControllerService() {
 
    var service = {
        isNextButtonEnabled: isNextButtonEnabled,
        showIsReversalTimeKnownCard: showIsReversalTimeKnownCard,
        showReversalTimeCard: showReversalTimeCard,
        hideReversalAgentOptionNone: hideReversalAgentOptionNone,
        hideReversalAgentOptionIdarucizumab: hideReversalAgentOptionIdarucizumab,
        hideReversalAgentOptionPCC: hideReversalAgentOptionPCC
    };

    return service;

    function isNextButtonEnabled(reversalAgent, reversalAgentAdministeredAtExternalHospital, reversalAgentAdministeredTimeKnown, reversalDate, reversalTime) {
        var isEnabled = false;

        if (reversalAgent !== null) {
            if (reversalAgent === "None") {
                isEnabled = true;
            }
            else {
                if (reversalAgentAdministeredAtExternalHospital) {
                    if (reversalAgentAdministeredTimeKnown !== null) {
                        if (!reversalAgentAdministeredTimeKnown) {
                            isEnabled = true;
                        }
                        else if (reversalDate !== null && reversalTime !== null) {
                            isEnabled = true;
                        }
                    }
                }
                else {
                    if (reversalDate !== null && reversalTime !== null) {
                        isEnabled = true;
                    }
                }
            }
        }
        return isEnabled;
    }

    function showIsReversalTimeKnownCard(reversalAgentAdministeredAtExternalHospital) {
        var isShow = false;

        if (reversalAgentAdministeredAtExternalHospital) {
            isShow = true;
        }
        return isShow;
    }

    function showReversalTimeCard(reversalAgentAdministeredAtExternalHospital, reversalAgentAdministeredTimeKnown, reversalAgent) {
        var isShow = false;

        if (reversalAgentAdministeredAtExternalHospital) {
            if (reversalAgentAdministeredTimeKnown) {
                isShow = true;
            }
        }
        else {
            if (reversalAgent !== null && reversalAgent !== "None") {
                isShow = true;
            }
        }
        return isShow;
    }

    function hideReversalAgentOptionNone(reversalAgentAdministeredAtExternalHospital) {
        var isHide = false;

        if (reversalAgentAdministeredAtExternalHospital) {
            isHide = true;
        }
        return isHide;
    }

    function hideReversalAgentOptionIdarucizumab(anticoagulantName){
        var isShow = true;

        if(anticoagulantName === "Dabigatran"){
            isShow = false;
        }

        return isShow;
    }

    function hideReversalAgentOptionPCC(anticoagulantName){
        var isShow = true;
        if(anticoagulantName === "Apixaban" || anticoagulantName === "Rivoroxaban" || anticoagulantName === "Edoxaban"){
            isShow = false;
        }

        return isShow;
    }
}