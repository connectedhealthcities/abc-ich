'use strict';

angular.module('app.protocolA').controller('AdministerBeriplexController', AdministerBeriplexController);

AdministerBeriplexController.$inject = ['$state', 'PatientCacheService']; // , '$stateParams'

function AdministerBeriplexController($state, PatientCacheService) { // , $stateParams

    var vm = this; // S11

    vm.onNext = onNext;

    function onNext() {

        if (PatientCacheService.getGcsScore() < 9) {
            $state.go('tabs.mrs-entry'); // S5
        }
        else {
            $state.go('tabs.bp-management'); // S10
        }
    }

// beriplexStartDateTime	ZonedDateTime
// vitaminkDateTime	ZonedDateTime
// beriplexAdministered	Boolean
// vitaminkAdministered	Boolean
// infusionInstructionsViewed	Boolean
}

 