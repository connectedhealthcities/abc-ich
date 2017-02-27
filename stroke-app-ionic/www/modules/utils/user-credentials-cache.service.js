'use strict';

angular.module('utils').service('UserCredentialsCacheService', UserCredentialsCacheService);

UserCredentialsCacheService.$inject = ['LocalStorageService'];

function UserCredentialsCacheService(LocalStorageService) {

    var username_key = "credentials-username";
    var password_key = "credentials-password";

    var service = {

        getUsername: getUsername,
        setUsername: setUsername,

        setPassword: setPassword,
        getPassword: getPassword
    };
    
    return service;

    function getUsername() {
        return LocalStorageService.getItem(username_key);
    }

    function setUsername(username) {
        LocalStorageService.setItem(username_key, username);
    }

    function getPassword() {
        return LocalStorageService.getItem(password_key);
    }

    function setPassword(password){
        LocalStorageService.setItem(password_key, password);
    }
}
