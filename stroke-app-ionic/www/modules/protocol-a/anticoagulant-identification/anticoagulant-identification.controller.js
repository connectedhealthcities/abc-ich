'use strict';

angular.module('app.protocolA').controller('AnticoagulantIdentificationController', AnticoagulantIdentificationController);

AnticoagulantIdentificationController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'GCS_THRESHOLD', 'DemoModeCacheService'];

function AnticoagulantIdentificationController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, GCS_THRESHOLD, DemoModeCacheService) { 
 
    var vm = this; // S6

    TabStateCacheService.setCurrentState('tabs.anticoagulant-identification');
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

    vm.anticoagulantType = displayValueFromEnumValueForAnticoagulantType(PatientCacheService.getAnticoagulantType());
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
        PatientCacheService.setAnticoagulantType(enumValueFromDisplayValueForAnticoagulantType(vm.anticoagulantType));

        if (vm.anticoagulantType === "Vitamin K antagonist" || vm.anticoagulantType === "DOAC") {
            PatientCacheService.setAnticoagulantName(vm.anticoagulantName);
        }
    }

    function displayValueFromEnumValueForAnticoagulantType(enumValue) {
        var displayValue;
        switch(enumValue) {
            case "VITK":
                displayValue = "Vitamin K antagonist";
                break;
            case "DOAC":
                displayValue = "DOAC";
                break;
            case "UNKNOWN":
                displayValue = "Unknown";
                break;
            case "NONE":
                displayValue = "None";
                break;
           default:
                displayValue = null;                
        }
        return displayValue;
    }

    function enumValueFromDisplayValueForAnticoagulantType(displayValue) {
        var enumValue;
        switch(displayValue) {
            case "Vitamin K antagonist":
                enumValue = "VITK";
                break;
            case "DOAC":
                enumValue = "DOAC";
                break;
            case "Unknown":
                enumValue = "UNKNOWN";
                break;
            case "None":
                enumValue = "NONE";
                break;
            default:
                enumValue = null;                
        }
        return enumValue;
    }


    function goNextStateWhenVitkOrUnknown() {
        $state.go('tabs.calculate-beriplex-dose');
    }

    function goNextStateWhenDoac() {
        $state.go('tabs.doac-reversal-agent-details');
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
