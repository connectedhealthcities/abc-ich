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
        vm.longestAxis = PatientCacheService.getIchLongestAxis();
        vm.perpendicularAxis = PatientCacheService.getIchPerpendicularAxis();
        vm.numSlices = PatientCacheService.getIchNumSlices();
        vm.sliceThickness = PatientCacheService.getIchSliceThickness();
        vm.ichVolume = NeurosurgeryReferralCriteriaControllerService.calculateVolume(vm.longestAxis, vm.perpendicularAxis, vm.numSlices, vm.sliceThickness);

        // initialise vm parameters for page logic 
        vm.gcsScore = PatientCacheService.getGcsScore();
        vm.premorbidMrsScore = PatientCacheService.getPremorbidMrsScore();

        // Set up slider
        var sliderConfig = NeurosurgeryReferralCriteriaControllerService.getSliderConfig();
        vm.sliderImages = sliderConfig.images;
        vm.sliderOptions = sliderConfig.options;

        // Setup click handlers
        vm.onNext = onNext;

        // Setup change handlers
        vm.onVolumeFieldChanged = onVolumeFieldChanged;

        // Set up enable/disable handlers
        vm.isNextButtonEnabled = isNextButtonEnabled;

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

    // Change handlers
    function onVolumeFieldChanged() {
        vm.ichVolume = NeurosurgeryReferralCriteriaControllerService.calculateVolume(vm.longestAxis, vm.perpendicularAxis, vm.numSlices, vm.sliceThickness);
    }

    // Enable/disable handlers
    function isNextButtonEnabled() {
        return NeurosurgeryReferralCriteriaControllerService.isNextButtonEnabled(vm.ichVolume, vm.isPosteriorFossaIch, vm.isObstruction);
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
            showReferralNotRequiredPopup(goNextState);
        }
        else {
            if (vm.premorbidMrsScore < MRS_THRESHOLD) {
                showReferToNeurosurgeryPopup(goNextState);
            }
            else {
                showConsiderReferralPopup(goNextState);
            }
        }
    }

    function goNextState() {
        if (!isNeuroReferralRequired()) {
            $state.go(STATE_PATIENT_END);
        }
        else {
            $state.go(STATE_NEUROSURGERY_REFERRAL_SUMMARY);
        }
    }

    function saveData() {
        PatientCacheService.setIsPosteriorFossaIch(vm.isPosteriorFossaIch);
        PatientCacheService.setIsVentricleObstructed(vm.isObstruction);
        PatientCacheService.setIchVolume(vm.ichVolume); 
        PatientCacheService.setIchLongestAxis(vm.longestAxis);
        PatientCacheService.setIchPerpendicularAxis(vm.perpendicularAxis);
        PatientCacheService.setIchNumSlices(vm.numSlices);
        PatientCacheService.SetIchSliceThickness(vm.sliceThickness);
    } 
    
    function isNeuroReferralRequired() {
        return NeurosurgeryReferralCriteriaControllerService.isNeuroReferralRequired(vm.gcsScore, vm.ichVolume, vm.isPosteriorFossaIch, vm.isVentricleObstructed, GCS_THRESHOLD, ICH_VOLUME_THRESHOLD);
    }
}
