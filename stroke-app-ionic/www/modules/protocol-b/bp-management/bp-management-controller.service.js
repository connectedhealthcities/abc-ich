'use strict';

angular.module('app.protocolB').service('BpManagementControllerService', BpManagementControllerService);

BpManagementControllerService.$inject = ['DateTimeService'];

function BpManagementControllerService(DateTimeService) {
 
     var service = {
        isAddEntryButtonEnabled: isAddEntryButtonEnabled,
        getEntry: getEntry,
        isSbpOutOfRange: isSbpOutOfRange,
        isGtnRateOutOfRange: isGtnRateOutOfRange,
        isLabetalolOutOfRange: isLabetalolOutOfRange,
        isHeartRateOutOfRange: isHeartRateOutOfRange
    };

    return service

    function isAddEntryButtonEnabled(entryDate, entryTime, entrySbp, entryGtn, entryLabetalol, entryHeartRate) {
        var isEnabled = false;
        
        if (entryDate != null && entryTime != null && entrySbp != null &&
            (entrySbp !== null && !isSbpOutOfRange(entrySbp)) &&
            (entryGtn === null || !isGtnRateOutOfRange(entryGtn)) && //entryGtn and entryLabetalol are special cases because they dont have to be filled in but if they are they must meet the criteria in their respective range validation functions
            (entryLabetalol === null || !isLabetalolOutOfRange(entryLabetalol)) &&
            (entryHeartRate === null || !isHeartRateOutOfRange(entryHeartRate))) {
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

    function isSbpOutOfRange(entrySbp) {
        var showSbpOutOfRange = (entrySbp !== null && (entrySbp < 10 || entrySbp > 300));

        return showSbpOutOfRange;
    }

    function isGtnRateOutOfRange(entryGtn) {
        var showGtnRateOutOfRange = (entryGtn !== null && (entryGtn < 0 || entryGtn > 20));

        return showGtnRateOutOfRange;
    }

    function isLabetalolOutOfRange(entryLabetalol) {
        var showLabetalolOutOfRange = (entryLabetalol !== null && (entryLabetalol < 0 || entryLabetalol > 100));

        return showLabetalolOutOfRange;
    }

    function isHeartRateOutOfRange(entryHeartRate) {
        var showHeartRateOutOfRange = (entryHeartRate !== null && (entryHeartRate < 10 || entryHeartRate > 300));

        return showHeartRateOutOfRange;
    }

}
