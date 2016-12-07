(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('BpManagementEntryDetailController', BpManagementEntryDetailController);

    BpManagementEntryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'BpManagementEntry', 'Patient'];

    function BpManagementEntryDetailController($scope, $rootScope, $stateParams, previousState, entity, BpManagementEntry, Patient) {
        var vm = this;

        vm.bpManagementEntry = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('strokeApp:bpManagementEntryUpdate', function(event, result) {
            vm.bpManagementEntry = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
