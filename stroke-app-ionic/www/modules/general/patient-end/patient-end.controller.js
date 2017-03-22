'use strict';

angular.module('app.general').controller('PatientEndController', PatientEndController);

PatientEndController.$inject = ['$state', '$scope', '$ionicPopup', 'TabStateCacheService', 'PatientCacheService', 'BpStateCacheService', 'PatientEndControllerService', 'PatientHttpService', 'EmailService', 'DemoModeCacheService', 'EmailCacheService', 'STATE_PATIENT_END', 'STATE_PATIENT_START'];

function PatientEndController($state, $scope, $ionicPopup, TabStateCacheService, PatientCacheService, BpStateCacheService, PatientEndControllerService, PatientHttpService, EmailService, DemoModeCacheService, EmailCacheService, STATE_PATIENT_END, STATE_PATIENT_START) {
 
    var vm = this; // S14

    TabStateCacheService.setCurrentState(STATE_PATIENT_END);
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
                        })
                    }
                    );
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

    function showEmailPatientPopup(sendHandler) {
        var popupTemplate = {
            templateUrl: 'modules/general/patient-end/email-patient-popup.html',
            title: 'Email patient details',
            cssClass: 'chi-wide-popup'
        };
        var popup = $ionicPopup.confirm(popupTemplate);

        popup.then(function (res) {
            if (res) {
                sendHandler();
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
