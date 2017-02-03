'use strict';

angular.module('app.protocolA').controller('ConfirmBeriplexDoseController', ConfirmBeriplexDoseController);

ConfirmBeriplexDoseController.$inject = ['$state', 'TabStateCacheService'];

function ConfirmBeriplexDoseController($state, TabStateCacheService) {
 
    var vm = this; //S8

    vm.onNext = onNext;

    function onNext() {
        TabStateCacheService.setStateTabA('tabs.administer-beriplex');
        $state.go('tabs.administer-beriplex');
    }
}
