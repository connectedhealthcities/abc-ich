'use strict';

angular.module('app.protocolB').service('BpManagementControllerService', BpManagementControllerService);

BpManagementControllerService.$inject = [];

function BpManagementControllerService() {
 
     var UPPER_TREATMENT_THRESHOLD = 200;
     var LOWER_TREATMENT_THRESHOLD = 150;
     var UPPER_TREATMENT_TARGET = 180;
     var LOWER_TREATMENT_TARGET = 140;

     var service = {
        isAddEntryButtonEnabled: isAddEntryButtonEnabled,
        getEntry: getEntry,
        isSbpOutOfRange: isSbpOutOfRange,
        isGtnRateOutOfRange: isGtnRateOutOfRange,
        isLabetalolOutOfRange: isLabetalolOutOfRange,
        isHeartRateOutOfRange: isHeartRateOutOfRange,
        getTreatmentTargetAndThreshold: getTreatmentTargetAndThreshold,
        getTargetAchievedText: getTargetAchievedText,
        getOnsetTimeText: getOnsetTimeText
    };

    return service

    function isAddEntryButtonEnabled(entryDate, entryTime, entrySbp, entryGtn, entryLabetalol, entryHeartRate) {
        var isEnabled = false;
        
        if (entryDate != null && entryTime != null &&
            (entrySbp !== null && !isSbpOutOfRange(entrySbp)) &&
            (entryGtn === null || !isGtnRateOutOfRange(entryGtn)) && //entryGtn and entryLabetalol are special cases because they dont have to be filled in but if they are they must meet the criteria in their respective range validation functions
            (entryLabetalol === null || !isLabetalolOutOfRange(entryLabetalol)) &&
            (entryHeartRate === null || !isHeartRateOutOfRange(entryHeartRate))) {
            isEnabled = true;
        }

        return isEnabled;
    }

    function getEntry(entryDateTime, entrySbp, entryGtn, entryLabetalol, entryHeartRate) {
 
         var entry = {
            "dateTime": entryDateTime,
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

    function getTreatmentTargetAndThreshold(onsetDateTime, nowDateTime) {
        var treatmentThreshold;
        var treatmentTarget;
        var onsetTimeText;
        var SIX_HOURS_IN_MILLISECONDS = 6 * 60 * 60 * 1000;
        var onsetMs = onsetDateTime.getTime();
        var nowMs = nowDateTime.getTime();
        var diffMs = nowMs - onsetMs;   
        
        if (diffMs >= SIX_HOURS_IN_MILLISECONDS) {
            treatmentThreshold = UPPER_TREATMENT_THRESHOLD;
            treatmentTarget = UPPER_TREATMENT_TARGET;
        }
        else {
            treatmentThreshold = LOWER_TREATMENT_THRESHOLD;
            treatmentTarget = LOWER_TREATMENT_TARGET;
        }

        var treatmentTargetAndThresholdCardModel = {
            treatmentThreshold: treatmentThreshold,
            treatmentTarget: treatmentTarget
        };

        return treatmentTargetAndThresholdCardModel;
    }

    function getOnsetTimeText(treatmentThreshold) {
        return (treatmentThreshold === UPPER_TREATMENT_THRESHOLD) ? "greater than" : "less than"

    }

    function getTargetAchievedText(treatmentThreshold) {
        var targetAchievedText = treatmentThreshold === UPPER_TREATMENT_THRESHOLD ? "130 to 180 mmHg" : "130 to 140 mmHg";
        return targetAchievedText;
    }
}
