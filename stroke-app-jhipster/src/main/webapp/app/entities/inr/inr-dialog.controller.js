(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('InrDialogController', InrDialogController);

    InrDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Inr'];

    function InrDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Inr) {
        var vm = this;

        vm.inr = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.inr.id !== null) {
                Inr.update(vm.inr, onSaveSuccess, onSaveError);
            } else {
                Inr.save(vm.inr, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('strokeApp:inrUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.measuredDateTime = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
