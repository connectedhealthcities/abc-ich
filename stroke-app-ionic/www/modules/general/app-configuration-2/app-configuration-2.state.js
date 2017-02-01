'use strict';

angular.module('app.general').config(AppConfiguration2State);

AppConfiguration2State.$inject = ['$stateProvider', '$urlRouterProvider'];

function AppConfiguration2State($stateProvider, $urlRouterProvider) {

  $stateProvider.state('app-configuration-2', {
    url: '/app-configuration-2',
    templateUrl: 'modules/general/app-configuration-2/app-configuration-2.html',
    controller: 'AppConfiguration2Controller',
    controllerAs: 'vm'
  });
}
