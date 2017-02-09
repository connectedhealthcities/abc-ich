'use strict';

angular.module('utils').service('PatientHttpService', PatientHttpService);

PatientHttpService.$inject = ['$timeout'];

function PatientHttpService($timeout) {

    var service = {
        registerPatient: registerPatient,
     };

    return service;

	function registerPatient(initials) {
        //cjd ToDo - replace timeout with http request
        return $timeout().then(function () {
            return { "patientId": "dummy-patient-id", "alreadyRegistered": true };
        });
    }
}