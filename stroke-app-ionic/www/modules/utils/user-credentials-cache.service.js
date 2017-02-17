'use strict';

angular.module('utils').service('UserCredentialsCacheService', UserCredentialsCacheService);

UserCredentialsCacheService.$inject = [];

function UserCredentialsCacheService() {

    var _username = null;
    var _password = null;

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
