'use strict';

angular.module('app.protocolA').controller('DoacReversalAgentDetailsController', DoacReversalAgentDetailsController);

DoacReversalAgentDetailsController.$inject = ['$state', 'PatientCacheService']; // , '$stateParams'

function DoacReversalAgentDetailsController($state, PatientCacheService) { // , $stateParams

    var vm = this; // S7

    vm.onNext = onNext;

    function onNext() {
 
        if (PatientCacheService.getGcsScore() < 9) {
            $state.go('tabs.mrs-entry'); // S5
        }
        else {
            $state.go('tabs.bp-management'); // S10
        }
    }

// doacReveralAgent	enum [None, idarucizumab, PCC]
// doacReveralAgentDateTime	ZonedDateTime
}
