'use strict';

angular.module('app.protocolC').controller('MrsEntryController', MrsEntryController);

MrsEntryController.$inject = ['$scope', '$state', '$ionicPopup', 'PatientCacheService', 'StateCacheService', 'DemoModeCacheService', 'STATE_MRS_ENTRY', 'STATE_NEUROSURGERY_REFERRAL_CRITERIA'];

function MrsEntryController($scope, $state, $ionicPopup, PatientCacheService, StateCacheService, DemoModeCacheService, STATE_MRS_ENTRY, STATE_NEUROSURGERY_REFERRAL_CRITERIA) {
 
    var vm = this; // S5

    StateCacheService.setCurrentState(STATE_MRS_ENTRY);
    vm.patientId = PatientCacheService.getUniqueId();
    vm.isDemoMode = DemoModeCacheService.getIsDemoMode();

    vm.mrs = null;

    vm.onNext = onNext;
    vm.isNextButtonEnabled = isNextButtonEnabled;

    function onNext() {
        showDataValidationPopup(handleDataValid); 
    }

    function handleDataValid() {
        saveData();

        $state.go(STATE_NEUROSURGERY_REFERRAL_CRITERIA);
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

