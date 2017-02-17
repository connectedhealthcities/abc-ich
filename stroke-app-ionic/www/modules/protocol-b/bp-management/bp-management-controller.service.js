'use strict';

angular.module('app.protocolB').service('BpManagementControllerService', BpManagementControllerService);

BpManagementControllerService.$inject = ['DateTimeService'];

function BpManagementControllerService(DateTimeService) {
 
     var _state_start = "Start";
     var _state_above_threshold = "Above threshold";
     var _state_above_threshold_confirmed = "Above threshold confirmed";
     var _state_target_achieved = "Target achieved";

     var _current_state = _state_start;

     var service = {
        STATE_START: _state_start,
        STATE_ABOVE_THRESHOLD: _state_above_threshold,
        STATE_ABOVE_THRESHOLD_CONFIRMED: _state_above_threshold_confirmed,
        STATE_TARGET_ACHIEVED: _state_target_achieved,
        getCurrentState: getCurrentState,
        setCurrentState: setCurrentState,

        isAddEntryButtonEnabled: isAddEntryButtonEnabled,
        getEntry: getEntry,

        clearAll: clearAll
    };

    return service

    function isAddEntryButtonEnabled(entryDate, entryTime, entrySbp) {
        var isEnabled = false;

        if(entryDate != null && entryTime != null && entrySbp != null) {
            isEnabled = true;
        }

        return isEnabled;
    }

    function getEntry(entryDate, entryTime, entrySbp, entryGtn, entryLabetalol) {
 
         var entry = {
            "dateTime": DateTimeService.getDateTimeFromDateAndTime(entryDate, entryTime),
            "systolicBp": entrySbp,
            "gtnRate": entryGtn,
            "labetalolDose": entryLabetalol 
            // , "heartRate": //cjd do we need heart rate?
        };

        return entry;
    }

    function getCurrentState() {
        return _current_state;
    }

    function setCurrentState(currentState) {
        _current_state = currentState;
    }

    function clearAll() {
        _current_state = _state_start;
    }

}
