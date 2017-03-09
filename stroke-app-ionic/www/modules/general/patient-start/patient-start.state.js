'use strict';

angular.module('app.general').config(PatientStartState);

PatientStartState.$inject = ['$stateProvider', '$urlRouterProvider', 'STATE_PATIENT_START'];

function PatientStartState($stateProvider, $urlRouterProvider, STATE_PATIENT_START) {

  $stateProvider.state(STATE_PATIENT_START, {
    cache: false,
    url: '/patient-start',
    templateUrl: 'modules/general/patient-start/patient-start.html',
    controller: 'PatientStartController',
    controllerAs: 'vm'
  });
}
