'use strict';

angular.module('app.protocolC').controller('NeurosurgeryReferralSummaryController', NeurosurgeryReferralSummaryController);

NeurosurgeryReferralSummaryController.$inject = ['$state', 'PatientCacheService', 'TabStateCacheService'];

function NeurosurgeryReferralSummaryController($state, PatientCacheService, TabStateCacheService) {

    var vm = this; // S13

    TabStateCacheService.setStateTabC('tabs.neurosurgery-referral-summary');

    vm.onNext = onNext;

    function onNext() {
 
        if (PatientCacheService.getGcsScore() < 9) {
            var state = TabStateCacheService.getStateTabB();
            $state.go(state);
        }
        else {
            $state.go('patient-end');
        }
   }
}
