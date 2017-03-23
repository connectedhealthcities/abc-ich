'use strict';

angular.module('app.general').service('EmailConfigurationControllerService', EmailConfigurationControllerService);

EmailConfigurationControllerService.$inject = [];

function EmailConfigurationControllerService() {
 
    var service = {
        isSendTestEmailButtonEnabled: isSendTestEmailButtonEnabled
    };

    return service;

    function isSendTestEmailButtonEnabled(emailAddress) {
        var isEnabled = false;

        if(emailAddress != null) {

    		isEnabled = true;
    	}
        return isEnabled;
    }
}