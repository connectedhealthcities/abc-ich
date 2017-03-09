'use strict';

angular.module('app.protocolA').controller('AnticoagulantIdentificationController', AnticoagulantIdentificationController);

AnticoagulantIdentificationController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'DemoModeCacheService', 'EnumService', 'GCS_THRESHOLD', 'STATE_ANTICOAGULANT_IDENTIFICATION', 'STATE_CALCULATE_BERIPLEX_DOSE', 'STATE_REVERSAL_AGENT_DETAILS'];

function AnticoagulantIdentificationController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, DemoModeCacheService, EnumService, GCS_THRESHOLD, STATE_ANTICOAGULANT_IDENTIFICATION, STATE_CALCULATE_BERIPLEX_DOSE, STATE_REVERSAL_AGENT_DETAILS) { 
 
    var vm = this; // S6

    TabStateCacheService.setCurrentState(STATE_ANTICOAGULANT_IDENTIFICATION);
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

    vm.sliderImages = [
        {
      	    'src' : 'img/apixaban.png', 
      	    'title' : 'Apixaban'
    	}, 
        {
      	    'src' : 'img/dabigatran.png', 
      	    'title' : 'Dabigatran'
    	}, 
        {
      	    'src' : 'img/edoxaban.png', 
      	    'title' : 'Edoxaban'
    	}, 
        {
      	    'src' : 'img/rivaroxaban.png', 
      	    'title' : 'Rivaroxaban'
    	}
    ];

    vm.sliderOptions = {
        loop: false,
        effect: 'fade',
        speed: 500
    }

    vm.anticoagulantType = EnumService.displayValueFromEnumValueForAnticoagulantType(PatientCacheService.getAnticoagulantType());
    vm.anticoagulantName = PatientCacheService.getAnticoagulantName();

    vm.onNext = onNext;
    vm.isNextButtonEnabled = isNextButtonEnabled;
    vm.anticoagulantTypeChanged = anticoagulantTypeChanged;
    vm.showDoacExamplesPopup = showDoacExamplesPopup;

    function onNext() {
        showDataValidationPopup(handleDataValid);
    }

    function anticoagulantTypeChanged() {
        vm.anticoagulantName = null;
    }

    function handleDataValid() {
        saveData();

        if (vm.anticoagulantType === "None") {
            goNextStateWhenNone();
        }
        else if (vm.anticoagulantType === "Unknown") {
            showAnticoagulantUnknownPopup(goNextStateWhenVitkOrUnknown);
        }
        else if (vm.anticoagulantType === "Vitamin K antagonist") {
            goNextStateWhenVitkOrUnknown();
        }
        else if (vm.anticoagulantType === "DOAC") {
            showAnticoagulantIsDoacPopup(goNextStateWhenDoac);
        }
     }

    function onNext() {
       showDataValidationPopup(handleDataValid);
    }

    function isNextButtonEnabled() {
        var isEnabled = false;

        if (vm.anticoagulantType != null) {
            if ( (vm.anticoagulantType === "Unknown") ||
                 (vm.anticoagulantType === "None") ||
                 (vm.anticoagulantType == "Vitamin K antagonist" && vm.anticoagulantName != null) ||
                 (vm.anticoagulantType == "DOAC" && vm.anticoagulantName != null) ) {
                isEnabled = true;
            }
        }

        return isEnabled;
    }

    function saveData() {
        PatientCacheService.setAnticoagulantType(EnumService.enumValueFromDisplayValueForAnticoagulantType(vm.anticoagulantType));

        if (vm.anticoagulantType === "Vitamin K antagonist" || vm.anticoagulantType === "DOAC") {
            PatientCacheService.setAnticoagulantName(vm.anticoagulantName);
        }
    }

    function goNextStateWhenVitkOrUnknown() {
        $state.go(STATE_CALCULATE_BERIPLEX_DOSE);
    }

    function goNextStateWhenDoac() {
        $state.go(STATE_REVERSAL_AGENT_DETAILS);
    }

    function goNextStateWhenNone() {
        if (PatientCacheService.getGcsScore() < GCS_THRESHOLD) {
            TabStateCacheService.goLatestStateTabC();
        }
        else {
            TabStateCacheService.goLatestStateTabB();
        }
    }

    function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/anticoagulant-identification/anticoagulant-identification-data-validation-popup.html',
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

    function showAnticoagulantUnknownPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/anticoagulant-identification/anticoagulant-unknown-popup.html',
            title: 'Anticoagulant unknown',
            cssClass: 'chi-wide-popup'
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(okHandler);
    }

    function showAnticoagulantIsDoacPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/anticoagulant-identification/anticoagulant-is-doac-popup.html',
            title: 'ICH on DOAC',
            cssClass: 'chi-wide-popup'
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(okHandler);
    }

    function showDoacExamplesPopup() {
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/anticoagulant-identification/view-doacs-popup.html',
            title: 'DOAC images',
            cssClass: 'chi-slider-popup',
            scope: $scope
        };
        $ionicPopup.alert(popupTemplate);
    }

}
