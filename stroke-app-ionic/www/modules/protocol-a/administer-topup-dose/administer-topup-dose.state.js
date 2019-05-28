'use strict';

angular.module('app.protocolA').config(AdministerTopupDoseState);

AdministerTopupDoseState.$inject = ['$stateProvider', '$urlRouterProvider', 'STATE_ADMINISTER_TOPUP_DOSE'];

function AdministerTopupDoseState($stateProvider, $urlRouterProvider, STATE_ADMINISTER_TOPUP_DOSE) {

  $stateProvider.state(STATE_ADMINISTER_TOPUP_DOSE, {
    cache: false,
    url: '/administer-topup-dose',
    views: {
      'tab-a': {
        templateUrl: 'modules/protocol-a/administer-topup-dose/administer-topup-dose.html',
        controller: 'AdministerTopupDoseController',
        controllerAs: 'vm'
      }
    }
  });
}
