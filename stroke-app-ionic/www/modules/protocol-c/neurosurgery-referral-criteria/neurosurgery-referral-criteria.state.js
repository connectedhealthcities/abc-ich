'use strict';

angular.module('app.protocolA').config(NeurosurgeryReferralCriteriaState);

NeurosurgeryReferralCriteriaState.$inject = ['$stateProvider', '$urlRouterProvider', 'STATE_NEUROSURGERY_REFERRAL_CRITERIA'];

function NeurosurgeryReferralCriteriaState($stateProvider, $urlRouterProvider, STATE_NEUROSURGERY_REFERRAL_CRITERIA) {

  $stateProvider.state(STATE_NEUROSURGERY_REFERRAL_CRITERIA, {
    cache: false,
    url: '/neurosurgery-referral-criteria',
    views: {
      'tab-c': {
        templateUrl: 'modules/protocol-c/neurosurgery-referral-criteria/neurosurgery-referral-criteria.html',
        controller: 'NeurosurgeryReferralCriteriaController',
        controllerAs: 'vm'
      }
    }
  });
}
