'use strict';

angular.module('app.protocolB').controller('BpManagementController', BpManagementController);

BpManagementController.$inject = ['$state', 'PatientCacheService', 'TabStateCacheService'];

function BpManagementController($state, PatientCacheService, TabStateCacheService) {
 
    var vm = this; // S10
    vm.onNext = onNext;

    function onNext() {

        if (PatientCacheService.getBpTargetReachedDateTime() != null) {
            if (PatientCacheService.getGcsScore() < 9) {
                $state.go('patient-end');
            }
            else {
                var state = TabStateCacheService.getStateTabC();
                $state.go(state);
            }
        }
        else {
            TabStateCacheService.setStateTabB('tabs.critical-care-referral');
            $state.go('tabs.critical-care-referral');
        }

    }
}
