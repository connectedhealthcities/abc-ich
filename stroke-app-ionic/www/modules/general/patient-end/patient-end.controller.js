'use strict';

angular.module('app.general').controller('PatientEndController', PatientEndController);

PatientEndController.$inject = ['$state', 'TabStateCacheService', 'PatientCacheService', 'BpStateCacheService'];

function PatientEndController($state, TabStateCacheService, PatientCacheService, BpStateCacheService) {
 
    var vm = this; // S14

    TabStateCacheService.setCurrentState('patient-end');
    vm.patientId = PatientCacheService.getUniqueId();
    
    vm.onFinish = onFinish;

    function onFinish() {
        //cjd ToDo - send data to server
        
        PatientCacheService.clearAll();
        TabStateCacheService.clearAll();
        BpStateCacheService.clearAll();

        $state.go('patient-start');
    }

}
