'use strict';

angular.module('app').controller('MenuController', MenuController);

MenuController.$inject = ['$scope', '$state', 'PatientCacheService', 'BpStateCacheService', 'TabStateCacheService'];

function MenuController($scope, $state, PatientCacheService, BpStateCacheService, TabStateCacheService) {

    $scope.onDemoMode = onDemoMode;

    function onDemoMode() {
        // Set Demo Mode here so that we clear demo mode data, not real patient data
        PatientCacheService.setIsDemoMode(true);
        
        BpStateCacheService.clearAll();
        TabStateCacheService.clearAll();
        // This must be cleared last
        PatientCacheService.clearAll();

        // Clear all also clears the Demo mode flag.
        // So it it here again
        PatientCacheService.setIsDemoMode(true);

        $state.go("register-patient");
    }
}
