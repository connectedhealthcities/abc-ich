'use strict';

angular.module('utils').service('LocalStorageService', LocalStorageService);

LocalStorageService.$inject = ['$window', 'IS_DEMO_MODE_KEY'];

function LocalStorageService($window, IS_DEMO_MODE_KEY) {

    var service = {
        getItem: getItem,
        setItem: setItem
    };

    return service

    function getItem(key) {
        var key = getKey(key);
        return JSON.parse($window.localStorage.getItem(key));
    }

    function setItem(key, value) {
        var key = getKey(key);
        $window.localStorage.setItem(key, JSON.stringify(value));
    }

    function getKey(key) {
        if (key !== IS_DEMO_MODE_KEY) {
            var isDemoMode = JSON.parse($window.localStorage.getItem(IS_DEMO_MODE_KEY));
            if (isDemoMode) {
                key = "demo_" + key;
            }
        }
        return key;
    }
}
