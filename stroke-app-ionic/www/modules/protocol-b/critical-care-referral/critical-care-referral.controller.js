'use strict';

angular.module('app.protocolB') .controller('CriticalCareReferralController', CriticalCareReferralController);

CriticalCareReferralController.$inject = ['$state', 'PatientCacheService', 'TabStateCacheService'];

function CriticalCareReferralController($state, PatientCacheService, TabStateCacheService) {
 
    var vm = this; // S4

    TabStateCacheService.setStateTabB('tabs.critical-care-referral');

    vm.onNext = onNext;

    function onNext() {

        if (PatientCacheService.getGcsScore() < 9) {
            $state.go('patient-end');
        }
        else {
            var state = TabStateCacheService.getStateTabC();
            $state.go(state);
        }

    }
}
