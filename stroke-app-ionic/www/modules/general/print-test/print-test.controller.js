'use strict';

angular.module('app.general').controller('PrintTestController', PrintTestController);

PrintTestController.$inject = ['$window', '$state', '$ionicPopup', 'PrintService', 'STATE_TEST_PRINT'];

function PrintTestController($window, $state, $ionicPopup, PrintService, STATE_TEST_PRINT) {

  var vm = this;

  vm.onBack = onBack;
  vm.onTestPrint = onTestPrint;

  function onBack() {
    $window.history.back();
  }

  function showTestPrintPopup(okHandler, cancelHandler) {
    var popupTemplate = {
      templateUrl: 'modules/general/print-test/print-test-popup.html',
      title: 'Test Print',
      cssClass: 'chi-wide-popup'
    };
    var popup = $ionicPopup.confirm(popupTemplate);

    popup.then(function (res) {
      if (res) {
        okHandler();
      } else {
        cancelHandler();
      }
    });
  }

  function onTestPrint() {
    showTestPrintPopup(function () {
      PrintService.printTestPage(reset);
    }, reset);
  }

  // Private functions
  function reset() {
    $state.go(STATE_TEST_PRINT);
  }

}
