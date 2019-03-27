'use strict';

angular.module('app.protocolC').service('NeurosurgeryReferralCriteriaControllerService', NeurosurgeryReferralCriteriaControllerService);

NeurosurgeryReferralCriteriaControllerService.$inject = [];

function NeurosurgeryReferralCriteriaControllerService() {
 
    var service = {
        isIchVolumeWithinRange: isIchVolumeWithinRange,
        isNextButtonEnabled: isNextButtonEnabled,
        isAddEntryButtonEnabled: isAddEntryButtonEnabled,
        calculateVolume: calculateVolume,
        isNeuroReferralRequired: isNeuroReferralRequired,
        getSliderConfig: getSliderConfig,
        showIchVolumeField: showIchVolumeField,
        getEntry: getEntry
    };

    return service

    function isIchVolumeWithinRange(ichVolume) {
        var isIchVolumeWithinRange = true;

        if (ichVolume !== null && (ichVolume < 0 || ichVolume > 500)) {
            isIchVolumeWithinRange = false;
        }

        return isIchVolumeWithinRange;
    }

    function isAddEntryButtonEnabled(ichVolume) {
        var isEnabled = false;

        if (ichVolume != null && isIchVolumeWithinRange(ichVolume)) {
            isEnabled = true;
        }

        return isEnabled;
    }

    function isNextButtonEnabled(ichEntries, posteriorFossaIch, isObstruction) {
        var isEnabled = false;

        if (ichEntries != null && posteriorFossaIch != null && isObstruction != null && ichEntries.length > 0) {
            isEnabled = true;
        }

        return isEnabled;
    }

    function calculateVolume(longestAxis, perpendicularAxis, numSlices, sliceThickness) {
        var ichvolume = null;

        if (longestAxis != null &&
            perpendicularAxis != null &&
            numSlices != null &&
            sliceThickness != null) {
            var volume = longestAxis * perpendicularAxis * numSlices * sliceThickness / 2;
            ichvolume = parseFloat(volume).toFixed(2);
        }

        return ichvolume;
    }

    function isNeuroReferralRequired(gcsScore, ichEntries, isPosteriorFossaIch, isVentricleObstructed, GCS_THRESHOLD, ICH_VOLUME_THRESHOLD) {
        var isNeuroReferralRequired = true;

        var totalIchVolume = getTotalIchVolume(ichEntries);
        if (gcsScore >= GCS_THRESHOLD
            && totalIchVolume < ICH_VOLUME_THRESHOLD
            && !isPosteriorFossaIch
            && !isVentricleObstructed) {

            isNeuroReferralRequired = false;
        }

        return isNeuroReferralRequired;
    }

    function getTotalIchVolume(ichEntries){
        var totalVolume = 0.0;
        for(var i = 0; i < ichEntries.length; i++){
            totalVolume += parseFloat(ichEntries[i].ichVolume);
        }

        return totalVolume.toFixed(2);
    }

    function getSliderConfig() {
        return {
            "images": [
                {
                    'src': 'img/occluded-3rd.jpg',
                    'title': 'occluded 3rd'
                },
                {
                    'src': 'img/occluded-4th.jpg',
                    'title': 'occluded 4th'
                },
                {
                    'src': 'img/externally-compressed-3rd.jpg',
                    'title': 'externally compressed 3rd'
                },
                {
                    'src': 'img/externally-compressed-4th.jpg',
                    'title': 'externally compressed 4th'
                }
            ],
            "options": {
                "loop": false,
                "effect": 'fade',
                "speed": 500
            }
        };
    }

    function showIchVolumeField(ichVolume) {
        var showIchVolume = ichVolume != null;
        return showIchVolume;
    }

    function getEntry(longestAxis, longestAxisPerpendicular, numberOfSlices, sliceThickness, ichVolume) {
 
         var entry = {
            "longestAxis": longestAxis,
            "longestAxisPerpendicular": longestAxisPerpendicular,
            "numberOfSlices": numberOfSlices,
            "sliceThickness": sliceThickness,
            "ichVolume": ichVolume
        };

        return entry;
    }
}
