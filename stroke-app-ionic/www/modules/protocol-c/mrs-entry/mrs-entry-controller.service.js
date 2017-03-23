'use strict';

angular.module('app.protocolC').service('MrsEntryControllerService', MrsEntryControllerService);

MrsEntryControllerService.$inject = [];

function MrsEntryControllerService() {
 
    var service = {
        isNextButtonEnabled: isNextButtonEnabled
    };

    return service;

    function isNextButtonEnabled(mrsValue) {
        var isEnabled = false;

        if (mrsValue !== null) {
    		isEnabled = true;
    	}
        return isEnabled;
    }
}