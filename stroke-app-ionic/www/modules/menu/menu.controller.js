'use strict';

angular.module('app').controller('MenuController', MenuController);

MenuController.$inject = ['$scope', '$state', 'PatientCacheService', 'BpStateCacheService', 'TabStateCacheService'];

function MenuController($scope, $state, PatientCacheService, BpStateCacheService, TabStateCacheService) {

    $scope.onDemoMode = onDemoMode;

    function onDemoMode() {
        PatientCacheService.setIsDemoMode(true);
        
        PatientCacheService.clearAll();
        BpStateCacheService.clearAll();
        TabStateCacheService.clearAll();

        $state.go("register-patient");
    }
}
