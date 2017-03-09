'use strict';

angular.module('app.general').config(GcsEntryState);

GcsEntryState.$inject = ['$stateProvider', '$urlRouterProvider', "STATE_GCS_ENTRY"];

function GcsEntryState($stateProvider, $urlRouterProvider, STATE_GCS_ENTRY) {

  $stateProvider.state(STATE_GCS_ENTRY, {
    cache: false,
    url: '/gcs-entry',
    templateUrl: 'modules/general/gcs-entry/gcs-entry.html',
    controller: 'GcsEntryController',
    controllerAs: 'vm'
  });
}