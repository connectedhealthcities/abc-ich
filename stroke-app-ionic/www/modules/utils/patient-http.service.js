'use strict';

angular.module('utils').service('PatientHttpService', PatientHttpService);

PatientHttpService.$inject = ['$q'];

function PatientHttpService($q) {

    var service = {
        registerPatient: registerPatient,
     };

    return service;

	function registerPatient(initials, birthDate, estimatedAge, allowDuplicate) {
        //cjd ToDo - replace $q with http request
        
        if (allowDuplicate) {
            return $q.when( { "uniqueId": "HOSPID-ABC-67", "isDuplicate": false } );
        }
        else {
            return $q.when( { "uniqueId": "HOSPID-ABC-67", "isDuplicate": true } );
        }
        

        // var patient = {
        //     "initials": initials,
        //     "birthDate": birthDate,
        //     "estimatedAge": estimatedAge,
        //     "allowDuplicate": allowDuplicate
        // };

        // var urlPrefix = ServerUrlService.getUrlPrefix();
        // return $http.post(urlPrefix + '/api/patients', patient).then(function(response) {
        //     return response.data;;
        // });               
    }
}