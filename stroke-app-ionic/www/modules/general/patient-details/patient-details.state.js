'use strict';

angular.module('app.general').config(PatientDetailsState);

PatientDetailsState.$inject = ['$stateProvider', '$urlRouterProvider', 'STATE_PATIENT_DETAILS'];

function PatientDetailsState($stateProvider, $urlRouterProvider, STATE_PATIENT_DETAILS) {

  $stateProvider.state(STATE_PATIENT_DETAILS, {
    cache: false,
    url: '/patient-details',
    templateUrl: 'modules/general/patient-details/patient-details.html',
    controller: 'PatientDetailsController',
    controllerAs: 'vm'
  });
}
