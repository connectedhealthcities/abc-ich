'use strict';

angular.module('app.general').controller('PatientStartController', PatientStartController);

PatientStartController.$inject = ['$state', 'TabStateCacheService'];

function PatientStartController($state, TabStateCacheService) {
 
    var vm = this; // S17

    vm.onNewPatient = onNewPatient;

    function onNewPatient() {
        TabStateCacheService.clearAll();
        $state.go('register-patient');
    }

// appStartDateTime	ZonedDateTime
}
