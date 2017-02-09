'use strict';

angular.module('app.general').controller('PatientStartController', PatientStartController);

PatientStartController.$inject = ['$state', 'TabStateCacheService', 'PatientCacheService'];

function PatientStartController($state, TabStateCacheService, PatientCacheService) {
 
    var vm = this; // S17

    vm.onNewPatient = onNewPatient;

    function onNewPatient() {
        PatientCacheService.clearAll();
        TabStateCacheService.clearAll();
        PatientCacheService.setAppStartDateTime(new Date());
        $state.go('register-patient');
    }
}
