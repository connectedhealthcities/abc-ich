'use strict';

angular.module('utils').service('AppConfigurationCacheService', AppConfigurationCacheService);

AppConfigurationCacheService.$inject = ['HospitalHttpService'];

function AppConfigurationCacheService(HospitalHttpService) {

    var _selectedHospital = null;
    var _email = null;
    var _username = null;
    var _password = null;

    var service = {

        getSelectedHospital: getSelectedHospital,
        setSelectedHospital: setSelectedHospital,

        getEmail: getEmail,
        setEmail: setEmail,
        
        getUserName: getUsername,
        setUserName: setUsername,

        setPassword: setPassword,
        getPassword: getPassword
    };
    
    return service;


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

    function setUsername(username) {
        _username = username;
    }
    function getUsername() {
        return _username;
    }

    function setPassword(password){
        _password = password;
    }
    function getPassword() {
        return _password;
    }
}
