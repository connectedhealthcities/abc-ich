'use strict';

angular.module('app.protocolA').config(NeurosurgeryReferralSummaryState);

NeurosurgeryReferralSummaryState.$inject = ['$stateProvider', '$urlRouterProvider', 'STATE_NEUROSURGERY_REFERRAL_SUMMARY'];

function NeurosurgeryReferralSummaryState($stateProvider, $urlRouterProvider, STATE_NEUROSURGERY_REFERRAL_SUMMARY) {

  $stateProvider.state(STATE_NEUROSURGERY_REFERRAL_SUMMARY, {
    cache: false,
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
