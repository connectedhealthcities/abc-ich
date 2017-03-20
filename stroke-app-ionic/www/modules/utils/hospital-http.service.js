'use strict';

angular.module('utils').service('HospitalHttpService', HospitalHttpService);

HospitalHttpService.$inject = ['$http', 'ServerUrlService'];

function HospitalHttpService($http, ServerUrlService) {

     
    var _hospitals = [
        { "uniqueId": "Tameside", "name": "Tameside" },
        { "uniqueId": "Wythenshawe", "name": "Wythenshawe" },
        { "uniqueId": "Macclesfield", "name": "Macclesfield" },
        { "uniqueId": "Stockport", "name": "Stockport" },
        { "uniqueId": "Fairfield", "name": "Fairfield" },
        { "uniqueId": "Rochdale", "name": "Rochdale" },
        { "uniqueId": "NorthManchester", "name": "North Manchester" },
        { "uniqueId": "Oldham", "name": "Oldham" },
        { "uniqueId": "Bolton", "name": "Bolton" },
        { "uniqueId": "Wigan", "name": "Wigan" },
        { "uniqueId": "Trafford", "name": "Trafford" },
        { "uniqueId": "ManchesterRoyal", "name": "Manchester Royal" },
        { "uniqueId": "Salford", "name": "Salford" }
    ];

    var service = {
        getHospitals: getHospitals
    };

    return service;

	function getHospitals() {
            
        var urlPrefix = ServerUrlService.getUrlPrefix();
        return $http.get(urlPrefix + '/api/external-hospitals').then(
            function(response) {
                // server returns all hospitals except the current hospital
                return response.data;
            },
            function(response) {
                // return full list of hospitals if comms fails
                return _hospitals;
            });
    }
}