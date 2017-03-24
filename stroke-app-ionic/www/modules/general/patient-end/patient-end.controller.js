'use strict';

angular.module('app.general').controller('PatientEndController', PatientEndController);

PatientEndController.$inject = ['$state', '$scope', '$ionicPopup', 'StateCacheService', 'PatientCacheService', 'BpStateCacheService', 'PatientEndControllerService', 'PatientHttpService', 'EmailService', 'DemoModeCacheService', 'EmailCacheService', 'STATE_PATIENT_END', 'STATE_PATIENT_START'];

function PatientEndController($state, $scope, $ionicPopup, StateCacheService, PatientCacheService, BpStateCacheService, PatientEndControllerService, PatientHttpService, EmailService, DemoModeCacheService, EmailCacheService, STATE_PATIENT_END, STATE_PATIENT_START) {
 
    var vm = this; // S14

    StateCacheService.setCurrentState(STATE_PATIENT_END);
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = DemoModeCacheService.getIsDemoMode();
    
    vm.onFinish = onFinish;

    function onFinish() {
        
        if (vm.isDemoMode) {
            reset();
        }
        else {
            var patient = PatientEndControllerService.getPatient();
            var emailData = EmailService.getEmailData();
            PatientHttpService.updatePatient(patient).then(function(success) {
                if (success) {
                    showPatientSaveSucceededPopup(function () {
                        showEmailPatientPopup(function () {                            
                            EmailService.sendEmail(emailData, reset, showEmailClientNotInstalledOnDevicePopup);
                        }, reset);
                    });
                }
                else {
                    showPatientSaveFailedPopup();
                }
            });
        }       
    }

    function reset() {
        PatientCacheService.clearAll();
        StateCacheService.clearAll();
        BpStateCacheService.clearAll();
        
        $state.go(STATE_PATIENT_START);
    }

    function showPatientSaveSucceededPopup(okHandler) {
        var popupTemplate = {
            title: 'Patient save succeeded',
            cssClass: 'chi-wide-popup'
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(function () {
            okHandler();
        });
    }

    function showPatientSaveFailedPopup() {
        var popupTemplate = {
            templateUrl: 'modules/general/patient-end/patient-save-failed-popup.html',
            title: 'Patient save failed',
            cssClass: 'chi-wide-popup'
        };
        $ionicPopup.alert(popupTemplate);
    }

    function showEmailPatientPopup(okHandler, cancelHandler) {
        var popupTemplate = {
            templateUrl: 'modules/general/patient-end/email-patient-popup.html',
            title: 'Email',
            cssClass: 'chi-wide-popup'
        };
        var popup = $ionicPopup.confirm(popupTemplate);

        popup.then(function (res) {
            if (res) {
                okHandler();
            } else {
                cancelHandler();
            }
        });
    }

    function showEmailClientNotInstalledOnDevicePopup() {
        var popupTemplate = {
            templateUrl: 'modules/general/patient-end/email-client-not-installed-on-device-popup.html',
            title: 'Email error',
            cssClass: 'chi-wide-popup'
        };
        $ionicPopup.alert(popupTemplate);
    }
    
}
