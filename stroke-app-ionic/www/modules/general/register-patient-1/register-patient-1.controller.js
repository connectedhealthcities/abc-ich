'use strict';

angular.module('app.general').controller('RegisterPatient1Controller', RegisterPatient1Controller);

RegisterPatient1Controller.$inject = ['$state']; // , '$stateParams', 'ConfigService', 'DateTimeService'

function RegisterPatient1Controller($state) { // , $stateParams, ConfigService, DateTimeService

    var vm = this; // S1

    vm.onNext = onNext;

    function onNext() {
        $state.go('register-patient-2'); // S2
    }
 
// uniqueId	String
// initials	String
// birthDate	LocalDate
// estimatedAge	Integer
// externalScan	Boolean
// externalScanHospitalName	String
// scanDateTime	ZonedDateTime
// hospitalUniqueId	String


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
