'use strict';

angular.module('utils').service('PatientHttpService', PatientHttpService);

PatientHttpService.$inject = ['$http', 'ServerUrlService', '$ionicLoading'];

function PatientHttpService($http, ServerUrlService, $ionicLoading) {

    var service = {
        registerPatient: registerPatient,
        updatePatient: updatePatient
     };

    return service;

	function registerPatient(initials, birthDate, estimatedAge, isDuplicateAllowed) {        

        var patient = {
            "initials": initials,
            "birthDate": birthDate,
            "estimatedAge": estimatedAge,
            "isDuplicateAllowed": isDuplicateAllowed
        };

        var urlPrefix = ServerUrlService.getUrlPrefix();
        $ionicLoading.show();
        return $http.post(urlPrefix + '/api/patients', patient).then(
            function(response) {
                $ionicLoading.hide();
                return { "success": true, "patient": response.data};
            },
            function() {
                $ionicLoading.hide();
                return { "success": false };
            });
               
    }

    function updatePatient(patient) {

        var urlPrefix = ServerUrlService.getUrlPrefix();
        $ionicLoading.show();
        return $http.put(urlPrefix + '/api/patients', patient).then(
            function() {
                $ionicLoading.hide();
                return true;
             },
             function() {
                $ionicLoading.hide();
                return false;
            });
    }
}