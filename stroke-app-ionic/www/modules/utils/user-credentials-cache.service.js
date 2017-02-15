'use strict';

angular.module('utils').service('UserCredentialsCacheService', UserCredentialsCacheService);

UserCredentialsCacheService.$inject = [];

function UserCredentialsCacheService() {

    var _username = "admin"; //cjd change to null when config screen is done
    var _password = "admin"; //cjd change to null when config screen is done

    var service = {

        getUsername: getUsername,
        setUsername: setUsername,

        setPassword: setPassword,
        getPassword: getPassword
    };
    
    return service;

    function getUsername() {
        return _username;
    }

    function setUsername(username) {
        _username = username;
    }

    function getPassword() {
        return _password;
    }

    function setPassword(password){
        _password = password;
    }
}
