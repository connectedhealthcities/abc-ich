'use strict';

angular.module('app.protocolA').controller('AnticoagulantIdentificationController', AnticoagulantIdentificationController);

AnticoagulantIdentificationController.$inject = ['$scope', '$state', '$ionicPopup', 'AnticoagulantIdentificationControllerService', 'PatientCacheService', 'StateCacheService', 'DemoModeCacheService', 'GCS_THRESHOLD', 'STATE_ANTICOAGULANT_IDENTIFICATION', 'STATE_CALCULATE_BERIPLEX_DOSE', 'STATE_REVERSAL_AGENT_DETAILS', 'STATE_BP_MANAGEMENT'];

function AnticoagulantIdentificationController($scope, $state, $ionicPopup, AnticoagulantIdentificationControllerService, PatientCacheService, StateCacheService, DemoModeCacheService, GCS_THRESHOLD, STATE_ANTICOAGULANT_IDENTIFICATION, STATE_CALCULATE_BERIPLEX_DOSE, STATE_REVERSAL_AGENT_DETAILS, STATE_BP_MANAGEMENT) { 
 
    var vm = this;

    function init() {
        // set current state
        StateCacheService.setCurrentState(STATE_ANTICOAGULANT_IDENTIFICATION);

        // initialise vm parameters for header row
        vm.patientId = PatientCacheService.getUniqueId();
        vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

        // initialise vm parameters for page content       
        vm.anticoagulantType = PatientCacheService.getAnticoagulantType();
        vm.anticoagulantName = PatientCacheService.getAnticoagulantName();

        // Setup click handlers
        vm.onNext = onNext;
        vm.onViewDoacs = onViewDoacs;

        // Setup change handlers
        vm.anticoagulantTypeChanged = anticoagulantTypeChanged;

        // Setup enable/disable handlers
        vm.isNextButtonEnabled = isNextButtonEnabled;

        // Setup show/hide handlers
        vm.isShowVitkList = isShowVitkList;
        vm.isShowDoacList = isShowDoacList;

        // Setup slider
        var sliderConfig = AnticoagulantIdentificationControllerService.getSliderConfig();
        vm.sliderImages = sliderConfig.images;
        vm.sliderOptions = sliderConfig.options;
    }

    init();

    // Click handlers
    function onNext() {
        showDataValidationPopup(handleDataValid);
    }

    function onViewDoacs() {
        showDoacExamplesPopup();
    }

    // Change handlers
    function anticoagulantTypeChanged() {
        vm.anticoagulantName = null;
    }

    // Enable/disable handlers
    function isNextButtonEnabled() {
        return AnticoagulantIdentificationControllerService.isNextButtonEnabled(vm.anticoagulantType, vm.anticoagulantName);
    }

    // Show/hide handlers
    function isShowVitkList() {
        return AnticoagulantIdentificationControllerService.isShowVitkList(vm.anticoagulantType);
    }

    function isShowDoacList() {
        return AnticoagulantIdentificationControllerService.isShowDoacList(vm.anticoagulantType);
    }

    // Private functions
    function handleDataValid() {
        saveData();

        if (vm.anticoagulantType === "None") {
            goNextStateWhenNone();
        }
        else if (vm.anticoagulantType === "Unknown") {
            showAnticoagulantUnknownPopup(goNextStateWhenVitkOrUnknown);
        }
        else if (vm.anticoagulantType === "Vitamin K antagonist") {
            goNextStateWhenVitkOrUnknown();
        }
        else if (vm.anticoagulantType === "DOAC") {
            showAnticoagulantIsDoacPopup(goNextStateWhenDoac);
        }
     }

    function saveData() {
        PatientCacheService.setAnticoagulantType(vm.anticoagulantType);
        PatientCacheService.setAnticoagulantName(vm.anticoagulantName);
    }

    function goNextStateWhenVitkOrUnknown() {
        $state.go(STATE_CALCULATE_BERIPLEX_DOSE);
    }

    function goNextStateWhenDoac() {
        $state.go(STATE_REVERSAL_AGENT_DETAILS);
    }

    function goNextStateWhenNone() {
        if (PatientCacheService.getGcsScore() < GCS_THRESHOLD) {
            StateCacheService.goLatestStateTabC();
        }
        else {
            $state.go(STATE_BP_MANAGEMENT);
        }
    }

    // Popups
    function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/anticoagulant-identification/anticoagulant-identification-data-validation-popup.html',
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

    function showAnticoagulantUnknownPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/anticoagulant-identification/anticoagulant-unknown-popup.html',
            title: 'Anticoagulant unknown',
            cssClass: 'chi-wide-popup'
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(okHandler);
    }

    function showAnticoagulantIsDoacPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/anticoagulant-identification/anticoagulant-is-doac-popup.html',
            title: 'ICH on DOAC',
            cssClass: 'chi-wide-popup'
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(okHandler);
    }

    function showDoacExamplesPopup() {
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/anticoagulant-identification/view-doacs-popup.html',
            title: 'DOAC images',
            cssClass: 'chi-slider-popup',
            scope: $scope
        };
        $ionicPopup.alert(popupTemplate);
    }

}
