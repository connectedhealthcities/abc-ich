'use strict';

angular.module('app.protocolA').service('AdministerBeriplexControllerService', AdministerBeriplexControllerService);

AdministerBeriplexControllerService.$inject = [];

function AdministerBeriplexControllerService() {
 
    var service = {
        isNextButtonEnabled: isNextButtonEnabled,
        showBeriplexDateTimeCard: showBeriplexDateTimeCard,
        showVitaminkDateTimeCard: showVitaminkDateTimeCard,
        showVitaminKCards: showVitaminKCards,
        isPCCTopupButtonEnabled: isPCCTopupButtonEnabled,
    };

    return service;

    function isNextButtonEnabled(isBeriplexAdministered, isVitkAdministered, beriplexDate, beriplexTime, vitkDate, vitkTime) {
        var isEnabled = false;

        if (isBeriplexAdministered != null &&
            !isBeriplexAdministered &&
            isVitkAdministered != null &&
            !isVitkAdministered) {
            isEnabled = true;
        }
        else if (isBeriplexAdministered != null &&
            isBeriplexAdministered &&
            isVitkAdministered != null &&
            !isVitkAdministered) {
            if (beriplexDate != null &&
                beriplexTime != null) {
                isEnabled = true;
            }
        }
        else if (isBeriplexAdministered != null &&
            !isBeriplexAdministered &&
            isVitkAdministered != null &&
            isVitkAdministered) {
            if (vitkDate != null &&
                vitkTime != null) {
                isEnabled = true;
            }
        }
        else {
            if (beriplexDate != null &&
                beriplexTime != null &&
                vitkDate != null &&
                vitkTime != null) {
                isEnabled = true;
            }
        }

        return isEnabled;
    }

    function showBeriplexDateTimeCard(isBeriplexAdministered) {
        var isShow = false;

        if (isBeriplexAdministered) {
            isShow = true;
        }
        return isShow;
    }

    function showVitaminkDateTimeCard(isVitkAdministered) {
        var isShow = false;

        if (isVitkAdministered) {
            isShow = true;
        }
        return isShow;
    }

    function showVitaminKCards(anticoagulantType){
        var isShow = true;

        if(anticoagulantType === "DOAC"){
            isShow = false;
        }

        return isShow;
    }

    function isPCCTopupButtonEnabled(inrValue, hasDoacBeenTaken){
        var enabled = true;

        if(inrValue || hasDoacBeenTaken){
            enabled = false; 
        }

        return enabled;
    }
}