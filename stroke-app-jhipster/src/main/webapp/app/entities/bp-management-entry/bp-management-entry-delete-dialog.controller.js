(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('BpManagementEntryDeleteController',BpManagementEntryDeleteController);

    BpManagementEntryDeleteController.$inject = ['$uibModalInstance', 'entity', 'BpManagementEntry'];

    function BpManagementEntryDeleteController($uibModalInstance, entity, BpManagementEntry) {
        var vm = this;

        vm.bpManagementEntry = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            BpManagementEntry.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
