'use strict';

angular.module('app.general').controller('PatientStartController', PatientStartController);

PatientStartController.$inject = ['$state', 'TabStateCacheService', 'PatientCacheService', 'BpManagementControllerrService'];

function PatientStartController($state, TabStateCacheService, PatientCacheService, BpManagementControllerrService) {
 
    var vm = this; // S17

    vm.onNewPatient = onNewPatient;

    function onNewPatient() {
        PatientCacheService.clearAll();//cjd need to decide when to clearAll as we might still have an ongoing patient here
        TabStateCacheService.clearAll();//cjd need to decide when to clearAll as we might still have an ongoing patient here
        BpManagementControllerrService.clearAll();//cjd need to decide when to clearAll as we might still have an ongoing patient here
        PatientCacheService.setAppStartDateTime(new Date());
        $state.go('register-patient');
    }
}
