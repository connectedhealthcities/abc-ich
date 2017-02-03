'use strict';

angular.module('app.general').controller('RegisterPatientController', RegisterPatientController);

RegisterPatientController.$inject = ['$state']; // , 'ConfigService', 'DateTimeService'

function RegisterPatientController($state) { // , ConfigService, DateTimeService

    var vm = this; // S1

    vm.onNext = onNext;

    function onNext() {

        //cjd need to handle case when matching patient is detected
        $state.go('patient-details');
    }

    // $scope.registrationPart1 = {};
    
    // $scope.init = function(){
    //     var date = new Date();
    //     $scope.registrationPart1.hospitalId = ConfigService.getHospitalId();
        
    //     $scope.registrationPart1.scanDate = date;
    //     $scope.registrationPart1.scanTime = DateTimeService.dateTimeToShortTime(date);
        
    //     $scope.registrationPart1.dateOfBirth = date;
    //     $scope.registrationPart1.dobUnknown = false;
    //     $scope.registrationPart1.estimatedAge = 0;
    // };

    // $scope.init();
}
