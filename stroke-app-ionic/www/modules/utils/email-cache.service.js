'use strict';

angular.module('utils').service('EmailCacheService', EmailCacheService);

EmailCacheService.$inject = ['LocalStorageService'];

function EmailCacheService(LocalStorageService) {

    var email_key = "email";
 
    var service = {

        getEmail: getEmail,
        setEmail: setEmail
    };
    
    return service;

    function getEmail() {
        return LocalStorageService.getItem(email_key);
    }

    function setEmail(email) {
        LocalStorageService.setItem(email_key, email);
    }
}
