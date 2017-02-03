'use strict';

angular.module('app.general').config(RegisterPatientState);

RegisterPatientState.$inject = ['$stateProvider', '$urlRouterProvider'];

function RegisterPatientState($stateProvider, $urlRouterProvider) {

  $stateProvider.state('register-patient', {
    url: '/register-patient',
    templateUrl: 'modules/general/register-patient/register-patient.html',
    controller: 'RegisterPatientController',
    controllerAs: 'vm'
  });
}
