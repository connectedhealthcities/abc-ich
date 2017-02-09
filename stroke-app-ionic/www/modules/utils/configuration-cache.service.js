'use strict';

angular.module('utils').service('ConfigurationCacheService', ConfigurationCacheService);

ConfigurationCacheService.$inject = [];

function ConfigurationCacheService() {

    var _hospitals = null;
    var _selectedHospital = null;
    var _email = null;

    var service = {

        getHospitals: getHospitals,
        setHospitals: setHospitals,

        getSelectedHospital: getSelectedHospital,
        setSelectedHospital: setSelectedHospital,

        getEmail: getEmail,
        setEmail: setEmail,

        clearAll: clearAll
    };
    
    return service;

    function getHospitals() {
        //cjd return _hospitals;
        return [
          {
              id: 1,
              name: "Hospital 1"
          }, {
              id: 2,
              name: "Hospital 2"
          }, {
              id: 3,
              name: "Hospital 3"
          }, {
              id: 4,
              name: "Hospital 4"
          }
        ];
    }

    function setHospitals(hospitals) {
        _hospitals = hospitals;
    }

    function getSelectedHospital() {
        return _selectedHospital;
    }

    function setSelectedHospital(selectedHospital) {
        _selectedHospital = selectedHospital;
    }

    function getEmail() {
        return _email;
    }

    function setEmail(email) {
        _email = email;
    }

    function clearAll() {
        _hospitals = null;
        _selectedHospital = null;
        _email = null;
    }
}
