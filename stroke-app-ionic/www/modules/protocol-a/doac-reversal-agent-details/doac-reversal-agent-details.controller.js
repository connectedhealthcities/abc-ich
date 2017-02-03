'use strict';

angular.module('app.protocolA').controller('DoacReversalAgentDetailsController', DoacReversalAgentDetailsController);

DoacReversalAgentDetailsController.$inject = ['$state', 'PatientCacheService', 'TabStateCacheService'];

function DoacReversalAgentDetailsController($state, PatientCacheService, TabStateCacheService) {

    var vm = this; // S7

    vm.onNext = onNext;

    function onNext() {
 
        if (PatientCacheService.getGcsScore() < 9) {
            var state = TabStateCacheService.getStateTabC();
            $state.go(state);
        }
        else {
            var state = TabStateCacheService.getStateTabB();
            $state.go(state);
        }
    }
}
