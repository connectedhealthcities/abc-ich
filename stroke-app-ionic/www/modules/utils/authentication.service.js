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

        return $http.post(urlPrefix + '/api/authenticate', credentials)
            .then(function(data) {
                var bearerToken = data.headers('Authorization');
                if (angular.isDefined(bearerToken) && bearerToken.slice(0, 7) === 'Bearer ') {
                    var jwt = bearerToken.slice(7, bearerToken.length);
                    _jwt = jwt;
                    return "success";
                }
                else {
                    return "failure";
                }
            }, function() {
                return "failure";
            });
    }

    function getJwt() {
        return _jwt;
    }
}