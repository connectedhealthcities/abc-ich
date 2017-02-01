'use strict';

angular.module('app.protocolB') .controller('CriticalCareReferralController', CriticalCareReferralController);

CriticalCareReferralController.$inject = ['$state', 'PatientCacheService']; // , '$stateParams'

function CriticalCareReferralController($state, PatientCacheService) { // , $stateParams
 
    var vm = this; // S4

    vm.onNext = onNext;

    function onNext() {

        if (PatientCacheService.getGcsScore() < 9) {
            $state.go('patient-end'); // S14
        }
        else {
            $state.go('tabs.mrs-entry'); // S5
        }

    }

// destination	enum Destination [ICU,HDU,NEUROSURGERY,STROKEWARD,OTHER]
// otherDestination	String
}
