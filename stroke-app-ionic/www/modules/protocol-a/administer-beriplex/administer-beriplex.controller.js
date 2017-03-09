'use strict';

angular.module('app.protocolA').controller('AdministerBeriplexController', AdministerBeriplexController);

AdministerBeriplexController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'DateTimeService', 'GCS_THRESHOLD', 'DemoModeCacheService', 'STATE_ADMINISTER_BERIPLEX'];

function AdministerBeriplexController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, DateTimeService, GCS_THRESHOLD, DemoModeCacheService, STATE_ADMINISTER_BERIPLEX) {

    var vm = this; // S11

    TabStateCacheService.setCurrentState(STATE_ADMINISTER_BERIPLEX);
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

    vm.actualBeriplexDose = PatientCacheService.getActualBeriplexDose();

    vm.isBeriplexAdministered = PatientCacheService.getIsBeriplexAdministered();
    vm.beriplexDate = PatientCacheService.getBeriplexStartDateTime();
    vm.beriplexTime = PatientCacheService.getBeriplexStartDateTime();
    vm.isVitkAdministered = PatientCacheService.getIsVitaminkAdministered();
    vm.vitkDate = PatientCacheService.getVitaminkDateTime();
    vm.vitkTime = PatientCacheService.getVitaminkDateTime();
    
    var isInfusionInstructionsViewed = false;

    vm.onNext = onNext;
    vm.isNextButtonEnabled = isNextButtonEnabled;
    vm.onViewInfusionInstructions = onViewInfusionInstructions;
    vm.onBeriplexNow = onBeriplexNow;
    vm.onVitkNow = onVitkNow;
    vm.isBeriplexAdministeredChanged = isBeriplexAdministeredChanged;
    vm.isVitkAdministeredChanged = isVitkAdministeredChanged;
    
    function onNext() {
        showDataValidationPopup(handleDataValid);
    }

    function handleDataValid() {
        saveData();

        if (PatientCacheService.getGcsScore() < GCS_THRESHOLD) {
            TabStateCacheService.goLatestStateTabC();
         }
        else {
            TabStateCacheService.goLatestStateTabB();
        }
    }

    function saveData() {
        PatientCacheService.setIsBeriplexAdministered(vm.isBeriplexAdministered);
        if(vm.isBeriplexAdministered) {
            var beriplexDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.beriplexDate, vm.beriplexTime);
            PatientCacheService.setBeriplexStartDateTime(beriplexDateTime);
        }
        else {
            PatientCacheService.setBeriplexStartDateTime(null);
        }

        PatientCacheService.setIsVitaminkAdministered(vm.isVitkAdministered);
        if(vm.isVitkAdministered) {
            var vitkDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.vitkDate, vm.vitkTime);
            PatientCacheService.setVitaminkDateTime(vitkDateTime);
        }
        else {
            PatientCacheService.setVitaminkDateTime(null);
        }

        PatientCacheService.setIsInfusionInstructionsViewed(isInfusionInstructionsViewed);
    }

    function isNextButtonEnabled() {

        var isEnabled = false;

        if (vm.isBeriplexAdministered != null &&
            !vm.isBeriplexAdministered &&
            vm.isVitkAdministered != null &&
            !vm.isVitkAdministered) {
            isEnabled = true;
        }
        else if (vm.isBeriplexAdministered != null &&
            vm.isBeriplexAdministered &&
            vm.isVitkAdministered != null &&
            !vm.isVitkAdministered) {
            if (vm.beriplexDate != null &&
                vm.beriplexTime != null) {
                isEnabled = true;
            }
        }
        else if (vm.isBeriplexAdministered != null &&
            !vm.isBeriplexAdministered &&
            vm.isVitkAdministered != null &&
            vm.isVitkAdministered) {
            if (vm.vitkDate != null &&
                vm.vitkTime != null) {
                isEnabled = true;
            }
        }
        else {
            if (vm.beriplexDate != null &&
                vm.beriplexTime != null &&
                vm.vitkDate != null &&
                vm.vitkTime != null) {
                isEnabled = true;
            }
        }

        return isEnabled;
    }

    function onViewInfusionInstructions() {
        isInfusionInstructionsViewed = true;
        showInfusionInstructionsPopup(function(){});
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

    function isBeriplexAdministeredChanged() {
        vm.beriplexDate = null;
        vm.beriplexTime = null;
    }

    function isVitkAdministeredChanged() {
        vm.vitkDate = null;
        vm.vitkTime = null;
    }

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

    function showInfusionInstructionsPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-a/administer-beriplex/infusion-instructions-popup.html',
            title: 'How to draw up Beriplex',
            cssClass: 'chi-extra-wide-popup'
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(okHandler);
    }
}

 