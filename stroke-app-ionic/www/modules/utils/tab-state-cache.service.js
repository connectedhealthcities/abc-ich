'use strict';

angular.module('utils').service('TabStateCacheService', TabStateCacheService);

TabStateCacheService.$inject = ['$state', 'LocalStorageService'];

function TabStateCacheService($state, LocalStorageService) {

    var DEFAULT_STATE_TAB_A = 'tabs.anticoagulant-identification';
    var DEFAULT_STATE_TAB_B = 'tabs.bp-management';
    var DEFAULT_STATE_TAB_C = 'tabs.mrs-entry';
    var DEFAULT_CURRENT_STATE = 'patient-start';
    
    var state_tab_a_key = "tabs-state-tab-a";
    var state_tab_b_key = "tabs-state-tab-b";
    var state_tab_c_key = "tabs-state-tab-c";
    var current_state_key = "current-state";

    var service = {

        setCurrentState: setCurrentState,

        goLatestStateTabA: goLatestStateTabA,
        goLatestStateTabB: goLatestStateTabB,
        goLatestStateTabC: goLatestStateTabC,

        goCurrentState: goCurrentState,

        clearAll: clearAll
    };

    return service;

    function setCurrentState(state) {
        LocalStorageService.setItem(current_state_key, state);
        if (state === "tabs.administer-beriplex" ||
            state === "tabs.anticoagulant-identification" ||
            state === "tabs.calculate-beriplex-dose" ||
            state === "tabs.confirm-beriplex-dose" ||
            state === "tabs.doac-reversal-agent-details") {
            setStateTabA(state);
        }
        else if (state === "tabs.bp-management" ||
                 state === "tabs.critical-care-referral" ) {
            setStateTabB(state);
        }
        else if (state === "tabs.mrs-entry" ||
                 state === "tabs.neurosurgery-referral-criteria" ||
                 state === "tabs.neurosurgery-referral-summary" ) {
            setStateTabC(state);
        }
    }

    function goLatestStateTabA() {
        $state.go(getStateTabA());
    }

    function goLatestStateTabB() {
        $state.go(getStateTabB());
    }

    function goLatestStateTabC() {
        $state.go(getStateTabC());
    }

    function goCurrentState() {
        var currentState = LocalStorageService.getItem(current_state_key);
        if (currentState == null) {
            currentState = DEFAULT_CURRENT_STATE;
        }
        $state.go(currentState);
    }

    function clearAll() {
        LocalStorageService.setItem(state_tab_a_key, null);
        LocalStorageService.setItem(state_tab_b_key, null);
        LocalStorageService.setItem(state_tab_c_key, null);
        LocalStorageService.setItem(current_state_key, null);
    }

    function getStateTabA() {
        var stateTabA = LocalStorageService.getItem(state_tab_a_key);
        if (stateTabA == null) {
            return DEFAULT_STATE_TAB_A;
        }
        else {
            return stateTabA;
        }
    }
    
    function getStateTabB() {
        var stateTabB = LocalStorageService.getItem(state_tab_b_key);
        if (stateTabB == null) {
            return DEFAULT_STATE_TAB_B;
        }
        else {
            return stateTabB;
        }
    }

    function getStateTabC() {
        var stateTabC = LocalStorageService.getItem(state_tab_c_key);
        if (stateTabC == null) {
            return DEFAULT_STATE_TAB_C;
        }
        else {
            return stateTabC;
        }
    }

    function setStateTabA(state) {
        LocalStorageService.setItem(state_tab_a_key, state);
    }

    function setStateTabB(state) {
        LocalStorageService.setItem(state_tab_b_key, state);
    }

    function setStateTabC(state) {
        LocalStorageService.setItem(state_tab_c_key, state);
    }
}