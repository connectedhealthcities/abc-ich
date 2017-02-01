'use strict';

angular.module('app.general').controller('PatientStartController', PatientStartController);

PatientStartController.$inject = ['$state']; // , '$stateParams'

function PatientStartController($state) { // , $stateParams
 
    var vm = this; // S17

    vm.onNext = onNext;

    function onNext() {
        $state.go('register-patient-1'); // S1
    }

// appStartDateTime	ZonedDateTime
}
