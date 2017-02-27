'use strict';

angular.module('utils').service('BpStateCacheService', BpStateCacheService);

BpStateCacheService.$inject = ['LocalStorageService'];

function BpStateCacheService(LocalStorageService) {
 
     var STATE_START = "STATE_START";
     var STATE_ABOVE_THRESHOLD = "STATE_ABOVE_THRESHOLD";
     var STATE_ABOVE_THRESHOLD_CONFIRMED = "STATE_ABOVE_THRESHOLD_CONFIRMED";
     var STATE_TARGET_ACHIEVED = "STATE_TARGET_ACHIEVED";

     var current_bp_state_key = "bp-state";

     var service = {
        STATE_START: STATE_START,
        STATE_ABOVE_THRESHOLD: STATE_ABOVE_THRESHOLD,
        STATE_ABOVE_THRESHOLD_CONFIRMED: STATE_ABOVE_THRESHOLD_CONFIRMED,
        STATE_TARGET_ACHIEVED: STATE_TARGET_ACHIEVED,

        getCurrentState: getCurrentState,
        setCurrentState: setCurrentState,

        clearAll: clearAll
    };

    return service

    function getCurrentState() {
        var currentState = LocalStorageService.getItem(current_bp_state_key);
        if (currentState == null) {
            return STATE_START;
        }
        else {
            return currentState;
        }
    }

    function setCurrentState(currentState) {
        LocalStorageService.setItem(current_bp_state_key, currentState);
    }

    function clearAll() {
        LocalStorageService.setItem(current_bp_state_key, null);
    }

}
