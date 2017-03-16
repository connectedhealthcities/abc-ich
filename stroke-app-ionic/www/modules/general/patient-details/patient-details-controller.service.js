'use strict';

angular.module('app.general').service('PatientDetailsControllerService', PatientDetailsControllerService);

PatientDetailsControllerService.$inject = [];

function PatientDetailsControllerService() {
 
    var service = {
        isNextButtonEnabled: isNextButtonEnabled,
        isShowTimeSinceOnsetText: isShowTimeSinceOnsetText
    };

    return service;

    function isNextButtonEnabled(doorDate, doorTime, onsetDate, onsetTime, isOnsetLastSeenWell, isOnsetBestEstimate) {
        var isEnabled = false;

        if( doorDate != null &&
            doorTime != null && 
            onsetDate != null && 
            onsetTime != null && 
            isOnsetLastSeenWell != null &&
            isOnsetBestEstimate != null) {

    		isEnabled = true;
    	}
        return isEnabled;
    }

    function isShowTimeSinceOnsetText(timeSinceOnsetText) {
        var isShow = false;

        if (timeSinceOnsetText != null) {
            isShow = true;
        }
        return isShow;
    }
}