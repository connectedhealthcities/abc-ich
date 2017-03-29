'use strict';

angular.module('app.protocolB').service('NeurosurgeryReferralCriteriaControllerService', NeurosurgeryReferralCriteriaControllerService);

NeurosurgeryReferralCriteriaControllerService.$inject = [];

function NeurosurgeryReferralCriteriaControllerService() {
 
    var service = {
        isNextButtonEnabled: isNextButtonEnabled,
        isIchVolumeOutOfRange: isIchVolumeOutOfRange
    };

    return service

    function isIchVolumeOutOfRange(ichVolume) {
        var isIchVolumeOutOfRange = (ichVolume !== null && (ichVolume < 0 || ichVolume > 500));

        return isIchVolumeOutOfRange;
    }

    function isNextButtonEnabled(ichVolume, isPosteriorFossaIch, isObstruction ) {
        var isEnabled = false;

        if (ichVolume != null && !isIchVolumeOutOfRange(ichVolume) &&
            isPosteriorFossaIch != null &&
            isObstruction != null) {
            isEnabled = true;
        }

        return isEnabled;
    }
}
