'use strict';

angular.module('app.protocolA').controller('AdministerBeriplexController', AdministerBeriplexController);

AdministerBeriplexController.$inject = ['$window', '$scope', '$state', '$ionicPopup', 'AdministerBeriplexControllerService', 'PatientCacheService', 'StateCacheService', 'DateTimeService', 'DemoModeCacheService', 'GCS_THRESHOLD', 'STATE_ADMINISTER_BERIPLEX', 'STATE_BP_MANAGEMENT', 'PCCDoseTableService'];

function AdministerBeriplexController($window, $scope, $state, $ionicPopup, AdministerBeriplexControllerService, PatientCacheService, StateCacheService, DateTimeService, DemoModeCacheService, GCS_THRESHOLD, STATE_ADMINISTER_BERIPLEX, STATE_BP_MANAGEMENT, PCCDoseTableService) {

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
        vm.calculatedDose = PatientCacheService.getCalculatedBeriplexDose();
        vm.actualDose = PatientCacheService.getActualBeriplexDose();
        vm.pccDose = vm.actualDose !== null ? vm.actualDose : vm.calculatedDose;
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
        vm.anticoagulantType = PatientCacheService.getAnticoagulantType();
        vm.selectedPCCType = PatientCacheService.getSelectedPCCType();

        vm.estimatedWeightInKg = PatientCacheService.getEstimatedWeightInKg();
        vm.inrValue = PatientCacheService.getInrValue();
        vm.administerBeriplexWithoutInr = PatientCacheService.getAdministerBeriplexWithoutInr();
        vm.dosingTable = PCCDoseTableService.getDosingRecords(vm.selectedPCCType);
        vm.topupDose = PatientCacheService.getTopupDose();

        vm.hasDoacBeenTaken = PatientCacheService.getHasDoacBeenTaken();

        if(vm.topupDose){
            vm.pccDose -= vm.topupDose;
        }

        // Setup click handlers
        vm.onNext = onNext;
        vm.onBeriplexNow = onBeriplexNow;
        vm.onVitkNow = onVitkNow;
        vm.onShowTopupDosePopup = onShowTopupDosePopup;

        // Setup change handlers
        vm.isBeriplexAdministeredChanged = isBeriplexAdministeredChanged;
        vm.isVitkAdministeredChanged = isVitkAdministeredChanged;
        vm.onInrValueChanged = onInrValueChanged;
 
        // Setup enable/disable handlers
        vm.isNextButtonEnabled = isNextButtonEnabled;

        // Setup show/hide handlers
        vm.showBeriplexDateTimeCard = showBeriplexDateTimeCard;
        vm.showVitaminkDateTimeCard = showVitaminkDateTimeCard;
        vm.showVitaminKCards = showVitaminKCards;
        vm.isPCCTopupButtonEnabled = isPCCTopupButtonEnabled;
        vm.showCalculatedDose = showCalculatedDose;
        vm.showActualDose = showActualDose;
        vm.showCalculatedDoseToAdminister = showCalculatedDoseToAdminister;

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

    function onShowTopupDosePopup(){
        vm.inrValue = null;
        vm.topupActualDose = null;
        vm.topupCalculatedDose = null;
        showAdministerTopupDosePopup(); 
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

    function onInrValueChanged(){
        var topupDose = PCCDoseTableService.getDose(vm.selectedPCCType, vm.estimatedWeightInKg, vm.unconfirmedInrValue, vm.hasDoacBeenTaken);
        vm.topupCalculatedDose = topupDose - vm.pccDose;
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

    function showVitaminKCards(){
        return AdministerBeriplexControllerService.showVitaminKCards(vm.anticoagulantType);
    }

    function isPCCTopupButtonEnabled(){
        return AdministerBeriplexControllerService.isPCCTopupButtonEnabled(vm.inrValue, vm.hasDoacBeenTaken);
    }

    function showCalculatedDose(){
        return AdministerBeriplexControllerService.showCalculatedDose(vm.unconfirmedInrValue);
    }

    function showActualDose(){
        return AdministerBeriplexControllerService.showActualDose(vm.overrideCalculatedDose, vm.unconfirmedInrValue);
    }

    function showCalculatedDoseToAdminister(){
        return AdministerBeriplexControllerService.showCalculatedDoseToAdminister(vm.overrideCalculatedDose);
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

    function updatePCCDose(){
        var topupDose = vm.topupActualDose ? vm.topupActualDose : vm.topupCalculatedDose;
        var totalDose = vm.pccDose + topupDose;
        if(vm.actualDose){
            PatientCacheService.setActualBeriplexDose(totalDose);
        } else if(vm.calculatedDose) {
            PatientCacheService.setCalculatedBeriplexDose(totalDose);
        }

        PatientCacheService.setTopupDose(topupDose);
        vm.inrValue = vm.unconfirmedInrValue
        PatientCacheService.setInrValue(vm.inrValue);

        vm.topupDose = topupDose;
    }

    function validateTopupDosePopup(){
        if(AdministerBeriplexControllerService.isTopupDosePopupValid(vm.unconfirmedInrValue, vm.overrideCalculatedDose, vm.topupActualDose)){
            showTopupDoseConfirmationPopup();
        } else {
            showTopupDoseInvalidDataPopup();
        }
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

    function showAdministerTopupDosePopup(){
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/administer-beriplex/administer-topup-dose-popup.html',
            title: 'Administer topup dose',
            subTitle: 'Administer the remaining topup dose.',
            cssClass: 'chi-extra-wide-popup',
            scope: $scope
        };
        var popup = $ionicPopup.confirm(popupTemplate);
        popup.then(function(confirm){
            if(confirm) validateTopupDosePopup();
        });
    }

    function showTopupDoseConfirmationPopup(){
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/administer-beriplex/administer-topup-dose-confirmation-popup.html',
            title: 'Data validation',
            subTitle: 'Please confirm data entered is correct',
            cssClass: 'chi-wide-popup',
            scope: $scope
        }
        var popup = $ionicPopup.confirm(popupTemplate);
        popup.then(function(confirm){
            if(confirm) updatePCCDose();
            else showAdministerTopupDosePopup();
        });
    }

    function showTopupDoseInvalidDataPopup(){
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/administer-beriplex/administer-topup-dose-invalid-data-popup.html',
            title: 'Invalid data',
            subTitle: 'The information you have entered was invalid.',
            cssClass: 'chi-wide-popup',
            scope: $scope
        }
        var popup = $ionicPopup.alert(popupTemplate);
        popup.then(function(confirm){
            showAdministerTopupDosePopup();
        });
    }
}

 