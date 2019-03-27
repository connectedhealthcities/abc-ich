'use strict';

angular.module('app.protocolC').controller('NeurosurgeryReferralCriteriaController', NeurosurgeryReferralCriteriaController);

NeurosurgeryReferralCriteriaController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'StateCacheService', 'MRS_THRESHOLD', 'GCS_THRESHOLD', 'ICH_VOLUME_THRESHOLD', 'DemoModeCacheService', 'STATE_NEUROSURGERY_REFERRAL_CRITERIA', 'STATE_NEUROSURGERY_REFERRAL_SUMMARY', 'STATE_PATIENT_END', 'NeurosurgeryReferralCriteriaControllerService'];

function NeurosurgeryReferralCriteriaController($scope, $state, $ionicPopup, PatientCacheService, StateCacheService, MRS_THRESHOLD, GCS_THRESHOLD, ICH_VOLUME_THRESHOLD, DemoModeCacheService, STATE_NEUROSURGERY_REFERRAL_CRITERIA, STATE_NEUROSURGERY_REFERRAL_SUMMARY, STATE_PATIENT_END, NeurosurgeryReferralCriteriaControllerService) {

    var vm = this;

    function init() {
        // set current state
        StateCacheService.setCurrentState(STATE_NEUROSURGERY_REFERRAL_CRITERIA);

        // initialise vm parameters for header row
        vm.patientId = PatientCacheService.getUniqueId();
        vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

        // initialise vm parameters for page content   
        vm.isPosteriorFossaIch = PatientCacheService.getIsPosteriorFossaIch();
        vm.isObstruction = PatientCacheService.getIsVentricleObstructed();
        vm.longestAxis = null;
        vm.perpendicularAxis = null;
        vm.numSlices = null;
        vm.sliceThickness = null;
        vm.ichVolume = null;
        vm.entries = PatientCacheService.getIchEntries();

        // initialise vm parameters for page logic 
        vm.gcsScore = PatientCacheService.getGcsScore();
        vm.premorbidMrsScore = PatientCacheService.getPremorbidMrsScore();

        // Set up slider
        var sliderConfig = NeurosurgeryReferralCriteriaControllerService.getSliderConfig();
        vm.sliderImages = sliderConfig.images;
        vm.sliderOptions = sliderConfig.options;

        // Setup click handlers
        vm.onNext = onNext;
        vm.onAddEntry = onAddEntry;

        // Setup change handlers
        vm.onVolumeFieldChanged = onVolumeFieldChanged;

        // Set up enable/disable handlers
        vm.isNextButtonEnabled = isNextButtonEnabled;
        vm.isAddEntryButtonEnabled = isAddEntryButtonEnabled;

        // Set up show/hide handlers
        vm.showIchVolumeField = showIchVolumeField;

        // Set up show/hide Range validation messages
        vm.showIchVolumeOutOfRangeMessage = showIchVolumeOutOfRangeMessage;

        // popups
        vm.showVolumeMeasurementPopup = showVolumeMeasurementPopup;
        vm.showObstructionPopup = showObstructionPopup;
       
    }
    init();

    // Click handlers
    function onNext() {
       showDataValidationPopup(handleDataValid);
    }

    function onAddEntry(){
        showEntryDataValidationPopup(saveEntryData);
    }

    // Change handlers
    function onVolumeFieldChanged() {
        vm.ichVolume = NeurosurgeryReferralCriteriaControllerService.calculateVolume(vm.longestAxis, vm.perpendicularAxis, vm.numSlices, vm.sliceThickness);
    }

    // Enable/disable handlers
    function isNextButtonEnabled() {
        return NeurosurgeryReferralCriteriaControllerService.isNextButtonEnabled(vm.entries, vm.isPosteriorFossaIch, vm.isObstruction);
    }

    function isAddEntryButtonEnabled(){
        return NeurosurgeryReferralCriteriaControllerService.isAddEntryButtonEnabled(vm.ichVolume);
    }

    // Set up show/hide handlers
    function showIchVolumeField() {
        return NeurosurgeryReferralCriteriaControllerService.showIchVolumeField(vm.ichVolume);
    }
    
    // Show/hide Range validation messages
    function showIchVolumeOutOfRangeMessage() {
        return !NeurosurgeryReferralCriteriaControllerService.isIchVolumeWithinRange(vm.ichVolume);
    }

    // Popups
    function showVolumeMeasurementPopup() {
        var popupTemplate = {
            templateUrl: 'modules/protocol-c/neurosurgery-referral-criteria/volume-measurement-popup.html',
            title: 'ABC/2 Volume measurement',
            cssClass: 'chi-wide-popup',
            scope: $scope
        };
        $ionicPopup.alert(popupTemplate);
    }

    function showObstructionPopup() {
        var popupTemplate = {
            templateUrl: 'modules/protocol-c/neurosurgery-referral-criteria/obstruction-popup.html',
            title: 'Occlusion images',
            cssClass: 'chi-slider-popup',
            scope: $scope
        };
        $ionicPopup.alert(popupTemplate);
    }

    function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-c/neurosurgery-referral-criteria/neurosurgery-referral-criteria-data-validation-popup.html',
            title: 'Data validation',
            subTitle: 'Please confirm data entered is correct',
            cssClass: 'chi-wide-popup',
            scope: $scope
        };
        var popup = $ionicPopup.confirm(popupTemplate);

        popup.then(function (res) {
            if (res) {
                okHandler();
            }
        });
    }

    function showEntryDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-c/neurosurgery-referral-criteria/neurosurgery-referral-criteria-entry-data-validation-popup.html',
            title: 'Data validation',
            subTitle: 'Please confirm data entered is correct',
            cssClass: 'chi-wide-popup',
            scope: $scope
        };
        var popup = $ionicPopup.confirm(popupTemplate);

        popup.then(function (res) {
            if (res) {
                okHandler();
            }
        });
    }

    function showReferToNeurosurgeryPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-c/neurosurgery-referral-criteria/refer-to-neurosurgery-popup.html',
            title: 'Refer to neurosurgery',
            cssClass: 'chi-wide-popup',
            scope: $scope
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(okHandler);
    }

    function showConsiderReferralPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-c/neurosurgery-referral-criteria/consider-referral-popup.html',
            title: 'Consider referral to neurosurgery',
            cssClass: 'chi-wide-popup',
            scope: $scope
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(okHandler);
    }

    function showReferralNotRequiredPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-c/neurosurgery-referral-criteria/referral-not-required-popup.html',
            title: 'Referral to neurosurgery not required',
            cssClass: 'chi-wide-popup',
            scope: $scope
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(okHandler);
    }


    // Private functions
    function handleDataValid() {
        saveData();

        if (!isNeuroReferralRequired()) {
            showReferralNotRequiredPopup(goToNextState);
        }
        else {
            if (vm.premorbidMrsScore < MRS_THRESHOLD) {
                showReferToNeurosurgeryPopup(goToNextState);
            }
            else {
                showConsiderReferralPopup(goToNextState);
            }
        }
    }

    function goToNextState() {
        if (!isNeuroReferralRequired()) {
            $state.go(STATE_PATIENT_END);
        }
        else {
            $state.go(STATE_NEUROSURGERY_REFERRAL_SUMMARY);
        }
    }

    function saveData(){
        PatientCacheService.setIsPosteriorFossaIch(vm.isPosteriorFossaIch);
        PatientCacheService.setIsVentricleObstructed(vm.isObstruction);
    }

    function clearEntryFields() {
        vm.longestAxis = null;
        vm.perpendicularAxis = null;
        vm.numSlices = null;
        vm.sliceThickness = null;
        vm.ichVolume = null;
    }

    function saveEntryData() {
        var entry = NeurosurgeryReferralCriteriaControllerService.getEntry(
            vm.longestAxis, vm.perpendicularAxis, vm.numSlices, 
            vm.sliceThickness, vm.ichVolume);
        PatientCacheService.addIchEntry(entry);
        vm.entries = PatientCacheService.getIchEntries();

        clearEntryFields();
    } 
    
    function isNeuroReferralRequired() {
        return NeurosurgeryReferralCriteriaControllerService.isNeuroReferralRequired(vm.gcsScore, vm.entries, vm.isPosteriorFossaIch, vm.isObstruction, GCS_THRESHOLD, ICH_VOLUME_THRESHOLD);
    }
}
