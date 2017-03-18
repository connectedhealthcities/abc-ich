'use strict';

angular.module('app').controller('TabsController', TabsController);

TabsController.$inject = ['$state', 'StateCacheService', 'STATE_BP_MANAGEMENT'];

function TabsController($state, StateCacheService, STATE_BP_MANAGEMENT) {

    var vm = this;

    vm.aTabClicked = aTabClicked;
    vm.bTabClicked = bTabClicked;
    vm.cTabClicked = cTabClicked;

    function aTabClicked() {
        StateCacheService.goLatestStateTabA()
    }

    function bTabClicked() {
        $state.go(STATE_BP_MANAGEMENT);
    }

    function cTabClicked() {
        StateCacheService.goLatestStateTabC()
    }    
}
