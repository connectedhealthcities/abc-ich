'use strict';

angular.module('app.protocolA').controller('AnticoagulantIdentificationController', AnticoagulantIdentificationController);

AnticoagulantIdentificationController.$inject = ['$state', 'PatientCacheService'];

function AnticoagulantIdentificationController($state, PatientCacheService) { 
 
    var vm = this; // S6

    vm.onNext = onNext;

    function onNext() {

        if (PatientCacheService.getAnticogulantType() === "DOAC") {
            $state.go('tabs.doac-reversal-agent-details'); // S7
        }
        else {
            $state.go('tabs.calculate-beriplex-dose'); // S9
        }
    }

// anticoagulantType	enum AnticoagulantType[DOAC, VITK, NO, UNKNOWN]
// antiCoagulant	String

    // $scope.antiCoag={};
    // $scope.selected = "";

    // $scope.init = function(){
    //     $scope.antiCoag.isAntiCoag = false;
    //     console.log($stateParams);
    // };
    
    // $scope.init();
}
