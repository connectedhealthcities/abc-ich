'use strict';

angular.module('app.protocolA').config(BpManagementState);

BpManagementState.$inject = ['$stateProvider', '$urlRouterProvider', 'STATE_BP_MANAGEMENT'];

function BpManagementState($stateProvider, $urlRouterProvider, STATE_BP_MANAGEMENT) {

  $stateProvider.state(STATE_BP_MANAGEMENT, {
    cache: false,
    url: '/bp-management',
    views: {
      'tab-b': {
        templateUrl: 'modules/protocol-b/bp-management/bp-management.html',
        controller: 'BpManagementController',
        controllerAs: 'vm'
      }
    }
  });
}
