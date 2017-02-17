'use strict';

angular.module('utils').service('HospitalHttpService', HospitalHttpService);

HospitalHttpService.$inject = ['$http', '$q', 'ServerUrlService'];

function HospitalHttpService($http, $q, ServerUrlService) {

//cjd    var _hospitals = null;
    var _hospitals = [
        {
            "uniqueId": "HOSP_2",
            "name": "Hospital 2"
        },
        {
            "uniqueId": "HOSP_3",
            "name": "Hospital 3"
        },
        {
            "uniqueId": "HOSP_4",
            "name": "Hospital 4"
        }
    ];

    var service = {
        getHospitals: getHospitals
    };

    return service;

	function getHospitals() {
        if (_hospitals) {
            return $q.when(_hospitals);
        }
        else {
            var urlPrefix = ServerUrlService.getUrlPrefix();
            return $http.get(urlPrefix + '/api/hospitals').then(function(response) {
                _hospitals = response.data;			    			    	
                return _hospitals;
            });               
        }
    }
}