'use strict';

angular.module('utils').service('UserCredentialsCacheService', UserCredentialsCacheService);

UserCredentialsCacheService.$inject = ['LocalStorageService'];

function UserCredentialsCacheService(LocalStorageService) {

    var username_key = "credentials-username";
    var password_key = "credentials-password";
    var server_address_key = "server-address";

    var service = {

        getUsername: getUsername,
        setUsername: setUsername,

        setPassword: setPassword,
        getPassword: getPassword,

        setServerAddress: setServerAddress,
        getServerAddress: getServerAddress,

        isUserCredentialsSet: isUserCredentialsSet
    };
    
    return service;

    function isUserCredentialsSet() {
        return (LocalStorageService.getItem(username_key) !== null && LocalStorageService.getItem(password_key) !== null);
    }

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

    function getServerAddress(){
        return LocalStorageService.getItem(server_address_key);
    }

    function setServerAddress(serverAddress){
        LocalStorageService.setItem(server_address_key, serverAddress);
    }
}
