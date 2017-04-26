'use strict';

angular.module('app.protocolA').service('AnticoagulantIdentificationControllerService', AnticoagulantIdentificationControllerService);

AnticoagulantIdentificationControllerService.$inject = [];

function AnticoagulantIdentificationControllerService() {
 
    var service = {
        getSliderConfig: getSliderConfig,
        isNextButtonEnabled: isNextButtonEnabled,
        isShowVitkList: isShowVitkList,
        isShowDoacList: isShowDoacList
    };

    return service;

    function getSliderConfig() {

        return {
           "images": [
                {
                    'src' : 'img/apixaban.jpg', 
                    'title' : 'Apixaban'
                }, 
                {
                    'src' : 'img/dabigatran.jpg', 
                    'title' : 'Dabigatran'
                }, 
                {
                    'src' : 'img/edoxaban.jpg', 
                    'title' : 'Edoxaban'
                }, 
                {
                    'src' : 'img/rivaroxaban.jpg', 
                    'title' : 'Rivaroxaban'
                }
            ],
            "options": {
                loop: false,
                effect: 'fade',
                speed: 500
            }
       };
    }

    function isNextButtonEnabled(anticoagulantType, anticoagulantName) {
        var isEnabled = false;

        if (anticoagulantType != null) {
            if ( (anticoagulantType === "Unknown") ||
                 (anticoagulantType === "None") ||
                 (anticoagulantType == "Vitamin K antagonist" && anticoagulantName != null) ||
                 (anticoagulantType == "DOAC" && anticoagulantName != null) ) {
                isEnabled = true;
            }
        }
        return isEnabled;
    }

    function isShowVitkList(anticoagulantType) {
        var isShow = false;

        if (anticoagulantType === 'Vitamin K antagonist') {
            isShow = true;
        }
        return isShow;
    }

    function isShowDoacList(anticoagulantType) {
        var isShow = false;

        if (anticoagulantType === 'DOAC') {
            isShow = true;
        }
        return isShow;
    }
}