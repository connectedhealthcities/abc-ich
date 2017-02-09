'use strict';

angular.module('app.protocolA').config(NeurosurgeryReferralCriteriaState);

NeurosurgeryReferralCriteriaState.$inject = ['$stateProvider', '$urlRouterProvider'];

function NeurosurgeryReferralCriteriaState($stateProvider, $urlRouterProvider) {

  $stateProvider.state('tabs.neurosurgery-referral-criteria', {
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
