'use strict';

angular.module('app.protocolC').controller('NeurosurgeryReferralCriteriaController', NeurosurgeryReferralCriteriaController);

NeurosurgeryReferralCriteriaController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'StateCacheService', 'MRS_THRESHOLD', 'GCS_THRESHOLD', 'ICH_VOLUME_THRESHOLD', 'DemoModeCacheService', 'STATE_NEUROSURGERY_REFERRAL_CRITERIA', 'STATE_NEUROSURGERY_REFERRAL_SUMMARY', 'STATE_PATIENT_END', 'NeurosurgeryReferralCriteriaControllerService'];

function NeurosurgeryReferralCriteriaController($scope, $state, $ionicPopup, PatientCacheService, StateCacheService, MRS_THRESHOLD, GCS_THRESHOLD, ICH_VOLUME_THRESHOLD, DemoModeCacheService, STATE_NEUROSURGERY_REFERRAL_CRITERIA, STATE_NEUROSURGERY_REFERRAL_SUMMARY, STATE_PATIENT_END, NeurosurgeryReferralCriteriaControllerService) {

    var vm = this; // S12

    StateCacheService.setCurrentState(STATE_NEUROSURGERY_REFERRAL_CRITERIA);
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = DemoModeCacheService.getIsDemoMode();
    vm.showIchVolumeOutOfRangeMessage = showIchVolumeOutOfRangeMessage;

    vm.sliderImages = [
        {
      	    'src' : 'img/occluded-3rd.jpg', 
      	    'title' : 'occluded 3rd'
    	}, 
        {
      	    'src' : 'img/occluded-4th.jpg', 
      	    'title' : 'occluded 4th'
    	}, 
        {
      	    'src' : 'img/externally-compressed-3rd.jpg', 
      	    'title' : 'externally compressed 3rd'
    	}, 
        {
      	    'src' : 'img/externally-compressed-4th.jpg', 
      	    'title' : 'externally compressed 4th'
    	}
    ];

    vm.sliderOptions = {
        loop: false,
        effect: 'fade',
        speed: 500
    }

    vm.isPosteriorFossaIch = PatientCacheService.getIsPosteriorFossaIch();
    vm.isObstruction = PatientCacheService.getIsVentricleObstructed();
    vm.longestAxis = PatientCacheService.getIchLongestAxis();
    vm.perpendicularAxis = PatientCacheService.getIchPerpendicularAxis();
    vm.numSlices = PatientCacheService.getIchNumSlices();
    vm.sliceThickness = PatientCacheService.getIchSliceThickness();
    calculateVolume();

    vm.onNext = onNext;
    vm.isNextButtonEnabled = isNextButtonEnabled;
    vm.calculateVolume = calculateVolume;
    vm.showVolumeMeasurementPopup = showVolumeMeasurementPopup;
    vm.showObstructionPopup = showObstructionPopup;

    function showIchVolumeOutOfRangeMessage() {
        return NeurosurgeryReferralCriteriaControllerService.isIchVolumeOutOfRange(vm.ichVolume);
    }
 
    function onNext() {
       showDataValidationPopup(handleDataValid); 
    }

    function isNextButtonEnabled() {
        var isEnabled = NeurosurgeryReferralCriteriaControllerService.isNextButtonEnabled(vm.ichVolume, vm.isPosteriorFossaIch, vm.isObstruction);

        return isEnabled;
    }

    function handleDataValid() {
        saveData();

        if (isNeuroReferralNotRequired()) {
            showReferralNotRequiredPopup(goNextState);
        }
        else {
            if (PatientCacheService.getPremorbidMrsScore() < MRS_THRESHOLD) {
                showReferToNeurosurgeryPopup(goNextState);
            }
            else {
                showConsiderReferralPopup(goNextState);
            }
        }
    }

    function goNextState() {
        if (isNeuroReferralNotRequired()) {
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
 
    function calculateVolume() {
        if (vm.longestAxis != null &&
            vm.perpendicularAxis != null &&
            vm.numSlices != null &&
            vm.sliceThickness != null) {
            var volume = vm.longestAxis * vm.perpendicularAxis * vm.numSlices * vm.sliceThickness / 2;
            vm.ichVolume = parseFloat(volume).toFixed(2);
        }
        else {
            vm.ichVolume = null;
        }
    }

    function isNeuroReferralNotRequired() {

        var isNeuroReferrelNotRequired = false;

        if (   PatientCacheService.getGcsScore() >= GCS_THRESHOLD 
            && PatientCacheService.getIchVolume() <= ICH_VOLUME_THRESHOLD 
            && !PatientCacheService.getIsPosteriorFossaIch()
            && !PatientCacheService.getIsVentricleObstructed()) {

             isNeuroReferrelNotRequired = true;   
        }

        return isNeuroReferrelNotRequired;
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

        popup.then(function(res) {
            if (res) {
                okHandler();
            }
        });
    }

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
}
