'use strict';

angular.module('utils').service('ServerUrlService', ServerUrlService);

ServerUrlService.$inject = [];

function ServerUrlService() {

    var _scheme = "https";   
    var _appName = "abc-ich";

    var service = {
        getScheme: getScheme,
        setScheme: setScheme,
        getAppName: getAppName,
        setAppName: setAppName,
        getUrlPrefix: getUrlPrefix
    };

    return service;

    function getScheme(){
        return _scheme;
    };

    function setScheme(scheme){
        _scheme = scheme;
    };

    function getAppName(){
        return _appName;
    };

    function setAppName(appName){
        _appName = appName;
    };

    function getUrlPrefix(serverAddress) {
        var urlPrefix = "";
        if(_scheme === "https"){
            urlPrefix = _scheme + "://" + serverAddress + "/" + _appName;
        } else {
            urlPrefix = _scheme + "://" + serverAddress;
        }

        return urlPrefix;
    };
}