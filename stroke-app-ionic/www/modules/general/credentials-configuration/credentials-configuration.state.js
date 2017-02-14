'use strict';

angular.module('app.general').config(CredentialsConfigurationController);

CredentialsConfigurationController.$inject = ['$stateProvider', '$urlRouterProvider'];

function CredentialsConfigurationController($stateProvider, $urlRouterProvider) {

    $stateProvider.state('credentials-configuration', {
        url: '/credentials-configuration',
    templateUrl: 'modules/general/credentials-configuration/credentials-configuration.html',
    controller: 'CredentialsConfigurationController',
    controllerAs: 'vm'
  });
}
