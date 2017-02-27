'use strict';

angular.module('app.protocolC').controller('MrsEntryController', MrsEntryController);

MrsEntryController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'TabStateCacheService'];

function MrsEntryController($scope, $state, $ionicPopup, PatientCacheService, TabStateCacheService) {
 
    var vm = this; // S5

    TabStateCacheService.setCurrentState('tabs.mrs-entry');
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = PatientCacheService.getIsDemoMode();

    vm.mrs = null;

    vm.onNext = onNext;
    vm.isNextButtonEnabled = isNextButtonEnabled;

    function onNext() {
        showDataValidationPopup(handleDataValid); 
    }

    function handleDataValid() {
        saveData();

        $state.go('tabs.neurosurgery-referral-criteria');
     }

    function saveData() {
        PatientCacheService.setPremorbidMrsScore(vm.mrs);
     }

     function isNextButtonEnabled() {
          return vm.mrs != null;
     }

     function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/protocol-c/mrs-entry/mrs-entry-data-validation-popup.html',
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
}

