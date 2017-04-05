'use strict';

angular.module('app.protocolC').controller('NeurosurgeryReferralSummaryController', NeurosurgeryReferralSummaryController);

NeurosurgeryReferralSummaryController.$inject = ['$scope', '$state', '$ionicPopup', 'NeurosurgeryReferralSummaryControllerService', 'PatientCacheService', 'StateCacheService', 'DemoModeCacheService','DateTimeService', 'GCS_THRESHOLD', 'STATE_NEUROSURGERY_REFERRAL_SUMMARY', 'STATE_PATIENT_END', 'STATE_BP_MANAGEMENT'];

function NeurosurgeryReferralSummaryController($scope, $state, $ionicPopup, NeurosurgeryReferralSummaryControllerService, PatientCacheService, StateCacheService, DemoModeCacheService, DateTimeService, GCS_THRESHOLD, STATE_NEUROSURGERY_REFERRAL_SUMMARY, STATE_PATIENT_END, STATE_BP_MANAGEMENT) {

    var vm = this;

    function init() {
        // set current state
        StateCacheService.setCurrentState(STATE_NEUROSURGERY_REFERRAL_SUMMARY);

        // initialise vm parameters for header row
        vm.patientId = PatientCacheService.getUniqueId();
        vm.gcsScore = PatientCacheService.getGcsScore();
        vm.isDemoMode = DemoModeCacheService.getIsDemoMode();
 
        // initialise vm parameters for page summary       
        vm.summary = {};
        var estimatedAge = PatientCacheService.getEstimatedAge();
        var birthDate = PatientCacheService.getBirthDate();
        var ageFromBirthDate =  DateTimeService.getAgeFromBirthDate(birthDate);
        vm.summary.age = estimatedAge !== null ? estimatedAge + " (estimated)" : ageFromBirthDate + "";
        vm.summary.gcsEye = PatientCacheService.getGcsScoreEye();
        vm.summary.gcsVerbal = PatientCacheService.getGcsScoreVerbal();
        vm.summary.gcsMotor = PatientCacheService.getGcsScoreMotor();
        vm.summary.gcsTotal = PatientCacheService.getGcsScore();
        vm.summary.isPosteriorFossaIch = PatientCacheService.getIsPosteriorFossaIch();
        vm.summary.isVentricleObstructed = PatientCacheService.getIsVentricleObstructed();
        vm.summary.ichVolume = PatientCacheService.getIchVolume();
        vm.summary.premorbidMrs = PatientCacheService.getPremorbidMrsScore();

       // initialise vm parameters for page content       
        vm.isReferred = PatientCacheService.getIsReferredToNeurosurgery();
        var referralDateTime = PatientCacheService.getReferralToNeurosurgeryDateTime();
        vm.referralDate = referralDateTime;
        vm.referralTime = referralDateTime;
        vm.neurosurgeonName = PatientCacheService.getNeurosurgeonName();
        vm.isAccepted = PatientCacheService.getIsReferralToNeurosurgeryAccepted();

        // Setup click handlers
        vm.onNext = onNext;
        vm.onReferralNow = onReferralNow;

        // Setup change handlers
        vm.isReferredChanged = isReferredChanged;

        // Setup enable/disable handlers
        vm.isNextButtonEnabled = isNextButtonEnabled;

        // Setup show/hide handlers
        vm.showReferralDetailsCards = showReferralDetailsCards;
    }

    init();

    // Click handlers
    function onNext() {
        showDataValidationPopup(handleDataValid); 
    }

    function onReferralNow() {
        var now = DateTimeService.getNowWithZeroSeconds();
        vm.referralDate = now;
        vm.referralTime = now;
    }

    // Change handlers
    function isReferredChanged() {
        vm.referralDate = null;
        vm.referralTime = null;
        vm.neurosurgeonName = null;
        vm.isAccepted = null;
    }

    // Enable/disable handlers
    function isNextButtonEnabled() {
        return NeurosurgeryReferralSummaryControllerService.isNextButtonEnabled(vm.isReferred, vm.referralDate, vm.referralTime, vm.neurosurgeonName, vm.isAccepted);
    }

    // Show/hide handlers
    function showReferralDetailsCards() {
        return NeurosurgeryReferralSummaryControllerService.showReferralDetailsCards(vm.isReferred);       
    }

    // Private functions
    function handleDataValid() {
        saveData();

         if (vm.gcsScore < GCS_THRESHOLD) {
            $state.go(STATE_BP_MANAGEMENT);
        }
        else {
            $state.go(STATE_PATIENT_END);
        }
     }

    function saveData() {
        PatientCacheService.setIsReferredToNeurosurgery(vm.isReferred);
        var referralDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.referralDate, vm.referralTime);
        PatientCacheService.setReferralToNeurosurgeryDateTime(referralDateTime);
        PatientCacheService.setNeurosurgeonName(vm.neurosurgeonName);
        PatientCacheService.setIsReferralToNeurosurgeryAccepted(vm.isAccepted);
    }

    // Popups
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
