'use strict';

angular.module('app.general').config(PatientDetailsState);

PatientDetailsState.$inject = ['$stateProvider', '$urlRouterProvider'];

function PatientDetailsState($stateProvider, $urlRouterProvider) {

  $stateProvider.state('patient-details', {
    cache: false,
    url: '/patient-details',
    templateUrl: 'modules/general/patient-details/patient-details.html',
    controller: 'PatientDetailsController',
    controllerAs: 'vm'
  });
}
