'use strict';

angular.module('app.protocolA').config(AnticoagulantIdentificationState);

AnticoagulantIdentificationState.$inject = ['$stateProvider', '$urlRouterProvider'];

function AnticoagulantIdentificationState($stateProvider, $urlRouterProvider) {

  $stateProvider.state('tabs.anticoagulant-identification', {
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