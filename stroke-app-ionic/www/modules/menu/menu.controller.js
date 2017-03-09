'use strict';

angular.module('app').controller('MenuController', MenuController);

MenuController.$inject = ['$scope', '$state', 'PatientCacheService', 'BpStateCacheService', 'TabStateCacheService', 'DemoModeCacheService', 'STATE_USER_CREDENTIALS_CONFIGURATION', 'STATE_EMAIL_CONFIGURATION', 'STATE_REGISTER_PATIENT'];

function MenuController($scope, $state, PatientCacheService, BpStateCacheService, TabStateCacheService, DemoModeCacheService, STATE_USER_CREDENTIALS_CONFIGURATION, STATE_EMAIL_CONFIGURATION, STATE_REGISTER_PATIENT) {

    $scope.onUserCredentialsConfiguration = onUserCredentialsConfiguration;
    $scope.onEmailConfiguration = onEmailConfiguration;
    $scope.onDemoMode = onDemoMode;

    function onUserCredentialsConfiguration() {
        $state.go(STATE_USER_CREDENTIALS_CONFIGURATION);
    }

    function onEmailConfiguration() {
        $state.go(STATE_EMAIL_CONFIGURATION);
    }

    function onDemoMode() {

        // Set Demo Mode before clearing so that we clear demo mode data, not real patient data
        DemoModeCacheService.setIsDemoMode(true);
        
        BpStateCacheService.clearAll();
        TabStateCacheService.clearAll();
        PatientCacheService.clearAll();


        $state.go(STATE_REGISTER_PATIENT);
    }
}
