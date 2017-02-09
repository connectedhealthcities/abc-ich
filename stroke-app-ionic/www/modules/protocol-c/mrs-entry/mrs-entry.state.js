'use strict';

angular.module('app.protocolA').config(MrsEntryState);

MrsEntryState.$inject = ['$stateProvider', '$urlRouterProvider'];

function MrsEntryState($stateProvider, $urlRouterProvider) {

  $stateProvider.state('tabs.mrs-entry', {
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
