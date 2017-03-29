'use strict';

angular.module('app.general').service('UserCredentialsConfigurationControllerService', UserCredentialsConfigurationControllerService);

UserCredentialsConfigurationControllerService.$inject = [];

function UserCredentialsConfigurationControllerService() {
 
    var service = {
        isTestLoginButtonEnabled: isTestLoginButtonEnabled
    };

    return service;

    function isTestLoginButtonEnabled(username, password) {
        var isEnabled = false;

        if (username !== null && password !== null && username !== "" && password !== "") {

    		isEnabled = true;
    	}
        return isEnabled;
    }
}