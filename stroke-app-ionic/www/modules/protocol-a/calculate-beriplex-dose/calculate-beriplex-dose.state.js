'use strict';

angular.module('app.protocolA').config(CalculateBeriplexDoseState);

CalculateBeriplexDoseState.$inject = ['$stateProvider', '$urlRouterProvider'];

function CalculateBeriplexDoseState($stateProvider, $urlRouterProvider) {

  $stateProvider.state('tabs.calculate-beriplex-dose', {
    url: '/calculate-beriplex-dose',
    views: {
      'tab-a': {
        templateUrl: 'modules/protocol-a/calculate-beriplex-dose/calculate-beriplex-dose.html',
        controller: 'CalculateBeriplexDoseController',
        controllerAs: 'vm'
      }
    }
  });
}
