'use strict';

angular.module('app.protocolA').config(AnticoagulantIdentificationState);

AnticoagulantIdentificationState.$inject = ['$stateProvider', '$urlRouterProvider', 'STATE_ANTICOAGULANT_IDENTIFICATION'];

function AnticoagulantIdentificationState($stateProvider, $urlRouterProvider, STATE_ANTICOAGULANT_IDENTIFICATION) {

  $stateProvider.state(STATE_ANTICOAGULANT_IDENTIFICATION, {
    cache: false,
    url: '/anticoagulant-identification',
    views: {
      'tab-a': {
        templateUrl: 'modules/protocol-a/anticoagulant-identification/anticoagulant-identification.html',
        controller: 'AnticoagulantIdentificationController',
        controllerAs: 'vm'
      }
    }
  });
}