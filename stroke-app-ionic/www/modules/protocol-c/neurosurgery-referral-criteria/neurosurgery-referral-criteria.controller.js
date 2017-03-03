'use strict';

angular.module('app.protocolC').controller('NeurosurgeryReferralCriteriaController', NeurosurgeryReferralCriteriaController);

NeurosurgeryReferralCriteriaController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'MRS_THRESHOLD', 'GCS_THRESHOLD', 'ICH_VOLUME_THRESHOLD'];

function NeurosurgeryReferralCriteriaController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, MRS_THRESHOLD, GCS_THRESHOLD, ICH_VOLUME_THRESHOLD) {

    var vm = this; // S12

    TabStateCacheService.setCurrentState('tabs.neurosurgery-referral-criteria');
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = PatientCacheService.getIsDemoMode();

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
 
    function onNext() {
       showDataValidationPopup(handleDataValid); 
    }

    function isNextButtonEnabled() {
        var isEnabled = false;

        if (vm.ichVolume != null &&
            vm.isPosteriorFossaIch != null &&
            vm.isObstruction != null) {
            isEnabled = true;
        }

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
            $state.go('patient-end');
        }
        else {
            $state.go('tabs.neurosurgery-referral-summary');
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
            title: 'Obstruction of the third and/or fourth ventricle',
            cssClass: 'chi-wide-popup',
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
