'use strict';

angular.module('app.protocolA').config(AdministerBeriplexState);

AdministerBeriplexState.$inject = ['$stateProvider', '$urlRouterProvider'];

function AdministerBeriplexState($stateProvider, $urlRouterProvider) {

  $stateProvider.state('tabs.administer-beriplex', {
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
