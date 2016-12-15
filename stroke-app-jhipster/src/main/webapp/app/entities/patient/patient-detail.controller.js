(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('PatientDetailController', PatientDetailController);

    PatientDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Patient', 'inrs', 'bpManagementEntries', 'Hospital'];

    function PatientDetailController($scope, $rootScope, $stateParams, previousState, entity, Patient, inrs, bpManagementEntries, Hospital) {
        var vm = this;

        vm.patient = entity;
        vm.inrs = inrs;
        vm.bpManagementEntries = bpManagementEntries;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('strokeApp:patientUpdate', function(event, result) {
            vm.patient = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
