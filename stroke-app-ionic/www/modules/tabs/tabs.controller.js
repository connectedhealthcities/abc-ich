'use strict';

angular.module('app').controller('TabsController', TabsController);

TabsController.$inject = ['$state', 'TabStateCacheService'];

function TabsController($state, TabStateCacheService) {

    var vm = this;

    vm.aTabClicked = aTabClicked;
    vm.bTabClicked = bTabClicked;
    vm.cTabClicked = cTabClicked;

    function aTabClicked() {
        var state = TabStateCacheService.getStateTabA();
        $state.go(state);
    }

    function bTabClicked() {
        var state = TabStateCacheService.getStateTabB();
        $state.go(state);
    }

    function cTabClicked() {
        var state = TabStateCacheService.getStateTabC();
        $state.go(state);
    }    
}
