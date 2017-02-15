'use strict';

angular.module('app.general').config(EmailConfigurationState);

EmailConfigurationState.$inject = ['$stateProvider', '$urlRouterProvider'];

function EmailConfigurationState($stateProvider, $urlRouterProvider) {

  $stateProvider.state('email-configuration', {
    cache: false,
    url: '/email-configuration',
    templateUrl: 'modules/general/email-configuration/email-configuration.html',
    controller: 'EmailConfigurationController',
    controllerAs: 'vm'
  });
}
