'use strict';

angular.module('utils').service('LocalStorageService', LocalStorageService);

LocalStorageService.$inject = ['$window'];

function LocalStorageService($window) {

     var service = {
        getItem: getItem,
        setItem: setItem
    };

    return service

    function getItem(key) {
        return JSON.parse($window.localStorage.getItem(key));
    }

    function setItem(key, value) {
        $window.localStorage.setItem(key, JSON.stringify(value));
    }
}
