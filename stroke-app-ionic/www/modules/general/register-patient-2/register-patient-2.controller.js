'use strict';

angular.module('app.general').controller('RegisterPatient2Controller', RegisterPatient2Controller);

RegisterPatient2Controller.$inject = ['$state', '$stateParams']; // , 'DateTimeService'

function RegisterPatient2Controller($state, $stateParams) { // , DateTimeService
 
    var vm = this; // S2

    vm.onNext = onNext;

    function onNext() {
        $state.go('gcs-entry'); // S3
    }
 
// doorDateTime	ZonedDateTime
// onsetDateTime	ZonedDateTime
// lastSeenWellOnset	Boolean
// bestEstimateOnset	Boolean

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
