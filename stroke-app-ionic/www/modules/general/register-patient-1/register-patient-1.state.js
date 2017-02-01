'use strict';

angular.module('app.general').config(RegisterPatient1State);

RegisterPatient1State.$inject = ['$stateProvider', '$urlRouterProvider'];

function RegisterPatient1State($stateProvider, $urlRouterProvider) {

  $stateProvider.state('register-patient-1', {
    url: '/register-patient-1',
    templateUrl: 'modules/general/register-patient-1/register-patient-1.html',
    controller: 'RegisterPatient1Controller',
    controllerAs: 'vm'
  });
}
