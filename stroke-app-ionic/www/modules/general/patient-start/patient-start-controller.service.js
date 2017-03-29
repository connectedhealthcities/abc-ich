'use strict';

angular.module('app.general').service('PatientStartControllerService', PatientStartControllerService);

PatientStartControllerService.$inject = [];

function PatientStartControllerService() {
 
     var service = {
         isShowResumePatient: isShowResumePatient,
         isAppConfigured: isAppConfigured
    };

    return service;

    function isShowResumePatient(patientId) {
        var isShow = false;
        if (patientId != null) {
            isShow = true;
        }
        return isShow;
    }

    function isAppConfigured(username, password) {
        var isAppConfigured = false;

        if (username !== null && username !== "" &&
            password !== null && password !== "") {
            isAppConfigured = true;
        }

        return isAppConfigured;
    }
}