'use strict';

angular.module('app.general').controller('PatientEndController', PatientEndController);

PatientEndController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientEndControllerService', 'PatientCacheService', 'StateCacheService', 'DemoModeCacheService', 'BpStateCacheService', 'PatientHttpService', 'PrintService', 'STATE_PATIENT_END', 'STATE_PATIENT_START'];

function PatientEndController($scope, $state, $ionicPopup, PatientEndControllerService, PatientCacheService, StateCacheService, DemoModeCacheService, BpStateCacheService, PatientHttpService, PrintService, STATE_PATIENT_END, STATE_PATIENT_START) {
 
    var vm = this;

    function init() {
        // set current state
        StateCacheService.setCurrentState(STATE_PATIENT_END);

        // initialise vm parameters for header row
        vm.patientId = PatientCacheService.getUniqueId();
        vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

        // Setup click handlers
        vm.onFinish = onFinish;
    }

    init();

    // Click handlers
    function onFinish() {
        
        if (vm.isDemoMode) {
            showPrintPatientPopup(function () {
                PrintService.printPatient(reset);                           
            }, reset);
        }
        else {
            var patient = PatientEndControllerService.getPatient();
            PatientHttpService.updatePatient(patient).then(function(success) {
                if (success) {
                    showPatientSaveSucceededPopup(function () {
                        showPrintPatientPopup(function () {
                            PrintService.printPatient(reset);                           
                        }, reset);
                    });
                }
                else {
                    showPatientSaveFailedPopup();
                }
            });
        }       
    }

    // Private functions
    function reset() {
        PatientCacheService.clearAll();
        StateCacheService.clearAll();
        BpStateCacheService.clearAll();
        
        $state.go(STATE_PATIENT_START);
    }

    // Popups
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

    function showPrintPatientPopup(okHandler, cancelHandler) {
        var popupTemplate = {
            templateUrl: 'modules/general/patient-end/print-patient-popup.html',
            title: 'Print',
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

   
}
