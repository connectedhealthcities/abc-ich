'use strict';

angular.module('app.protocolC').controller('NeurosurgeryReferralSummaryController', NeurosurgeryReferralSummaryController);

NeurosurgeryReferralSummaryController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService','DateTimeService', 'GCS_THRESHOLD'];

function NeurosurgeryReferralSummaryController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, DateTimeService, GCS_THRESHOLD) {

    var vm = this; // S13

    TabStateCacheService.setStateTabC('tabs.neurosurgery-referral-summary');

//cjd ToDo age from DoB
    vm.summary = {};
    vm.summary.age = PatientCacheService.getEstimatedAge() + " estimated";
    vm.summary.gcsEye = PatientCacheService.getGcsScoreEye();
    vm.summary.gcsVerbal = PatientCacheService.getGcsScoreVerbal();
    vm.summary.gcsMotor = PatientCacheService.getGcsScoreMotor();
    vm.summary.gcsTotal = PatientCacheService.getGcsScore();
    vm.summary.isPosteriorFossaIch = PatientCacheService.getIsPosteriorFossaIch();
    vm.summary.isVentricleObstructed = PatientCacheService.getIsVentricleObstructed();
    vm.summary.ichVolume = PatientCacheService.getIchVolume();
    vm.summary.premorbidMrs = PatientCacheService.getPremorbidMrsScore();
   
    vm.isReferred = null;
    vm.referralDate = null;
    vm.referralTime = null;
    vm.neurosurgeonName = null;
    vm.isAccepted = null;
    vm.isForActiveTreatment = null;

    vm.onNext = onNext;
    vm.isNextButtonEnabled = isNextButtonEnabled;
    vm.onReferralNow = onReferralNow;
    vm.isReferredChanged = isReferredChanged;

    function onNext() {
        showDataValidationPopup(handleDataIsValid); 
    }

    function isNextButtonEnabled() {
        var isEnabled = false;

        if (vm.isReferred != null && vm.isForActiveTreatment != null) {
            if (vm.isReferred) {
                if (vm.referralDate != null &&
                    vm.referralDate != null &&
                    vm.neurosurgeonName != null &&
                    vm.isAccepted != null) {

                    isEnabled = true;
                }
            }
            else {
                isEnabled = true;
            }
        }

        return isEnabled;
    }

    function handleDataIsValid() {
        saveData();

         if (PatientCacheService.getGcsScore() < GCS_THRESHOLD) {
            TabStateCacheService.goLatestStateTabB();
        }
        else {
            $state.go('patient-end');
        }
     }

    function saveData() {
        if (vm.isReferred) {
            var referralDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.referralDate, vm.referralTime);
            PatientCacheService.setReferralToNeurosurgeryDateTime(referralDateTime);
            PatientCacheService.setNeurosurgeonName(vm.neurosurgeonName);
            PatientCacheService.setIsReferralToNeurosurgeryAccepted(vm.isAccepted);
        }
        PatientCacheService.setIsForActiveTreatment(vm.isForActiveTreatment);
    }

    function onReferralNow() {
        var now = new Date();
        now.setSeconds(0);
        now.setMilliseconds(0);
        vm.referralDate = now;
        vm.referralTime = now;
    }

    function isReferredChanged() {
        vm.referralDate = null;
        vm.referralTime = null;
        vm.neurosurgeonName = null;
        vm.isAccepted = null;
    }

    function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-c/neurosurgery-referral-summary/neurosurgery-referral-summary-data-validation-popup.html',
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
