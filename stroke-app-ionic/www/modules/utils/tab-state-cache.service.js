'use strict';

angular.module('utils').service('TabStateCacheService', TabStateCacheService);

TabStateCacheService.$inject = [];

function TabStateCacheService() {

    var DEFAULT_STATE_TAB_A = 'tabs.anticoagulant-identification';
    var DEFAULT_STATE_TAB_B = 'tabs.bp-management';
    var DEFAULT_STATE_TAB_C = 'tabs.mrs-entry';
    
    var _stateTabA = DEFAULT_STATE_TAB_A;
    var _stateTabB = DEFAULT_STATE_TAB_B;
    var _stateTabC = DEFAULT_STATE_TAB_C;

    var service = {

        getStateTabA: getStateTabA,
        setStateTabA: setStateTabA,

        getStateTabB: getStateTabB,
        setStateTabB: setStateTabB,

        getStateTabC: getStateTabC,
        setStateTabC: setStateTabC,

        clearAll: clearAll
    };

    return service;

    function getStateTabA() {
        return _stateTabA;
    }

    function setStateTabA(stateTabA) {
        _stateTabA = stateTabA;
    }
    
    function getStateTabB() {
        return _stateTabB;
    }

    function setStateTabB(stateTabB) {
        _stateTabB = stateTabB;
    }

    function getStateTabC() {
        return _stateTabC;
    }

    function setStateTabC(stateTabC) {
        _stateTabC = stateTabC;
    }

    function clearAll() {
        _stateTabA = DEFAULT_STATE_TAB_A
        _stateTabB = DEFAULT_STATE_TAB_B
        _stateTabC = DEFAULT_STATE_TAB_C
    }
}