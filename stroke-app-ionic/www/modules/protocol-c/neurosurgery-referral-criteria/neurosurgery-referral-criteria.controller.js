'use strict';

angular.module('app.protocolC').controller('NeurosurgeryReferralCriteriaController', NeurosurgeryReferralCriteriaController);

NeurosurgeryReferralCriteriaController.$inject = ['$state', 'PatientCacheService', 'TabStateCacheService'];

function NeurosurgeryReferralCriteriaController($state, PatientCacheService, TabStateCacheService) {

    var vm = this; // S12

    TabStateCacheService.setStateTabC('tabs.neurosurgery-referral-criteria');

    vm.onNext = onNext;

    function onNext() {

        if (isNeuroReferralNotRequired()) {
            $state.go('patient-end');
        }
        else {
            $state.go('tabs.neurosurgery-referral-summary');
        }
    }

    function isNeuroReferralNotRequired() {

        var isNeuroReferrelNotRequired = false;

        if (   PatientCacheService.getGcsScore() >= 9 
            && PatientCacheService.getIchVolume() <= 30 
            && !PatientCacheService.getIsPosteriorFossaIch()
            && !PatientCacheService.getIsVentricleObstructed()) {

             isNeuroReferrelNotRequired = true;   
        }

        return isNeuroReferrelNotRequired;
    }
}
