'use strict';

angular.module('app.protocolA').controller('AdministerTopupDoseController', AdministerTopupDoseController);

AdministerTopupDoseController.$inject = ['$window', '$scope', '$state', '$ionicPopup', 'AdministerTopupDoseControllerService', 'PatientCacheService', 'DemoModeCacheService', 'PCCDoseTableService', 'STATE_ADMINISTER_BERIPLEX'];

function AdministerTopupDoseController($window, $scope, $state, $ionicPopup, AdministerTopupDoseControllerService, PatientCacheService, DemoModeCacheService, PCCDoseTableService, STATE_ADMINISTER_BERIPLEX) {

    var vm = this;

    function init() {
        // Initialise vm parameters for header row
        vm.patientId = PatientCacheService.getUniqueId();
        vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

        // Initialise vm parameters for page content
        vm.calculatedDose = PatientCacheService.getCalculatedBeriplexDose();
        vm.actualDose = PatientCacheService.getActualBeriplexDose();
        vm.pccDose = vm.actualDose !== null ? vm.actualDose : vm.calculatedDose;

        vm.selectedPCCType = PatientCacheService.getSelectedPCCType();

        vm.estimatedWeightInKg = PatientCacheService.getEstimatedWeightInKg();
        vm.dosingTable = PCCDoseTableService.getDosingRecords(vm.selectedPCCType);
        vm.topupDose = PatientCacheService.getTopupDose();

        // Setup click handlers
        vm.onNext = onNext;
        vm.onCancel = onCancel;

        // Setup change handlers
        vm.onInrValueChanged = onInrValueChanged;
 
        // Setup enable/disable handlers
        vm.isNextButtonEnabled = isNextButtonEnabled;

        // Setup show/hide handlers
        vm.showCalculatedDoseCard = showCalculatedDoseCard;
        vm.showActualDoseCard = showActualDoseCard;
        vm.showInrInvalidMessage = showInrInvalidMessage;
        vm.showCalculatedDoseInvalidMessage = showCalculatedDoseInvalidMessage;
        vm.showActualDoseInvalidMessage = showActualDoseInvalidMessage;
    }

    init();

    // Click handlers
    function onNext(){
    	showConfirmationPopup();
    }

    function onCancel(){
    	goToAdministerBeriplexPage();
    }

    // Change handlers
    function onInrValueChanged(){
    	var topupDose = PCCDoseTableService.getDose(vm.selectedPCCType, vm.estimatedWeightInKg, vm.unconfirmedInrValue, vm.hasDoacBeenTaken);
        vm.topupCalculatedDose = topupDose - vm.pccDose;
    }

    // Enable/disable handlers
    function isNextButtonEnabled(){
    	return AdministerTopupDoseControllerService.isNextButtonEnabled(vm.unconfirmedInrValue, vm.topupCalculatedDose, vm.topupActualDose, vm.overrideCalculatedDose);
    }

    // Show/hide handlers
    function showCalculatedDoseCard(){
        return AdministerTopupDoseControllerService.showCalculatedDoseCard(vm.unconfirmedInrValue);
    }

    function showActualDoseCard(){
        return AdministerTopupDoseControllerService.showActualDoseCard(vm.unconfirmedInrValue, vm.overrideCalculatedDose);
    }

    function showInrInvalidMessage(){
        return !AdministerTopupDoseControllerService.isInrValueValid(vm.unconfirmedInrValue);
    }

    function showCalculatedDoseInvalidMessage(){
        return !AdministerTopupDoseControllerService.isCalculatedDoseValid(vm.topupCalculatedDose, vm.overrideCalculatedDose);
    }

    function showActualDoseInvalidMessage(){
        return !AdministerTopupDoseControllerService.isActualDoseValid(vm.topupActualDose, vm.overrideCalculatedDose);
    }

    // Private functions
    function showConfirmationPopup(){
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/administer-topup-dose/administer-topup-dose-confirmation-popup.html',
            title: 'Data validation',
            subTitle: 'Please confirm data entered is correct',
            cssClass: 'chi-wide-popup',
            scope: $scope
        }
        var popup = $ionicPopup.confirm(popupTemplate);
        popup.then(function(confirm){
            if(confirm) {
            	onConfirm();
            }
        });
    }

    function onConfirm(){
    	updatePCCDose();
    	goToAdministerBeriplexPage();
    }

    function updatePCCDose(){
        var topupDose = vm.overrideCalculatedDose ? vm.topupActualDose : vm.topupCalculatedDose;
        var totalDose = vm.pccDose + topupDose;
        
        if(vm.actualDose){
            PatientCacheService.setActualBeriplexDose(totalDose);
        } else if(vm.calculatedDose) {
            PatientCacheService.setCalculatedBeriplexDose(totalDose);
        }

        PatientCacheService.setTopupDose(topupDose);
        PatientCacheService.setInrValue(vm.unconfirmedInrValue);
    }

    function goToAdministerBeriplexPage(){
    	$state.go(STATE_ADMINISTER_BERIPLEX);
    }
}