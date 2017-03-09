'use strict';

angular.module('app.protocolA').config(CalculateBeriplexDoseState);

CalculateBeriplexDoseState.$inject = ['$stateProvider', '$urlRouterProvider', 'STATE_CALCULATE_BERIPLEX_DOSE'];

function CalculateBeriplexDoseState($stateProvider, $urlRouterProvider, STATE_CALCULATE_BERIPLEX_DOSE) {

  $stateProvider.state(STATE_CALCULATE_BERIPLEX_DOSE, {
    cache: false,
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
