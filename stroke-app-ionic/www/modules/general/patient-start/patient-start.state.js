'use strict';

angular.module('app.general').config(PatientStartState);

PatientStartState.$inject = ['$stateProvider', '$urlRouterProvider'];

function PatientStartState($stateProvider, $urlRouterProvider) {

  $stateProvider.state('patient-start', {
    cache: false,
    url: '/patient-start',
    templateUrl: 'modules/general/patient-start/patient-start.html',
    controller: 'PatientStartController',
    controllerAs: 'vm'
  });
}
