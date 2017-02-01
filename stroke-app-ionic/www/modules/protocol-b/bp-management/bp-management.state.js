'use strict';

angular.module('app.protocolA').config(BpManagementState);

BpManagementState.$inject = ['$stateProvider', '$urlRouterProvider'];

function BpManagementState($stateProvider, $urlRouterProvider) {

  $stateProvider.state('tabs.bp-management', {
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
