'use strict';

angular.module('utils').service('StateCacheService', StateCacheService);

StateCacheService.$inject = ['$state', 'LocalStorageService', 'PatientCacheService', 'STATE_PATIENT_START', 'STATE_ADMINISTER_BERIPLEX', 'STATE_ANTICOAGULANT_IDENTIFICATION', 'STATE_CALCULATE_BERIPLEX_DOSE', 'STATE_CONFIRM_BERIPLEX_DOSE', 'STATE_REVERSAL_AGENT_DETAILS', 'STATE_MRS_ENTRY', 'STATE_NEUROSURGERY_REFERRAL_CRITERIA', 'STATE_NEUROSURGERY_REFERRAL_SUMMARY'];

function StateCacheService($state, LocalStorageService, PatientCacheService, STATE_PATIENT_START, STATE_ADMINISTER_BERIPLEX, STATE_ANTICOAGULANT_IDENTIFICATION, STATE_CALCULATE_BERIPLEX_DOSE, STATE_CONFIRM_BERIPLEX_DOSE, STATE_REVERSAL_AGENT_DETAILS, STATE_MRS_ENTRY, STATE_NEUROSURGERY_REFERRAL_CRITERIA, STATE_NEUROSURGERY_REFERRAL_SUMMARY) {

    var DEFAULT_STATE_TAB_A = STATE_ANTICOAGULANT_IDENTIFICATION;
    var DEFAULT_STATE_TAB_C = STATE_MRS_ENTRY;
    var DEFAULT_CURRENT_STATE = STATE_PATIENT_START;
    
    var state_tab_a_key = "state-tab-a";
    var state_tab_c_key = "state-tab-c";
    var current_state_key = "state-current";

    var service = {

        setCurrentState: setCurrentState,

        goLatestStateTabA: goLatestStateTabA,
        goLatestStateTabC: goLatestStateTabC,

        goCurrentState: goCurrentState,

        clearAll: clearAll
    };

    return service;

    function setCurrentState(state) {
        LocalStorageService.setItem(current_state_key, state);
        if (state === STATE_ADMINISTER_BERIPLEX ||
            state === STATE_ANTICOAGULANT_IDENTIFICATION ||
            state === STATE_CALCULATE_BERIPLEX_DOSE ||
            state === STATE_CONFIRM_BERIPLEX_DOSE ||
            state === STATE_REVERSAL_AGENT_DETAILS) {
            setStateTabA(state);
        }
        else if (state === STATE_MRS_ENTRY ||
                 state === STATE_NEUROSURGERY_REFERRAL_CRITERIA ||
                 state === STATE_NEUROSURGERY_REFERRAL_SUMMARY ) {
            setStateTabC(state);
        }
    }

    function goLatestStateTabA() {
        $state.go(getStateTabA());
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
        LocalStorageService.setItem(state_tab_c_key, null);
        LocalStorageService.setItem(current_state_key, null);
    }

    function getStateTabA() {
        var stateTabA = LocalStorageService.getItem(state_tab_a_key);
        if (stateTabA === null) {
            return DEFAULT_STATE_TAB_A;
        }
        else {
            return stateTabA;
        }
    }
    
    function getStateTabC() {
        var stateTabC = LocalStorageService.getItem(state_tab_c_key);
        if (stateTabC === null) {
            return DEFAULT_STATE_TAB_C;
        }
        else {
            return stateTabC;
        }
    }

    function setStateTabA(state) {
        LocalStorageService.setItem(state_tab_a_key, state);
    }

    function setStateTabC(state) {
        LocalStorageService.setItem(state_tab_c_key, state);
    }
}