'use strict';

angular.module('app.protocolA').controller('ConfirmBeriplexDoseController', ConfirmBeriplexDoseController);

ConfirmBeriplexDoseController.$inject = ['$state']; // , '$stateParams'

function ConfirmBeriplexDoseController($state) { // , $stateParams
 
    var vm = this; //S8

    vm.onNext = onNext;

    function onNext() {
        $state.go('tabs.administer-beriplex'); // S11
    }

// actualBeriplexDose	Integer
}
