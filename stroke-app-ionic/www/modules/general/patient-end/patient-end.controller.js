'use strict';

angular.module('app.general').controller('PatientEndController', PatientEndController);

PatientEndController.$inject = ['$state', '$ionicPopup', 'TabStateCacheService', 'PatientCacheService', 'BpStateCacheService', 'PatientEndControllerService', 'PatientHttpService', 'EmailService', 'DemoModeCacheService', 'STATE_PATIENT_END', 'STATE_PATIENT_START'];

function PatientEndController($state, $ionicPopup, TabStateCacheService, PatientCacheService, BpStateCacheService, PatientEndControllerService, PatientHttpService, EmailService, DemoModeCacheService, STATE_PATIENT_END, STATE_PATIENT_START) {
 
    var vm = this; // S14

    TabStateCacheService.setCurrentState(STATE_PATIENT_END);
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = DemoModeCacheService.getIsDemoMode();
    
    vm.onFinish = onFinish;
    vm.onSend = onSend;

    function onSend() {
        EmailService.sendEmail();
    }

    function onFinish() {
        
        if (vm.isDemoMode) {
            reset();
        }
        else {
            var patient = PatientEndControllerService.getPatient();
            PatientHttpService.updatePatient(patient).then(function(success) {
                if (success) {
                    showPatientSaveSucceededPopup();
                    reset();
                }
                else {
                    showPatientSaveFailedPopup();
                }
            });
        }       
    }

    function reset() {
        PatientCacheService.clearAll();
        TabStateCacheService.clearAll();
        BpStateCacheService.clearAll();
        
        $state.go(STATE_PATIENT_START);
    }

    function showPatientSaveSucceededPopup() {
        var popupTemplate = {
            title: 'Patient save succeeded',
            cssClass: 'chi-wide-popup'
        };
        $ionicPopup.alert(popupTemplate);
    }

    function showPatientSaveFailedPopup() {
        var popupTemplate = {
            templateUrl: 'modules/general/patient-end/patient-save-failed-popup.html',
            title: 'Patient save failed',
            cssClass: 'chi-wide-popup'
        };
        $ionicPopup.alert(popupTemplate);
    }
}
