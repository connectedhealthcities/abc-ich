'use strict';

angular.module('app').controller('MenuController', MenuController);

MenuController.$inject = ['$scope', '$state', 'PatientCacheService', 'BpStateCacheService', 'TabStateCacheService', 'DemoModeCacheService'];

function MenuController($scope, $state, PatientCacheService, BpStateCacheService, TabStateCacheService, DemoModeCacheService) {

    $scope.onDemoMode = onDemoMode;

    function onDemoMode() {

        // Set Demo Mode before clearing so that we clear demo mode data, not real patient data
        DemoModeCacheService.setIsDemoMode(true);
        
        BpStateCacheService.clearAll();
        TabStateCacheService.clearAll();
        PatientCacheService.clearAll();


        $state.go("register-patient");
    }
}
