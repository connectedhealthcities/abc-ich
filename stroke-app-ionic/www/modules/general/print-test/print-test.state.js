'use strict';

angular.module('app.general').config(PrintTestState);

PrintTestState.$inject = ['$stateProvider', 'STATE_TEST_PRINT'];

function PrintTestState($stateProvider, STATE_TEST_PRINT) {

  $stateProvider.state(STATE_TEST_PRINT, {
    cache: false,
    url: '/print-test',
    templateUrl: 'modules/general/print-test/print-test.html',
    controller: 'PrintTestController',
    controllerAs: 'vm'
  });
}
