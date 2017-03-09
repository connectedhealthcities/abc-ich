'use strict';

angular.module('app.protocolA').config(AdministerBeriplexState);

AdministerBeriplexState.$inject = ['$stateProvider', '$urlRouterProvider', 'STATE_ADMINISTER_BERIPLEX'];

function AdministerBeriplexState($stateProvider, $urlRouterProvider, STATE_ADMINISTER_BERIPLEX) {

  $stateProvider.state(STATE_ADMINISTER_BERIPLEX, {
    cache: false,
    url: '/administer-beriplex',
    views: {
      'tab-a': {
        templateUrl: 'modules/protocol-a/administer-beriplex/administer-beriplex.html',
        controller: 'AdministerBeriplexController',
        controllerAs: 'vm'
      }
    }
  });
}
