'use strict';

angular.module('utils').service('HospitalHttpService', HospitalHttpService);

HospitalHttpService.$inject = ['$timeout'];

function HospitalHttpService($timeout) {
    var _hospitals = [{ id : 1, name: "hspt1" }, { id: 2, name: "hspt2" }, {id: 3, name: "hspt3" }];
    var service = {
        getHospitals: getHospitals,
     };

    return service;

	function getHospitals() {
	    return _hospitals;
    }
}