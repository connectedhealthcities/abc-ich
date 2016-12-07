(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('BpManagementEntryDialogController', BpManagementEntryDialogController);

    BpManagementEntryDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'BpManagementEntry', 'Patient'];

    function BpManagementEntryDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, BpManagementEntry, Patient) {
        var vm = this;

        vm.bpManagementEntry = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.patients = Patient.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.bpManagementEntry.id !== null) {
                BpManagementEntry.update(vm.bpManagementEntry, onSaveSuccess, onSaveError);
            } else {
                BpManagementEntry.save(vm.bpManagementEntry, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('strokeApp:bpManagementEntryUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.dateTime = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
