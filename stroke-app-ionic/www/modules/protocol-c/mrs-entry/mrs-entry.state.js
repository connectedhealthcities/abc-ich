'use strict';

angular.module('app.protocolA').config(MrsEntryState);

MrsEntryState.$inject = ['$stateProvider', '$urlRouterProvider', 'STATE_MRS_ENTRY'];

function MrsEntryState($stateProvider, $urlRouterProvider, STATE_MRS_ENTRY) {

  $stateProvider.state(STATE_MRS_ENTRY, {
    cache: false,
    url: '/mrs-entry',
    views: {
      'tab-c': {
        templateUrl: 'modules/protocol-c/mrs-entry/mrs-entry.html',
        controller: 'MrsEntryController',
        controllerAs: 'vm'
      }
    }
  });
}
