(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('PatientDetailController', PatientDetailController);

    PatientDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Patient', 'bpManagementEntries', 'Hospital', 'Inr'];

    function PatientDetailController($scope, $rootScope, $stateParams, previousState, entity, Patient, bpManagementEntries, Hospital, Inr) {
        var vm = this;

        vm.patient = entity;
        vm.bpManagementEntries = bpManagementEntries;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('strokeApp:patientUpdate', function(event, result) {
            vm.patient = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
