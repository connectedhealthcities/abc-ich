'use strict';

angular.module('utils').service('HospitalHttpService', HospitalHttpService);

HospitalHttpService.$inject = ['$http', '$q', 'ServerUrlService'];

function HospitalHttpService($http, $q, ServerUrlService) {

//cjd    var _hospitals = null;
    var _hospitals = [
        {
            "uniqueId": "HOSP1",
            "name": "Hospital 1"
        },
        {
            "uniqueId": "HOSP2",
            "name": "Hospital 2"
        },
        {
            "uniqueId": "HOSP3",
            "name": "Hospital 3"
        },
        {
            "uniqueId": "HOSP4",
            "name": "Hospital 4"
        },
        {
            "uniqueId": "HOSP5",
            "name": "Hospital 5"
        },
        {
            "uniqueId": "HOSP6",
            "name": "Hospital 6"
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