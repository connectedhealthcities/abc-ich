'use strict';

angular.module('app.protocolA').config(DoacReversalAgentDetailsState);

DoacReversalAgentDetailsState.$inject = ['$stateProvider', '$urlRouterProvider'];

function DoacReversalAgentDetailsState($stateProvider, $urlRouterProvider) {

  $stateProvider.state('tabs.doac-reversal-agent-details', {
    url: '/doac-reversal-agent-details',
    views: {
      'tab-a': {
        templateUrl: 'modules/protocol-a/doac-reversal-agent-details/doac-reversal-agent-details.html',
        controller: 'DoacReversalAgentDetailsController',
        controllerAs: 'vm'
      }
    }
  });
}