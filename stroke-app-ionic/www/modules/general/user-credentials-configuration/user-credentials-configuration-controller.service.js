'use strict';

angular.module('app.general').service('UserCredentialsConfigurationControllerService', UserCredentialsConfigurationControllerService);

UserCredentialsConfigurationControllerService.$inject = [];

function UserCredentialsConfigurationControllerService() {
 
    var service = {
        isTestLoginButtonEnabled: isTestLoginButtonEnabled
    };

    return service;

    function isTestLoginButtonEnabled(username, password, serverAddress) {
        var isEnabled = false;

        if (username !== null && password !== null && serverAddress !== null && username !== "" && password !== "" && serverAddress !== "") {

    		isEnabled = true;
    	}
        return isEnabled;
    }
}