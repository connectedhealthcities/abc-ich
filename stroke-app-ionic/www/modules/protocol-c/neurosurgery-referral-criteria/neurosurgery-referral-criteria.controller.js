'use strict';

angular.module('app.protocolC').controller('NeurosurgeryReferralCriteriaController', NeurosurgeryReferralCriteriaController);

NeurosurgeryReferralCriteriaController.$inject = ['$state', 'PatientCacheService']; // , '$stateParams'

function NeurosurgeryReferralCriteriaController($state, PatientCacheService) { // , $stateParams

    var vm = this; // S12

    vm.onNext = onNext;

    function onNext() {

        if (isNeuroReferralNotRequired()) {
            $state.go('patient-end'); // S14
        }
        else {
            $state.go('tabs.neurosurgery-referral-summary'); // S13
        }
    }

    function isNeuroReferralNotRequired() {

        var isNeuroReferrelNotRequired = false;

        if (   PatientCacheService.getGcsScore() >= 9 
            && PatientCacheService.getIchVolume() <= 30 
            && !PatientCacheService.getPosteriorFossaIch()
            && !PatientCacheService.getVentricleObstructed()) {

             isNeuroReferrelNotRequired = true;   
        }

        return isNeuroReferrelNotRequired;
    }

// ichVolume	Float
// posteriorFossaIch	Boolean
// ventricleObstructed	Boolean
}
