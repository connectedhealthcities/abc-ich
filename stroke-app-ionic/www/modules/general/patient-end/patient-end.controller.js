'use strict';

angular.module('app.general').controller('PatientEndController', PatientEndController);

PatientEndController.$inject = ['$state'];

function PatientEndController($state) {
 
    var vm = this; // S14
    vm.onFinish = onFinish;

    function onFinish() {
        $state.go('patient-start');
    }

}
