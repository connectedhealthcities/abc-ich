'use strict';

angular.module('app.protocolB').controller('BpManagementController', BpManagementController);

BpManagementController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'DateTimeService', 'BpManagementControllerService', 'BpStateCacheService', 'GCS_THRESHOLD'];

function BpManagementController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, DateTimeService, BpManagementControllerService, BpStateCacheService, GCS_THRESHOLD) {
 
    var vm = this; // S10

    TabStateCacheService.setCurrentState('tabs.bp-management');
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = PatientCacheService.getIsDemoMode();

    if (PatientCacheService.getBpTreatmentThreshold() === null) {

        var SIX_HOURS_IN_MILLISECONDS = 6 * 60 * 60 * 1000;
        var onsetMs = PatientCacheService.getOnsetDateTime().getTime();
        var nowMs = new Date().getTime();
        var diffMs = nowMs - onsetMs;
        if ( diffMs > SIX_HOURS_IN_MILLISECONDS) { //cjd >= or >?
            vm.treatmentThreshold = 200;
            vm.treatmentTarget = 180;
        }
        else {
            vm.treatmentThreshold = 150;
            vm.treatmentTarget = 140;
        }

        PatientCacheService.setBpTreatmentThreshold(vm.treatmentThreshold);
        PatientCacheService.setBpTarget(vm.treatmentTarget);
    }
    else {
        vm.treatmentThreshold = PatientCacheService.getBpTreatmentThreshold();
        vm.treatmentTarget = PatientCacheService.getBpTarget();
    }

    vm.onsetTimeText = vm.treatmentThreshold === 200 ? "greater than" : "less than";
    vm.targetAchievedText = vm.treatmentThreshold === 200 ? "130 to 180 mmHg" : "130 to 140 mmHg";

    vm.entryDate = null;
    vm.entryTime = null;
    vm.entrySbp = null;
    vm.entryGtn = null;
    vm.entryLabetalol = null;

    vm.entries = PatientCacheService.getBpMeasurementEntries();
    

    vm.onNext = onNext;
    vm.addEntry = addEntry;
    vm.isAddEntryButtonEnabled = isAddEntryButtonEnabled;
    vm.onEntryNow = onEntryNow;
    vm.showGtnProtocolPopup = showGtnProtocolPopup;
    vm.showLabetalolProtocolPopup = showLabetalolProtocolPopup;

    function onNext() {
        goNextState();
    }

    function goNextState() {
        if (BpStateCacheService.getCurrentState() === BpStateCacheService.STATE_TARGET_ACHIEVED) {
            if (PatientCacheService.getGcsScore() < GCS_THRESHOLD) {
                $state.go('patient-end');
            }
            else {
                TabStateCacheService.goLatestStateTabC();
            }
        }
        else {
            $state.go('tabs.critical-care-referral');
        }
    }

    function addEntry() {
        showDataValidationPopup(handleDataValid);
    }

    function handleDataValid() {
        var entry = BpManagementControllerService.getEntry(vm.entryDate, vm.entryTime, vm.entrySbp, vm.entryGtn, vm.entryLabetalol);
        PatientCacheService.addBpMeasurementEntry(entry);
        vm.entries = PatientCacheService.getBpMeasurementEntries();
 
        var bpState = BpStateCacheService.getCurrentState();
        if (bpState === BpStateCacheService.STATE_START) {
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
            if (vm.entrySbp < vm.treatmentTarget) {
                BpStateCacheService.setCurrentState(BpStateCacheService.STATE_TARGET_ACHIEVED);
                PatientCacheService.setBpTargetReachedDateTime(new Date());
                showBpTargetAchievedPopup(goNextState);
            }
        }
 
       clearEntryFields();
    }

    function isAddEntryButtonEnabled() {
        return BpManagementControllerService.isAddEntryButtonEnabled(vm.entryDate, vm.entryTime, vm.entrySbp);
    }

    function clearEntryFields() {
        vm.entryDate = null;
        vm.entryTime = null;
        vm.entrySbp = null;
        vm.entryGtn = null;
        vm.entryLabetalol = null;
    }

    function onEntryNow() {
        var now = DateTimeService.getNowWithZeroSeconds();
        vm.entryDate = now;
        vm.entryTime = now;       
    }

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

    function showBpTargetAchievedPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-b/bp-management/bp-target-achieved-popup.html',
            title: 'SBP target achieved',
            cssClass: 'chi-wide-popup',
            scope: $scope
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(okHandler);
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

}
