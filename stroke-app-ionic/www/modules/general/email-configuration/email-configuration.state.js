'use strict';

angular.module('app.general').config(EmailConfigurationState);

EmailConfigurationState.$inject = ['$stateProvider', '$urlRouterProvider', 'STATE_EMAIL_CONFIGURATION'];

function EmailConfigurationState($stateProvider, $urlRouterProvider, STATE_EMAIL_CONFIGURATION) {

  $stateProvider.state(STATE_EMAIL_CONFIGURATION, {
    cache: false,
    url: '/email-configuration',
    templateUrl: 'modules/general/email-configuration/email-configuration.html',
    controller: 'EmailConfigurationController',
    controllerAs: 'vm'
  });
}
