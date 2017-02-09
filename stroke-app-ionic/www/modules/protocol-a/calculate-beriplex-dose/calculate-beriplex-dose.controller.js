'use strict';

angular.module('app.protocolA').controller('CalculateBeriplexDoseController', CalculateBeriplexDoseController);

CalculateBeriplexDoseController.$inject = ['$state', 'PatientCacheService', 'TabStateCacheService'];

function CalculateBeriplexDoseController($state, PatientCacheService, TabStateCacheService) {
 
    var vm = this; // S9

    TabStateCacheService.setStateTabA('tabs.calculate-beriplex-dose');

    vm.onNext = onNext;

    function onNext() {
        
        if (PatientCacheService.getInrValue() < 1.3) {
            if (PatientCacheService.getGcsScore() < 9) {
                var state = TabStateCacheService.getStateTabC();
                $state.go(state);
            }
            else {
                var state = TabStateCacheService.getStateTabB();
                $state.go(state);
            }
        }
        else {
            if (PatientCacheService.getAnticoagulantType() === "VITK") {
                $state.go('tabs.confirm-beriplex-dose');
            }
            else if (PatientCacheService.getAnticoagulantType() === "UNKNOWN") {
                if (PatientCacheService.getShouldAdministerBeriplexWhenAnticoagulatUnknown()) {
                    $state.go('tabs.confirm-beriplex-dose');
                }
                else {
                    if (PatientCacheService.getGcsScore() < 9) {
                        var state = TabStateCacheService.getStateTabC();
                        $state.go(state);
                    }
                    else {
                        var state = TabStateCacheService.getStateTabB();
                        $state.go(state);
                    }
                }
            }
        }
   }

    // $scope.dose ="";

    // if($stateParams){
    //     //$scope.dose = $stateParams.dose;
    // }
}
