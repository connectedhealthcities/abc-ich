'use strict';

angular.module('app.protocolA').config(CriticalCareReferralState);

CriticalCareReferralState.$inject = ['$stateProvider', '$urlRouterProvider', 'STATE_CRITICAL_CARE_REFERRAL'];

function CriticalCareReferralState($stateProvider, $urlRouterProvider, STATE_CRITICAL_CARE_REFERRAL) {

  $stateProvider.state(STATE_CRITICAL_CARE_REFERRAL, {
    cache: false,
    url: '/critical-care-referral',
    views: {
      'tab-b': {
        templateUrl: 'modules/protocol-b/critical-care-referral/critical-care-referral.html',
        controller: 'CriticalCareReferralController',
        controllerAs: 'vm'
      }
    }
  });
}
