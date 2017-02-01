'use strict';

angular.module('app.protocolB').controller('BpManagementController', BpManagementController);

BpManagementController.$inject = ['$state', 'PatientCacheService']; // , '$stateParams'

function BpManagementController($state, PatientCacheService) { // , $stateParams
 
    var vm = this; // S10
    vm.onNext = onNext;

    function onNext() {

        if (PatientCacheService.getBpTargetReachedDateTime() != null) {
            if (PatientCacheService.getGcsScore() < 9) {
                $state.go('patient-end'); // S14
            }
            else {
                $state.go('tabs.mrs-entry'); // S5
            }
        }
        else {
            $state.go('tabs.critical-care-referral'); // S4
        }

    }

// bpTargetReachedDateTime	ZonedDateTime
// bpTreatmentThreshold	Integer
// bpTarget	Integer
// collection of BP Measurement entries
}
