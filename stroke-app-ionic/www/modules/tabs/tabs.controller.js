'use strict';

angular.module('app').controller('TabsController', TabsController);

TabsController.$inject = ['$state', 'TabStateCacheService'];

function TabsController($state, TabStateCacheService) {

    var vm = this;

    vm.aTabClicked = aTabClicked;
    vm.bTabClicked = bTabClicked;
    vm.cTabClicked = cTabClicked;

    function aTabClicked() {
        TabStateCacheService.goLatestStateTabA()
    }

    function bTabClicked() {
        TabStateCacheService.goLatestStateTabB()
    }

    function cTabClicked() {
        TabStateCacheService.goLatestStateTabC()
    }    
}
