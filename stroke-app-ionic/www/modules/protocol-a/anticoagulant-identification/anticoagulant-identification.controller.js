'use strict';

angular.module('app.protocolA').controller('AnticoagulantIdentificationController', AnticoagulantIdentificationController);

AnticoagulantIdentificationController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'GCS_THRESHOLD'];

function AnticoagulantIdentificationController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, GCS_THRESHOLD) { 
 
    var vm = this; // S6

    TabStateCacheService.setStateTabA('tabs.anticoagulant-identification');

    vm.myImage = {
      	    'src' : 'img/apixaban.png', 
      	    'title' : 'Apixaban'
    	};

    vm.doacImages = [
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
    vm.anticoagulantType = null;
    vm.anticoagulantName = null;

    vm.onNext = onNext;
    vm.isNextButtonEnabled = isNextButtonEnabled;
    vm.anticoagulantTypeChanged = anticoagulantTypeChanged;
    vm.showViewDoacsPopup = showViewDoacsPopup;

    function onNext() {
        showDataValidationPopup(handleDataIsValid);
    }

    function anticoagulantTypeChanged() {
        vm.anticoagulantName = null;
    }

    function handleDataIsValid() {
        saveData();

        if (vm.anticoagulantType === "NONE") {
            goNextStateWhenNone();
        }
        else if (vm.anticoagulantType === "UNKNOWN") {
            showAnticoagulantUnknownPopup(goNextStateWhenVitkOrUnknown);
        }
        else if (vm.anticoagulantType === "VITK") {
            goNextStateWhenVitkOrUnknown();
        }
        else if (vm.anticoagulantType === "DOAC") {
            showAnticoagulantIsDoacPopup(goNextStateWhenDoac);
        }
     }

    function onNext() {
       showDataValidationPopup(handleDataIsValid);
    }

    function isNextButtonEnabled() {
        var isEnabled = false;

        if (vm.anticoagulantType != null) {
            if ( (vm.anticoagulantType === "UNKNOWN") ||
                 (vm.anticoagulantType === "NONE") ||
                 (vm.anticoagulantType == "VITK" && vm.anticoagulantName != null) ||
                 (vm.anticoagulantType == "DOAC" && vm.anticoagulantName != null) ) {
                isEnabled = true;
            }
        }

        return isEnabled;
    }

    function saveData() {
        PatientCacheService.setAnticoagulantType(vm.anticoagulantType);

        if (vm.anticoagulantType === "VITK" || vm.anticoagulantType === "DOAC") {
            PatientCacheService.setAntiCoagulantName(vm.anticoagulantName);
        }
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

    function showViewDoacsPopup() {
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/anticoagulant-identification/view-doacs-popup.html',
            title: 'ICH on DOAC',
            cssClass: 'chi-extra-wide-popup',
            scope: $scope
        };
        $ionicPopup.alert(popupTemplate);
    }

}
