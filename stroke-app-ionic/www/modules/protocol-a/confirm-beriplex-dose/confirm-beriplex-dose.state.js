'use strict';

angular.module('app.protocolA').config(ConfirmBeriplexDoseState);

ConfirmBeriplexDoseState.$inject = ['$stateProvider', '$urlRouterProvider'];

function ConfirmBeriplexDoseState($stateProvider, $urlRouterProvider) {

  $stateProvider.state('tabs.confirm-beriplex-dose', {
    cache: false,
    url: '/confirm-beriplex-dose',
    views: {
      'tab-a': {
        templateUrl: 'modules/protocol-a/confirm-beriplex-dose/confirm-beriplex-dose.html',
        controller: 'ConfirmBeriplexDoseController',
        controllerAs: 'vm'
      }
    }
  });
}
