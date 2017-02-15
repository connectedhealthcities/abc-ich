'use strict';

angular.module('app.general').config(UserCredentialsConfigurationState);

UserCredentialsConfigurationState.$inject = ['$stateProvider', '$urlRouterProvider'];

function UserCredentialsConfigurationState($stateProvider, $urlRouterProvider) {

    $stateProvider.state('user-credentials-configuration', {
        cache: false,
        url: '/user-credentials-configuration',
        templateUrl: 'modules/general/user-credentials-configuration/user-credentials-configuration.html',
        controller: 'UserCredentialsConfigurationController',
        controllerAs: 'vm'
  });
}
