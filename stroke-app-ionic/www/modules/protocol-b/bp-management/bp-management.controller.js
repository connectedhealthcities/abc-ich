'use strict';

angular.module('app.protocolB').controller('BpManagementController', BpManagementController);

BpManagementController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'StateCacheService', 'DateTimeService', 'BpManagementControllerService', 'BpStateCacheService', 'GCS_THRESHOLD', 'DemoModeCacheService', 'STATE_BP_MANAGEMENT', 'STATE_CRITICAL_CARE_REFERRAL', 'STATE_PATIENT_END', 'BpNotificationService'];

function BpManagementController($scope, $state, $ionicPopup, PatientCacheService, StateCacheService, DateTimeService, BpManagementControllerService, BpStateCacheService, GCS_THRESHOLD, DemoModeCacheService, STATE_BP_MANAGEMENT, STATE_CRITICAL_CARE_REFERRAL, STATE_PATIENT_END, BpNotificationService) {
 
    var vm = this;

    function init() {
        // set current state
        StateCacheService.setCurrentState(STATE_BP_MANAGEMENT);

        // initialise vm parameters for header row
        vm.patientId = PatientCacheService.getUniqueId();
        vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

        // initialise vm parameters for page logic
        vm.gcsScore = PatientCacheService.getGcsScore();
        vm.treatmentThreshold = PatientCacheService.getBpTreatmentThreshold();
        vm.treatmentTarget = PatientCacheService.getBpTarget();

        // initialise vm parameters for page content 
        vm.entries = PatientCacheService.getBpMeasurementEntries();
        setTreatmentTargetAndThresholdCard();
        vm.targetAchievedText = BpManagementControllerService.getTargetAchievedText(vm.treatmentThreshold);

        // click handlers
        vm.onNext = onNext;
        vm.addEntry = addEntry;
        vm.onEntryNow = onEntryNow;
        vm.isAddEntryButtonEnabled = isAddEntryButtonEnabled;

        // Set up show/hide Range validation messages
        vm.showSbpOutOfRangeMessage = showSbpOutOfRangeMessage;
        vm.showDbpOutOfRangeMessage = showDbpOutOfRangeMessage;
        vm.showGtnRateOutOfRangeMessage = showGtnRateOutOfRangeMessage;
        vm.showLabetalolOutOfRangeMessage = showLabetalolOutOfRangeMessage;
        vm.showHeartRateOutOfRangeMessage = showHeartRateOutOfRangeMessage;

        // Popups
        vm.showGtnProtocolPopup = showGtnProtocolPopup;
        vm.showLabetalolProtocolPopup = showLabetalolProtocolPopup;
        
        clearEntryFields();
    }
    init();

    // Click handlers
    function onNext() {
        goNextState();
    }

    function addEntry() {
        showDataValidationPopup(handleDataValid);
    }

    function onEntryNow() {
        var now = DateTimeService.getNowWithZeroSeconds();
        vm.entryDate = now;
        vm.entryTime = now;       
    }

    function isAddEntryButtonEnabled() {
        return BpManagementControllerService.isAddEntryButtonEnabled(vm.entryDate, vm.entryTime, vm.entrySbp, vm.entryDbp, vm.entryGtn, vm.entryLabetalol, vm.entryHeartRate);
    }

    // Show/hide Range validation messages
    function showSbpOutOfRangeMessage() {
        return BpManagementControllerService.isSbpOutOfRange(vm.entrySbp);
    }

    function showDbpOutOfRangeMessage() {
        return BpManagementControllerService.isDbpOutOfRange(vm.entryDbp);
    }

    function showGtnRateOutOfRangeMessage() {
        return BpManagementControllerService.isGtnRateOutOfRange(vm.entryGtn);
    }

    function showLabetalolOutOfRangeMessage() {
        return BpManagementControllerService.isLabetalolOutOfRange(vm.entryLabetalol);
    }

    function showHeartRateOutOfRangeMessage() {
        return BpManagementControllerService.isHeartRateOutOfRange(vm.entryHeartRate);
    }

    // Popups
    function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-b/bp-management/bp-management-entry-data-validation-popup.html',
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

    function showRepeatBpReadingPopup() {
        var popupTemplate = {
            templateUrl: 'modules/protocol-b/bp-management/repeat-bp-reading-popup.html',
            title: 'Repeat after 2 minutes',
            cssClass: 'chi-wide-popup',
            scope: $scope
        };
        $ionicPopup.alert(popupTemplate);
    }

    function showBpTargetAchievedPopup() {
        var popupTemplate = {
            templateUrl: 'modules/protocol-b/bp-management/bp-target-achieved-popup.html',
            title: 'BP target achieved',
            cssClass: 'chi-wide-popup',
            scope: $scope
        };
        $ionicPopup.alert(popupTemplate);
    }

    function showGtnProtocolPopup() {
        var popupTemplate = {
            templateUrl: 'modules/protocol-b/bp-management/gtn-protocol-popup.html',
            title: 'GTN protocol',
            cssClass: 'chi-extra-wide-popup'
        };
        $ionicPopup.alert(popupTemplate);
    }

    function showLabetalolProtocolPopup() {
        var popupTemplate = {
            templateUrl: 'modules/protocol-b/bp-management/labetalol-protocol-popup.html',
            title: 'Labetalol protocol',
            cssClass: 'chi-extra-wide-popup'
        };
        $ionicPopup.alert(popupTemplate);
    }

    // Private functions
    function clearEntryFields() {
        vm.entryDate = null;
        vm.entryTime = null;
        vm.entrySbp = null;
        vm.entryDbp = null;
        vm.entryGtn = null;
        vm.entryLabetalol = null;
        vm.entryHeartRate = null;
    }

    function handleDataValid() {
        var entryDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.entryDate, vm.entryTime);
        var entry = BpManagementControllerService.getEntry(entryDateTime, vm.entrySbp, vm.entryDbp, vm.entryGtn, vm.entryLabetalol, vm.entryHeartRate);
        PatientCacheService.addBpMeasurementEntry(entry);
        vm.entries = PatientCacheService.getBpMeasurementEntries();
 
        var bpState = BpStateCacheService.getCurrentState();
        if (bpState === BpStateCacheService.STATE_START || bpState === BpStateCacheService.STATE_TARGET_ACHIEVED) { //Edd the or condition needs to be confirmed
            if (vm.entrySbp > vm.treatmentThreshold) {
                showRepeatBpReadingPopup();
                BpStateCacheService.setCurrentState(BpStateCacheService.STATE_ABOVE_THRESHOLD);
            }
        }
        else if (bpState === BpStateCacheService.STATE_ABOVE_THRESHOLD) {
            if (vm.entrySbp > vm.treatmentThreshold) {
                BpStateCacheService.setCurrentState(BpStateCacheService.STATE_ABOVE_THRESHOLD_CONFIRMED);
            }
            else {
                BpStateCacheService.setCurrentState(BpStateCacheService.STATE_START);
            }
        }
        else if (bpState === BpStateCacheService.STATE_ABOVE_THRESHOLD_CONFIRMED) {
            if (vm.entrySbp <= vm.treatmentTarget) {
                BpStateCacheService.setCurrentState(BpStateCacheService.STATE_TARGET_ACHIEVED);
                PatientCacheService.setBpTargetReachedDateTime(new Date());
                showBpTargetAchievedPopup();
            }
        }
 
        processBpMonitoring();
        clearEntryFields();
    }

    function processBpMonitoring(){
        var bpState = BpStateCacheService.getCurrentState();
        if(bpState === BpStateCacheService.STATE_ABOVE_THRESHOLD_CONFIRMED){
            BpNotificationService.beginBpMeasurementPrompts(onBpNotificationClick);
        } else if(bpState === BpStateCacheService.STATE_TARGET_ACHIEVED) {
            BpNotificationService.stopBpMeasurementPrompts();
        }
    }

    function onBpNotificationClick(){
        $state.go(STATE_BP_MANAGEMENT);
    }

    function goNextState() {
        var currentState = BpStateCacheService.getCurrentState();
        if (currentState === BpStateCacheService.STATE_TARGET_ACHIEVED || currentState === BpStateCacheService.STATE_START) {
            if (vm.gcsScore < GCS_THRESHOLD) {
                $state.go(STATE_PATIENT_END);
            }
            else {
                StateCacheService.goLatestStateTabC();
            }
        }
        else {
            $state.go(STATE_CRITICAL_CARE_REFERRAL);
        }
    }

    function setTreatmentTargetAndThresholdCard() {
        var onsetDateTime = PatientCacheService.getOnsetDateTime();
        var treatmentTargetAndThresholdCardModel;
        
        //calculate only if treatmentThreshold is not already set
        if (vm.treatmentThreshold === null) {
            treatmentTargetAndThresholdCardModel = BpManagementControllerService.getTreatmentTargetAndThreshold(onsetDateTime, new Date());
            vm.treatmentThreshold = treatmentTargetAndThresholdCardModel.treatmentThreshold;
            vm.treatmentTarget = treatmentTargetAndThresholdCardModel.treatmentTarget;
            PatientCacheService.setBpTreatmentThreshold(vm.treatmentThreshold);
            PatientCacheService.setBpTarget(vm.treatmentTarget);
        }

        vm.onsetTimeText = BpManagementControllerService.getOnsetTimeText(vm.treatmentThreshold);   
    }

}
