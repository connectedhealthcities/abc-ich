(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('PatientDialogController', PatientDialogController);

    PatientDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Patient', 'BpManagementEntry', 'Hospital', 'Inr'];

    function PatientDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Patient, BpManagementEntry, Hospital, Inr) {
        var vm = this;

        vm.patient = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.bpmanagemententries = BpManagementEntry.query();
        vm.hospitals = Hospital.query();
        vm.inrs = Inr.query({filter: 'patient-is-null'});
        $q.all([vm.patient.$promise, vm.inrs.$promise]).then(function() {
            if (!vm.patient.inrId) {
                return $q.reject();
            }
            return Inr.get({id : vm.patient.inrId}).$promise;
        }).then(function(inr) {
            vm.inrs.push(inr);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.patient.id !== null) {
                Patient.update(vm.patient, onSaveSuccess, onSaveError);
            } else {
                Patient.save(vm.patient, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('strokeApp:patientUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.birthDate = false;
        vm.datePickerOpenStatus.onsetDateTime = false;
        vm.datePickerOpenStatus.doorDateTime = false;
        vm.datePickerOpenStatus.appStartDateTime = false;
        vm.datePickerOpenStatus.bpTargetReachedDateTime = false;
        vm.datePickerOpenStatus.beriplexStartDateTime = false;
        vm.datePickerOpenStatus.vitaminkDateTime = false;
        vm.datePickerOpenStatus.scanDateTime = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
