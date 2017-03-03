'use strict';

angular.module('utils').service('ServerUrlService', ServerUrlService);

ServerUrlService.$inject = [];

function ServerUrlService() {

    var _scheme = "https";
    var _serverAddress = "dev.careloop.org.uk";
   
//    var _serverAddress = "192.168.1.122:8080"; // cjd
//    var _serverAddress = "130.88.38.163:8080"; // Ed
   
    var _appName = "stroke-app";

    //cjd no appName required when running locally outside of Tomcat    
    var _urlPrefix = _scheme + "://" + _serverAddress + "/" + _appName;

    var service = {
        getUrlPrefix: getUrlPrefix,
     };

    return service;

    function getUrlPrefix() {
        return _urlPrefix;
    }
}