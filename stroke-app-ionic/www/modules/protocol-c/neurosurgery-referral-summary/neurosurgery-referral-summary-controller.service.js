'use strict';

angular.module('app.protocolC').service('NeurosurgeryReferralSummaryControllerService', NeurosurgeryReferralSummaryControllerService);

NeurosurgeryReferralSummaryControllerService.$inject = [];

function NeurosurgeryReferralSummaryControllerService() {
 
    var service = {
        isNextButtonEnabled: isNextButtonEnabled,
        showReferralDetailsCards: showReferralDetailsCards
    };

    return service;

    function isNextButtonEnabled(isReferred, referralDate, referralTime, neurosurgeonName, isAccepted) {
        var isEnabled = false;

        if (isReferred !== null) {
            if (isReferred) {
                if (referralDate !== null &&
                    referralTime !== null &&
                    neurosurgeonName !== null &&
                    isAccepted !== null) {

                    isEnabled = true;
                }
            }
            else {
                isEnabled = true;
            }
        }

        return isEnabled;
    }

    function showReferralDetailsCards(isReferred) {
        var isShow = false;

        if (isReferred) {
    		isShow = true;
    	}
        return isShow;
    }
}