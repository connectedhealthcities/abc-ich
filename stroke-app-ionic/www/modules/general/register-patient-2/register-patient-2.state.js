'use strict';

angular.module('app.general').config(RegisterPatient2State);

RegisterPatient2State.$inject = ['$stateProvider', '$urlRouterProvider'];

function RegisterPatient2State($stateProvider, $urlRouterProvider) {

  $stateProvider.state('register-patient-2', {
    url: '/register-patient-2',
    templateUrl: 'modules/general/register-patient-2/register-patient-2.html',
    controller: 'RegisterPatient2Controller',
    controllerAs: 'vm'
  });
}
