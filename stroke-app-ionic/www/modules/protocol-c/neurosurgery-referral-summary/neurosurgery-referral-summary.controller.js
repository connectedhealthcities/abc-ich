'use strict';

angular.module('app.protocolC').controller('NeurosurgeryReferralSummaryController', NeurosurgeryReferralSummaryController);

NeurosurgeryReferralSummaryController.$inject = ['$state', 'PatientCacheService']; // , '$stateParams'

function NeurosurgeryReferralSummaryController($state, PatientCacheService) { // , $stateParams

    var vm = this; // S13

    vm.onNext = onNext;

    function onNext() {
 
        if (PatientCacheService.getGcsScore() < 9) {
            $state.go('tabs.bp-management'); // S10
        }
        else {
            $state.go('patient-end'); // S14
        }
   }

// referredToNeurosurgery	Boolean
// referralToNeurosurgeryDateTime	ZonedDateTime
// neurosurgeonName	String
// referralToNeurosurgeryAccepted	Boolean
// forActiveTreatment	Boolean
}
