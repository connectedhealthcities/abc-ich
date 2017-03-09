'use strict';

angular.module('app.general').config(UserCredentialsConfigurationState);

UserCredentialsConfigurationState.$inject = ['$stateProvider', '$urlRouterProvider', 'STATE_USER_CREDENTIALS_CONFIGURATION'];

function UserCredentialsConfigurationState($stateProvider, $urlRouterProvider, STATE_USER_CREDENTIALS_CONFIGURATION) {

    $stateProvider.state(STATE_USER_CREDENTIALS_CONFIGURATION, {
        cache: false,
        url: '/user-credentials-configuration',
        templateUrl: 'modules/general/user-credentials-configuration/user-credentials-configuration.html',
        controller: 'UserCredentialsConfigurationController',
        controllerAs: 'vm'
  });
}
