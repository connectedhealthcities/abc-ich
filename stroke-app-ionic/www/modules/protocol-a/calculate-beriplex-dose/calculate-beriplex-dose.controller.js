'use strict';

angular.module('app.protocolA').controller('CalculateBeriplexDoseController', CalculateBeriplexDoseController);

CalculateBeriplexDoseController.$inject = ['$state', 'PatientCacheService']; // , '$stateParams'

function CalculateBeriplexDoseController($state, PatientCacheService) { // , $stateParams
 
    var vm = this; // S9

    vm.onNext = onNext;

    function onNext() {
        
        if (PatientCacheService.getInrValue() < 1.2) {
            if (PatientCacheService.getGcsScore() < 9) {
                $state.go('tabs.mrs-entry'); // S5
            }
            else {
                $state.go('tabs.bp-management'); // S10
            }
        }
        else {
            $state.go('tabs.confirm-beriplex-dose'); // S8
        }
    }
 
// estimatedWeightInKg	Float
// calculatedBeriplexDose	Integer
// inr-value	Float
// inr-type	enum InrType [POINT_OF_CARE,LABORATORY]
// inr-measurementDateTime	ZonedDateTime

    // $scope.dose ="";

    // if($stateParams){
    //     //$scope.dose = $stateParams.dose;
    // }
}
