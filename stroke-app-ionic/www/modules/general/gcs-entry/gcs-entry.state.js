'use strict';

angular.module('app.general').config(GcsEntryState);

GcsEntryState.$inject = ['$stateProvider', '$urlRouterProvider'];

function GcsEntryState($stateProvider, $urlRouterProvider) {

  $stateProvider.state('gcs-entry', {
    url: '/gcs-entry',
    templateUrl: 'modules/general/gcs-entry/gcs-entry.html',
    controller: 'GcsEntryController',
    controllerAs: 'vm'
  });
}