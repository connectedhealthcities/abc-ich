'use strict';

angular.module('app.general').config(RegisterPatientState);

RegisterPatientState.$inject = ['$stateProvider', '$urlRouterProvider', 'STATE_REGISTER_PATIENT'];

function RegisterPatientState($stateProvider, $urlRouterProvider, STATE_REGISTER_PATIENT) {

  $stateProvider.state(STATE_REGISTER_PATIENT, {
    cache: false,
    url: '/register-patient',
    templateUrl: 'modules/general/register-patient/register-patient.html',
    controller: 'RegisterPatientController',
    controllerAs: 'vm'
  });
}
