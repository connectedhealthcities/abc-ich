'use strict';

angular.module('app.general').config(PatientEndState);

PatientEndState.$inject = ['$stateProvider', '$urlRouterProvider', 'STATE_PATIENT_END'];

function PatientEndState($stateProvider, $urlRouterProvider, STATE_PATIENT_END) {

  $stateProvider.state(STATE_PATIENT_END, {
    cache: false,
    url: '/patient-end',
    templateUrl: 'modules/general/patient-end/patient-end.html',
    controller: 'PatientEndController',
    controllerAs: 'vm'
  });
}
