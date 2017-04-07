'use strict';

angular.module('app.protocolC').service('NeurosurgeryReferralCriteriaControllerService', NeurosurgeryReferralCriteriaControllerService);

NeurosurgeryReferralCriteriaControllerService.$inject = [];

function NeurosurgeryReferralCriteriaControllerService() {
 
    var service = {
        isIchVolumeWithinRange: isIchVolumeWithinRange,
        isNextButtonEnabled: isNextButtonEnabled,
        calculateVolume: calculateVolume,
        isNeuroReferralRequired: isNeuroReferralRequired,
        getSliderConfig: getSliderConfig,
        showIchVolumeField: showIchVolumeField
    };

    return service

    function isIchVolumeWithinRange(ichVolume) {
        var isIchVolumeWithinRange = true;

        if (ichVolume !== null && (ichVolume < 0 || ichVolume > 500)) {
            isIchVolumeWithinRange = false;
        }

        return isIchVolumeWithinRange;
    }

    function isNextButtonEnabled(ichVolume, isPosteriorFossaIch, isObstruction ) {
        var isEnabled = false;

        if (ichVolume != null && isIchVolumeWithinRange(ichVolume) &&
            isPosteriorFossaIch != null &&
            isObstruction != null) {
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

    function isNeuroReferralRequired(gcsScore, ichVolume, isPosteriorFossaIch, isVentricleObstructed, GCS_THRESHOLD, ICH_VOLUME_THRESHOLD) {
        var isNeuroReferralRequired = true;

        if (gcsScore >= GCS_THRESHOLD
            && ichVolume < ICH_VOLUME_THRESHOLD
            && !isPosteriorFossaIch
            && !isVentricleObstructed) {

            isNeuroReferralRequired = false;
        }

        return isNeuroReferralRequired;
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
}
