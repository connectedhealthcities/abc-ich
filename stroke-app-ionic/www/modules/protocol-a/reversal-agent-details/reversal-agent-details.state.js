'use strict';

angular.module('app.protocolA').config(ReversalAgentDetailsState);

ReversalAgentDetailsState.$inject = ['$stateProvider', '$urlRouterProvider', 'STATE_REVERSAL_AGENT_DETAILS'];

function ReversalAgentDetailsState($stateProvider, $urlRouterProvider, STATE_REVERSAL_AGENT_DETAILS) {

  $stateProvider.state(STATE_REVERSAL_AGENT_DETAILS, {
    cache: false,
    url: '/reversal-agent-details',
    views: {
      'tab-a': {
        templateUrl: 'modules/protocol-a/reversal-agent-details/reversal-agent-details.html',
        controller: 'ReversalAgentDetailsController',
        controllerAs: 'vm'
      }
    }
  });
}