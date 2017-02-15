'use strict';

angular.module('utils').service('ServerUrlService', ServerUrlService);

ServerUrlService.$inject = [];

function ServerUrlService() {

    var _scheme = "http";
    var _serverAddress = "192.168.1.122:8080";
    var _appName = "stroke-app-0.0.1-SNAPSHOT";
    
    var _urlPrefix = _scheme + "://" + _serverAddress + "/" + _appName;

    var service = {
        getUrlPrefix: getUrlPrefix,
     };

    return service;

    function getUrlPrefix() {
        return _urlPrefix;
    }
}