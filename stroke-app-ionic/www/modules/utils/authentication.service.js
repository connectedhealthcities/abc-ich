'use strict';

angular.module('utils').service('AuthenticationService', AuthenticationService);

AuthenticationService.$inject = ['$http', 'ServerUrlService', 'UserCredentialsCacheService'];

function AuthenticationService($http, ServerUrlService, UserCredentialsCacheService) {

    var service = {
        authenticate: authenticate,
        testAuthentication: testAuthentication,
        getJwt: getJwt
     };

    return service;

    var _jwt = null;

	function authenticate() {
        var username = UserCredentialsCacheService.getUsername();      	
        var password = UserCredentialsCacheService.getPassword();      	
        var credentials = { "username": username, "password": password, "rememberMe": false };
        return authenticateImpl(credentials);
    }

    function testAuthentication(username, password) {
        var credentials = { "username": username, "password": password, "rememberMe": false };
        return authenticateImpl(credentials);
    }

    function authenticateImpl(credentials) {

        var urlPrefix = ServerUrlService.getUrlPrefix();

        var url = urlPrefix + '/api/authenticate';

        return $http.post(url, credentials)
            .then(function(response) {
                var jwt = response.data.id_token;
                _jwt = jwt;
                return true;
            }, function(response) {
                return false;
            });
    }

    function getJwt() {
        return _jwt;
    }
}