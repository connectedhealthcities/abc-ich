'use strict';

angular.module('app.general').service('GcsEntryControllerService', GcsEntryControllerService);

GcsEntryControllerService.$inject = [];

function GcsEntryControllerService() {
 
    var service = {
        isNextButtonEnabled: isNextButtonEnabled,
        getGcsTotal: getGcsTotal
    };

    return service;

    function isNextButtonEnabled(eyeValue, verbalValue, motorValue) {
        var isEnabled = false;

        if( eyeValue !== null && verbalValue !== null && motorValue !== null) {

    		isEnabled = true;
    	}
        return isEnabled;
    }

    function getGcsTotal(eyeValue, verbalValue, motorValue) {
        var total = null;

    	if(eyeValue !== null && verbalValue !== null && motorValue !== null) {
    		total = eyeValue + verbalValue + motorValue;
    	}
        return total;
    }
}