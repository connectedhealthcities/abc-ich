'use strict';

angular.module('app.protocolA').controller('ReversalAgentDetailsController', ReversalAgentDetailsController);

ReversalAgentDetailsController.$inject = ['$scope', '$state', '$ionicPopup', 'ReversalAgentDetailsControllerService', 'PatientCacheService', 'StateCacheService', 'DemoModeCacheService', 'DateTimeService', 'GCS_THRESHOLD', 'STATE_REVERSAL_AGENT_DETAILS', 'STATE_BP_MANAGEMENT'];

function ReversalAgentDetailsController($scope, $state, $ionicPopup, ReversalAgentDetailsControllerService, PatientCacheService, StateCacheService, DemoModeCacheService, DateTimeService, GCS_THRESHOLD, STATE_REVERSAL_AGENT_DETAILS, STATE_BP_MANAGEMENT) {

    var vm = this;

    function init() {
        // set current state
        StateCacheService.setCurrentState(STATE_REVERSAL_AGENT_DETAILS);

        // initialise vm parameters for header row
        vm.patientId = PatientCacheService.getUniqueId();
        vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

        // initialise vm parameters for page logic
        vm.reversalAgentAdministeredAtExternalHospital = PatientCacheService.getReversalAgentAdministeredAtExternalHospital();
        vm.gcsScore = PatientCacheService.getGcsScore();

        // initialise vm parameters for page content
        vm.reversalAgent = PatientCacheService.getReversalAgentType();
        vm.reversalAgentAdministeredTimeKnown = PatientCacheService.getReversalAgentAdministeredTimeKnown();
        var reversalDateTime = PatientCacheService.getReversalAgentStartDateTime();
        vm.reversalDate = reversalDateTime;
        vm.reversalTime = reversalDateTime;
        vm.anticoagulantName = PatientCacheService.getAnticoagulantName();

        // Setup click handlers
        vm.onNext = onNext;
        vm.onReversalNow = onReversalNow;

        // Setup change handlers
        vm.onReversalAgentChanged = onReversalAgentChanged;
        vm.onReversalAgentAdministeredTimeKnownChanged = onReversalAgentAdministeredTimeKnownChanged;
 
        // Setup enable/disable handlers
        vm.isNextButtonEnabled = isNextButtonEnabled;
 
        // Setup show/hide handlers
        vm.showIsReversalTimeKnownCard = showIsReversalTimeKnownCard;
        vm.showReversalTimeCard = showReversalTimeCard;
        vm.hideReversalAgentOptionNone = hideReversalAgentOptionNone;
        vm.hideReversalAgentOptionIdarucizumab = hideReversalAgentOptionIdarucizumab;
        vm.hideReversalAgentOptionPCC = hideReversalAgentOptionPCC;
    }

    init();

    // Click handlers
    function onNext() {
        showDataValidationPopup(handleDataValid); 
    }

    function onReversalNow() {
        var now = DateTimeService.getNowWithZeroSeconds();
        vm.reversalDate = now;
        vm.reversalTime = now;
    }

    // Change handlers
    function onReversalAgentChanged() {
         vm.reversalAgentAdministeredTimeKnown = null;
         vm.reversalDate = null;
         vm.reversalTime = null;
    }

    function onReversalAgentAdministeredTimeKnownChanged() {
        vm.reversalDate  = null;
        vm.reversalTime  = null;
    }

    // Enable/disable handlers
    function isNextButtonEnabled() {
        return ReversalAgentDetailsControllerService.isNextButtonEnabled(
            vm.reversalAgent,
            vm.reversalAgentAdministeredAtExternalHospital,
            vm.reversalAgentAdministeredTimeKnown, 
            vm.reversalDate,
            vm.reversalTime
        );
    }

    // Show/hide handlers
    function showIsReversalTimeKnownCard() {
        return ReversalAgentDetailsControllerService.showIsReversalTimeKnownCard(vm.reversalAgentAdministeredAtExternalHospital);
    }

    function showReversalTimeCard() {
        return ReversalAgentDetailsControllerService.showReversalTimeCard(vm.reversalAgentAdministeredAtExternalHospital, vm.reversalAgentAdministeredTimeKnown, vm.reversalAgent);
    }

    function hideReversalAgentOptionNone() {
        return ReversalAgentDetailsControllerService.hideReversalAgentOptionNone(vm.reversalAgentAdministeredAtExternalHospital);
    }

    function hideReversalAgentOptionIdarucizumab(){
        return ReversalAgentDetailsControllerService.hideReversalAgentOptionIdarucizumab(vm.anticoagulantName);
    }

    function hideReversalAgentOptionPCC(){
        return ReversalAgentDetailsControllerService.hideReversalAgentOptionPCC(vm.anticoagulantName);
    }

    // Private functions
    function handleDataValid() {
        saveData();

        if (vm.gcsScore < GCS_THRESHOLD) {
            StateCacheService.goLatestStateTabC();
        }
        else {
            $state.go(STATE_BP_MANAGEMENT);
        }
     }

    function saveData() {
        PatientCacheService.setReversalAgentType(vm.reversalAgent);
        PatientCacheService.setReversalAgentAdministeredTimeKnown(vm.reversalAgentAdministeredTimeKnown);
        var reversalDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.reversalDate, vm.reversalTime);
        PatientCacheService.setReversalAgentStartDateTime(reversalDateTime);
     }

    // Popups
    function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/reversal-agent-details/reversal-agent-details-data-validation-popup.html',
            title: 'Data validation',
            subTitle: 'Please confirm data entered is correct',
            cssClass: 'chi-wide-popup',
            scope: $scope
        };       
        var popup = $ionicPopup.confirm(popupTemplate);

        popup.then(function(res) {
            if (res) {
                okHandler();
            }
        });
    }
}
