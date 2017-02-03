'use strict';

angular.module('app.protocolA').controller('AnticoagulantIdentificationController', AnticoagulantIdentificationController);

AnticoagulantIdentificationController.$inject = ['$state', 'PatientCacheService', 'TabStateCacheService'];

function AnticoagulantIdentificationController($state, PatientCacheService, TabStateCacheService) { 
 
    var vm = this; // S6

    vm.onNext = onNext;

    function onNext() {

        if (PatientCacheService.getAnticoagulantType() === "DOAC") {
            TabStateCacheService.setStateTabA('tabs.doac-reversal-agent-details');
            $state.go('tabs.doac-reversal-agent-details'); // S7
        }
        else {
            TabStateCacheService.setStateTabA('tabs.calculate-beriplex-dose');
            $state.go('tabs.calculate-beriplex-dose'); // S9
        }
    }

    // $scope.antiCoag={};
    // $scope.selected = "";

    // $scope.init = function(){
    //     $scope.antiCoag.isAntiCoag = false;
    //     console.log($stateParams);
    // };
    
    // $scope.init();
}
