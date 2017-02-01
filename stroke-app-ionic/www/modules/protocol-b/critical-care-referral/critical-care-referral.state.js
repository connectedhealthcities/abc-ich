'use strict';

angular.module('app.protocolA').config(CriticalCareReferralState);

CriticalCareReferralState.$inject = ['$stateProvider', '$urlRouterProvider'];

function CriticalCareReferralState($stateProvider, $urlRouterProvider) {

  $stateProvider.state('tabs.critical-care-referral', {
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
