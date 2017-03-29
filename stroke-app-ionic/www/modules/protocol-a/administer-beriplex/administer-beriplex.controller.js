'use strict';

angular.module('app.protocolA').controller('AdministerBeriplexController', AdministerBeriplexController);

AdministerBeriplexController.$inject = ['$window', '$scope', '$state', '$ionicPopup', 'AdministerBeriplexControllerService', 'PatientCacheService', 'StateCacheService', 'DateTimeService', 'DemoModeCacheService', 'GCS_THRESHOLD', 'STATE_ADMINISTER_BERIPLEX', 'STATE_BP_MANAGEMENT'];

function AdministerBeriplexController($window, $scope, $state, $ionicPopup, AdministerBeriplexControllerService, PatientCacheService, StateCacheService, DateTimeService, DemoModeCacheService, GCS_THRESHOLD, STATE_ADMINISTER_BERIPLEX, STATE_BP_MANAGEMENT) {

    var vm = this;

    function init() {
        // set current state
        StateCacheService.setCurrentState(STATE_ADMINISTER_BERIPLEX);
 
        // initialise vm parameters for header row
        vm.patientId = PatientCacheService.getUniqueId();
        vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

        // initialise vm parameters for page logic
        vm.gcsScore = PatientCacheService.getGcsScore();

        // initialise vm parameters for page content
        var calculatedBeriplexDose = PatientCacheService.getCalculatedBeriplexDose();
        var actualBeriplexDose = PatientCacheService.getActualBeriplexDose();
        vm.beriplexDose = actualBeriplexDose !== null ? actualBeriplexDose : calculatedBeriplexDose;
        vm.isBeriplexAdministered = null;
        var reversalAgentType = PatientCacheService.getReversalAgentType();
        if (reversalAgentType != null) {
            if (reversalAgentType === "PCC") {
                vm.isBeriplexAdministered = true;
            }
            else {
                vm.isBeriplexAdministered = false;
            }
        }
        var beriplexDateTime = PatientCacheService.getReversalAgentStartDateTime();
        vm.beriplexDate = beriplexDateTime;
        vm.beriplexTime = beriplexDateTime;
        vm.isVitkAdministered = PatientCacheService.getIsVitaminkAdministered();
        var vitkDateTime = PatientCacheService.getVitaminkDateTime();
        vm.vitkDate = vitkDateTime;
        vm.vitkTime = vitkDateTime;
        vm.isInfusionInstructionsViewed = PatientCacheService.getIsInfusionInstructionsViewed();

        // Setup click handlers
        vm.onNext = onNext;
        vm.onBeriplexNow = onBeriplexNow;
        vm.onVitkNow = onVitkNow;

        // Setup change handlers
        vm.isBeriplexAdministeredChanged = isBeriplexAdministeredChanged;
        vm.isVitkAdministeredChanged = isVitkAdministeredChanged;
 
        // Setup enable/disable handlers
        vm.isNextButtonEnabled = isNextButtonEnabled;

        // Setup show/hide handlers
        vm.showBeriplexDateTimeCard = showBeriplexDateTimeCard;
        vm.showVitaminkDateTimeCard = showVitaminkDateTimeCard;

        // Setup 'View Infusion Instructions' handler 
        vm.onViewInfusionInstructions = onViewInfusionInstructions;        
    }

    init();

    // Click handlers   
    function onNext() {
        showDataValidationPopup(handleDataValid);
    }

    function onBeriplexNow() {
        var now = DateTimeService.getNowWithZeroSeconds();
        vm.beriplexDate = now;
        vm.beriplexTime = now;
    }

    function onVitkNow() {
        var now = DateTimeService.getNowWithZeroSeconds();
        vm.vitkDate = now;
        vm.vitkTime = now;
    }

    // Change handlers
    function isBeriplexAdministeredChanged() {
        vm.beriplexDate = null;
        vm.beriplexTime = null;
    }

    function isVitkAdministeredChanged() {
        vm.vitkDate = null;
        vm.vitkTime = null;
    }

    // Enable/disable handlers
    function isNextButtonEnabled() {
        return AdministerBeriplexControllerService.isNextButtonEnabled(vm.isBeriplexAdministered, vm.isVitkAdministered, vm.beriplexDate, vm.beriplexTime, vm.vitkDate, vm.vitkTime);
    }

    // Show/hide handlers
    function showBeriplexDateTimeCard() {
        return AdministerBeriplexControllerService.showBeriplexDateTimeCard(vm.isBeriplexAdministered);       
    }

    function showVitaminkDateTimeCard() {
       return AdministerBeriplexControllerService.showVitaminkDateTimeCard(vm.isVitkAdministered);       
    }

    // 'View Infusion Instructions' handler 
    function onViewInfusionInstructions() {
        vm.isInfusionInstructionsViewed = true;
 
        var mix2vialApp = startApp.set( {"package": "com.hansonzandi.mix2vial"} );

        mix2vialApp.start(
            function() {
                // success - Do nothing
            },
            function(error) {
                // fail, app is not installed
                // take user to the install page on Play Store
                $window.open("market://details?id=com.hansonzandi.mix2vial");
            }
        );
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
        var reversalAgentType = vm.isBeriplexAdministered ? "PCC" : "None";
        PatientCacheService.setReversalAgentType(reversalAgentType);
        var beriplexDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.beriplexDate, vm.beriplexTime);
        PatientCacheService.setReversalAgentStartDateTime(beriplexDateTime);

        PatientCacheService.setIsVitaminkAdministered(vm.isVitkAdministered);
        var vitkDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.vitkDate, vm.vitkTime);
        PatientCacheService.setVitaminkDateTime(vitkDateTime);

        PatientCacheService.setIsInfusionInstructionsViewed(vm.isInfusionInstructionsViewed);
    }

    // Popups
    function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/administer-beriplex/administer-beriplex-data-validation-popup.html',
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

 