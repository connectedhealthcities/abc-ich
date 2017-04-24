'use strict';

angular.module('app').controller('MenuController', MenuController);

MenuController.$inject = ['$scope', '$state', 'PatientCacheService', 'BpStateCacheService', 'StateCacheService', 'DemoModeCacheService', 'STATE_ABOUT', 'STATE_USER_CREDENTIALS_CONFIGURATION', 'STATE_REGISTER_PATIENT'];

function MenuController($scope, $state, PatientCacheService, BpStateCacheService, StateCacheService, DemoModeCacheService, STATE_ABOUT, STATE_USER_CREDENTIALS_CONFIGURATION, STATE_REGISTER_PATIENT) {

    $scope.onUserCredentialsConfiguration = onUserCredentialsConfiguration;
    $scope.onAbout = onAbout;
    $scope.onDemoMode = onDemoMode;

    function onUserCredentialsConfiguration() {
        $state.go(STATE_USER_CREDENTIALS_CONFIGURATION);
    }

    function onAbout() {
        $state.go(STATE_ABOUT);
    }


    function onDemoMode() {

        // Set Demo Mode before clearing so that we clear demo mode data, not real patient data
        DemoModeCacheService.setIsDemoMode(true);
        
        BpStateCacheService.clearAll();
        StateCacheService.clearAll();
        PatientCacheService.clearAll();


        $state.go(STATE_REGISTER_PATIENT);
    }
}
