(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('InrDeleteController',InrDeleteController);

    InrDeleteController.$inject = ['$uibModalInstance', 'entity', 'Inr'];

    function InrDeleteController($uibModalInstance, entity, Inr) {
        var vm = this;

        vm.inr = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Inr.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
