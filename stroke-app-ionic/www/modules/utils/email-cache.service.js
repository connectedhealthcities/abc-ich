'use strict';

angular.module('utils').service('EmailCacheService', EmailCacheService);

EmailCacheService.$inject = [];

function EmailCacheService() {

    var _email = null;

    var service = {

        getEmail: getEmail,
        setEmail: setEmail,
    };
    
    return service;

    function getEmail() {
        return _email;
    }

    function setEmail(email) {
        _email = email;
    }
}
