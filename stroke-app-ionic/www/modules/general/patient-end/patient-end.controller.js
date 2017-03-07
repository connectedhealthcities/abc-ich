'use strict';

angular.module('app.general').controller('PatientEndController', PatientEndController);

PatientEndController.$inject = ['$state', '$ionicPopup', 'TabStateCacheService', 'PatientCacheService', 'BpStateCacheService', 'PatientEndControllerService', 'PatientHttpService', 'EmailService', 'DemoModeCacheService'];

function PatientEndController($state, $ionicPopup, TabStateCacheService, PatientCacheService, BpStateCacheService, PatientEndControllerService, PatientHttpService, EmailService, DemoModeCacheService) {
 
    var vm = this; // S14

    TabStateCacheService.setCurrentState('patient-end');
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
            PatientHttpService.savePatient(patient).then(function(success) {
                if (success) {
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
        
        $state.go('patient-start');
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
