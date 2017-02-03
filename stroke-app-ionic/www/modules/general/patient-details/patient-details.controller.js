'use strict';

angular.module('app.general').controller('PatientDetailsController', PatientDetailsController);

PatientDetailsController.$inject = ['$state', '$stateParams']; // , 'DateTimeService'

function PatientDetailsController($state, $stateParams) { // , DateTimeService
 
    var vm = this; // S2

    vm.onNext = onNext;

    function onNext() {
        $state.go('gcs-entry');
    }

    // $scope.registrationPart2 = {};

    // $scope.init = function(){
    //     var date = new Date();
    //     $scope.registrationPart2.doorDate = date;
    //     $scope.registrationPart2.doorTime = DateTimeService.dateTimeToShortTime(date);
        
    //     $scope.registrationPart2.onsetDate = date;
    //     $scope.registrationPart2.onsetTime = DateTimeService.dateTimeToShortTime(date);
    //     $scope.registrationPart2.onsetUnknown  = false;
        
    //     $scope.registrationPart2.appStart = date;
    // };
    
    // $scope.appStartTimeDisplay = function(){
    //     $scope.appStartDisplay = DateTimeService.getDateTimeStringFromDate($scope.registrationPart2.appStart);
    // }

    // $scope.init();
    // $scope.appStartTimeDisplay();
}
