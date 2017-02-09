'use strict';

angular.module('app.protocolA').controller('AdministerBeriplexController', AdministerBeriplexController);

AdministerBeriplexController.$inject = ['$state', 'PatientCacheService', 'TabStateCacheService'];

function AdministerBeriplexController($state, PatientCacheService, TabStateCacheService) {

    var vm = this; // S11

    TabStateCacheService.setStateTabA('tabs.administer-beriplex');

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

 