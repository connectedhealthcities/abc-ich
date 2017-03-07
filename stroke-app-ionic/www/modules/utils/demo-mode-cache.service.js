'use strict';

angular.module('utils').service('DemoModeCacheService', DemoModeCacheService);

DemoModeCacheService.$inject = ['LocalStorageService', 'IS_DEMO_MODE_KEY'];

function DemoModeCacheService(LocalStorageService, IS_DEMO_MODE_KEY) {
 
     var service = {

        getIsDemoMode: getIsDemoMode,
        setIsDemoMode: setIsDemoMode
    };

    return service

    function getIsDemoMode() {
        return LocalStorageService.getItem(IS_DEMO_MODE_KEY);
        if (currentState == null) {
            return STATE_START;
        }
        else {
            return currentState;
        }
    }

    function setIsDemoMode(isDemoMode) {
        LocalStorageService.setItem(IS_DEMO_MODE_KEY, isDemoMode);
    }
}
