'use strict';

angular.module('app.general').config(AboutState);

AboutState.$inject = ['$stateProvider', 'STATE_ABOUT'];

function AboutState($stateProvider, STATE_ABOUT) {

  $stateProvider.state(STATE_ABOUT, {
    cache: false,
    url: '/about',
    templateUrl: 'modules/general/about/about.html',
    controller: 'AboutController',
    controllerAs: 'vm'
  });
}
