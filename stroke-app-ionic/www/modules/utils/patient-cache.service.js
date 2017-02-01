'use strict';

angular.module('utils').service('PatientCacheService', PatientCacheService);

PatientCacheService.$inject = [];

function PatientCacheService() {

    var service = {
        getAnticogulantType: getAnticogulantType,
        getGcsScore: getGcsScore,
        getInrValue: getInrValue,
        getBpTargetReachedDateTime : getBpTargetReachedDateTime,
        getIchVolume: getIchVolume,
        getPosteriorFossaIch: getPosteriorFossaIch,
        getVentricleObstructed: getVentricleObstructed
    };

    return service;

    function getAnticogulantType() {
        return "VITK";
    }

    function getGcsScore() {
        return 9;
    }

    function getInrValue() {
        return 1.2;
    }

    function getBpTargetReachedDateTime() {
        return "NOT NULL";
    }

    function getIchVolume() {
        return 31;
    }

    function getPosteriorFossaIch() {
        return false;
    }

    function getVentricleObstructed() {
        return false;
    }
}