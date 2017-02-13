'use strict';

angular.module('app.protocolA').controller('AdministerBeriplexController', AdministerBeriplexController);

AdministerBeriplexController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService', 'DateTimeService', 'GCS_THRESHOLD'];

function AdministerBeriplexController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService, DateTimeService, GCS_THRESHOLD) {

    var vm = this; // S11

    TabStateCacheService.setStateTabA('tabs.administer-beriplex');

    vm.actualBeriplexDose = PatientCacheService.getActualBeriplexDose();

    vm.beriplexDate = null;
    vm.beriplexTime = null;
    vm.vitkDate = null;
    vm.vitkTime = null;
    
    var isInfusionInstructionsViewed = false;

    vm.onNext = onNext;
    vm.isNextButtonEnabled = isNextButtonEnabled;
    vm.onViewInfusionInstructions = onViewInfusionInstructions;
    vm.onBeriplexNow = onBeriplexNow;
    vm.onVitkNow = onVitkNow;
    
    function onNext() {
        showDataValidationPopup(handleDataIsValid);
    }

    function handleDataIsValid() {
        saveData();

        if (PatientCacheService.getGcsScore() < GCS_THRESHOLD) {
            TabStateCacheService.goLatestStateTabC();
         }
        else {
            TabStateCacheService.goLatestStateTabB();
        }
    }

    function saveData() {
        var beriplexDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.beriplexDate, vm.beriplexTime);
        PatientCacheService.setBeriplexStartDateTime(beriplexDateTime);

        var vitkDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.vitkDate, vm.vitkTime);
        PatientCacheService.setVitaminkDateTime(vitkDateTime);

        PatientCacheService.setIsInfusionInstructionsViewed(isInfusionInstructionsViewed);
    }

    function isNextButtonEnabled() {

        var isEnabled = false;

        if (vm.beriplexDate != null &&
            vm.beriplexTime != null &&
            vm.vitkDate != null &&
            vm.vitkTime != null) {

            isEnabled = true;
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

 