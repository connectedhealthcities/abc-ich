'use strict';

angular.module('utils').service('PatientHttpService', PatientHttpService);

PatientHttpService.$inject = ['$http', 'ServerUrlService', '$q'];

function PatientHttpService($http, ServerUrlService, $q) {

    var service = {
        registerPatient: registerPatient,
        updatePatient: updatePatient
     };

    return service;

	function registerPatient(initials, birthDate, estimatedAge, isDuplicateAllowed) {
        //cjd ToDo - replace $q with http request
        
        // if (isDuplicateAllowed) {
        //     return $q.when( { "success": true, "patient": { "uniqueId": "HOSPID-ABC-67", "id": 1, "isDuplicate": false } } );
        // }
        // else {
        //     return $q.when( { "success": true, "patient": { "uniqueId": "HOSPID-ABC-67", "id": null, "isDuplicate": false } } );
        // }
        

        var patient = {
            "initials": initials,
            "birthDate": birthDate,
            "estimatedAge": estimatedAge,
            "isDuplicateAllowed": isDuplicateAllowed
        };

        var urlPrefix = ServerUrlService.getUrlPrefix();
        return $http.post(urlPrefix + '/api/patients', patient)
            .then(function(response) {
            return { "success": true, "patient": response.data};
        }, function() {
            return { "success": false };
        });
               
    }

    function updatePatient(patient) {
       //cjd ToDo - replace $q with http request
 
        // return $q.when(true);

        var urlPrefix = ServerUrlService.getUrlPrefix();
        return $http.put(urlPrefix + '/api/patients', patient)
            .then(function() {
                return true;
             }, function() {
                return false;
            });
    }
}