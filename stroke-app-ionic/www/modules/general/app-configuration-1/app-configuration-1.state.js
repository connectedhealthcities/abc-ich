'use strict';

angular.module('app.general').config(AppConfiguration1State);

AppConfiguration1State.$inject = ['$stateProvider', '$urlRouterProvider'];

function AppConfiguration1State($stateProvider, $urlRouterProvider) {

  $stateProvider.state('app-configuration-1', {
    url: '/app-configuration-1',
    templateUrl: 'modules/general/app-configuration-1/app-configuration-1.html',
    controller: 'AppConfiguration1Controller',
    controllerAs: 'vm'
  });
}
