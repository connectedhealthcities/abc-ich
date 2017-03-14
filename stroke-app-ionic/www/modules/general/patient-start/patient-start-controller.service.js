'use strict';

angular.module('app.general').service('PatientStartControllerService', PatientStartControllerService);

PatientStartControllerService.$inject = [];

function PatientStartControllerService() {
 
     var service = {
        isShowResumePatient: isShowResumePatient
    };

    return service;

    function isShowResumePatient(patientId) {
        var isShow = false;
        if (patientId != null) {
            isShow = true;
        }
        return isShow;
    }
}