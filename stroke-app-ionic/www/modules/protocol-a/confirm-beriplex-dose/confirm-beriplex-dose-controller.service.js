'use strict';

angular.module('app.protocolA').service('ConfirmBeriplexDoseControllerService', ConfirmBeriplexDoseControllerService);

ConfirmBeriplexDoseControllerService.$inject = [];

function ConfirmBeriplexDoseControllerService() {
 
    var service = {
        isNextButtonEnabled: isNextButtonEnabled,
        isShowActualDose: isShowActualDose
    };

    return service;

    function isNextButtonEnabled(overrideCalculatedDose, actualDose) {
        var isEnabled = false;

        if (overrideCalculatedDose != null) {

            if (overrideCalculatedDose) {
                if (actualDose != null) {
                    isEnabled = true;
                }
            }
            else {
                isEnabled = true;
            }
        }
        return isEnabled;
    }

    function isShowActualDose(overrideCalculatedDose) {
        var isShow = false;

        if (overrideCalculatedDose) {
            isShow = true;
        }
        return isShow;
    }
}