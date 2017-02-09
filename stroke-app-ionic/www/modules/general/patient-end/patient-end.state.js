'use strict';

angular.module('app.general').config(PatientEndState);

PatientEndState.$inject = ['$stateProvider', '$urlRouterProvider'];

function PatientEndState($stateProvider, $urlRouterProvider) {

  $stateProvider.state('patient-end', {
    cache: false,
    url: '/patient-end',
    templateUrl: 'modules/general/patient-end/patient-end.html',
    controller: 'PatientEndController',
    controllerAs: 'vm'
  });
}
