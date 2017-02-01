'use strict';

angular.module('app.protocolA').config(NeurosurgeryReferralSummaryState);

NeurosurgeryReferralSummaryState.$inject = ['$stateProvider', '$urlRouterProvider'];

function NeurosurgeryReferralSummaryState($stateProvider, $urlRouterProvider) {

  $stateProvider.state('tabs.neurosurgery-referral-summary', {
    url: '/neurosurgery-referral-summary',
    views: {
      'tab-c': {
        templateUrl: 'modules/protocol-c/neurosurgery-referral-summary/neurosurgery-referral-summary.html',
        controller: 'NeurosurgeryReferralSummaryController',
        controllerAs: 'vm'
      }
    }
  });
}
