'use strict';

angular.module('app.protocolB').service('CriticalCareReferralControllerService', CriticalCareReferralControllerService);

CriticalCareReferralControllerService.$inject = [];

function CriticalCareReferralControllerService() {
 
    var service = {
        isNextButtonEnabled: isNextButtonEnabled
    };

    return service;

    function isNextButtonEnabled(isReferredToCriticalCare) {
        var isEnabled = false;

        if (isReferredToCriticalCare !== null) {
    		isEnabled = true;
    	}
        return isEnabled;
    }
}