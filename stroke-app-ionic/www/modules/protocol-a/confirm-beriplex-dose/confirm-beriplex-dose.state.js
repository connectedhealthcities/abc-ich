'use strict';

angular.module('app.protocolA').config(ConfirmBeriplexDoseState);

ConfirmBeriplexDoseState.$inject = ['$stateProvider', '$urlRouterProvider', 'STATE_CONFIRM_BERIPLEX_DOSE'];

function ConfirmBeriplexDoseState($stateProvider, $urlRouterProvider, STATE_CONFIRM_BERIPLEX_DOSE) {

  $stateProvider.state(STATE_CONFIRM_BERIPLEX_DOSE, {
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
