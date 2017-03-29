'use strict';

angular.module('app.general').service('EmailConfigurationControllerService', EmailConfigurationControllerService);

EmailConfigurationControllerService.$inject = [];

function EmailConfigurationControllerService() {
 
    var service = {
        isSendTestEmailButtonEnabled: isSendTestEmailButtonEnabled,
        isSaveButtonEnabled: isSaveButtonEnabled
    };

    return service;

    function isSendTestEmailButtonEnabled(emailAddress) {
        var isEnabled = false;

        if (emailAddress !== null && emailAddress !== undefined && emailAddress !== "") {
    		isEnabled = true;
    	}
        return isEnabled;
    }

    function isSaveButtonEnabled(emailAddress) {
        var isEnabled = true;

        if (emailAddress === undefined) {
            isEnabled = false;
        }

        return isEnabled;
    }
}