'use strict';

angular.module('utils').service('HospitalHttpService', HospitalHttpService);

HospitalHttpService.$inject = ['$http', '$q', 'AuthenticationService', 'ServerUrlService'];

function HospitalHttpService($http, $q, AuthenticationService, ServerUrlService) {

    var service = {
        getHospitals: getHospitals
    };

    return service;

    var _hospitals = null;

	function getHospitals() {
        if (_hospitals) {
            return $q.when(_hospitals);
        }
        else {
            return AuthenticationService.authenticate().then(function(data) {
                var urlPrefix = ServerUrlService.getUrlPrefix();
                return $http.get(urlPrefix + '/api/hospitals').then(function(response) {
                    _hospitals = response.data;			    			    	
                    return _hospitals;
                });               
            });
        }
    }
}