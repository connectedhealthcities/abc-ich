'use strict';

angular.module('app.protocolB').service('BpManagementControllerService', BpManagementControllerService);

BpManagementControllerService.$inject = ['DateTimeService'];

function BpManagementControllerService(DateTimeService) {
 
     var service = {
        isAddEntryButtonEnabled: isAddEntryButtonEnabled,
        getEntry: getEntry
    };

    return service

    function isAddEntryButtonEnabled(entryDate, entryTime, entrySbp) {
        var isEnabled = false;

        if(entryDate != null && entryTime != null && entrySbp != null) {
            isEnabled = true;
        }

        return isEnabled;
    }

    function getEntry(entryDate, entryTime, entrySbp, entryGtn, entryLabetalol, entryHeartRate) {
 
         var entry = {
            "dateTime": DateTimeService.getDateTimeFromDateAndTime(entryDate, entryTime),
            "systolicBp": entrySbp,
            "gtnRate": entryGtn,
            "labetalolDose": entryLabetalol,
            "heartRate": entryHeartRate
        };

        return entry;
    }
}
