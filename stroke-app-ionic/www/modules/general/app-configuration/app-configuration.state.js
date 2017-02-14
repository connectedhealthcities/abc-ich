'use strict';

angular.module('app.general').config(AppConfigurationController);

AppConfigurationController.$inject = ['$stateProvider', '$urlRouterProvider'];

function AppConfigurationController($stateProvider, $urlRouterProvider) {

  $stateProvider.state('app-configuration', {
    url: '/app-configuration',
    templateUrl: 'modules/general/app-configuration/app-configuration.html',
    controller: 'AppConfigurationController',
    controllerAs: 'vm'
  });
}
