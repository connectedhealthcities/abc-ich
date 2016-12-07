(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('PatientDialogController', PatientDialogController);

    PatientDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Patient', 'Hospital', 'Inr', 'BpManagementEntry'];

    function PatientDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Patient, Hospital, Inr, BpManagementEntry) {
        var vm = this;

        vm.patient = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.hospitals = Hospital.query({filter: 'patient-is-null'});
        $q.all([vm.patient.$promise, vm.hospitals.$promise]).then(function() {
            if (!vm.patient.hospitalId) {
                return $q.reject();
            }
            return Hospital.get({id : vm.patient.hospitalId}).$promise;
        }).then(function(hospital) {
            vm.hospitals.push(hospital);
        });
        vm.inrs = Inr.query();
        vm.bpmanagemententries = BpManagementEntry.query();

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
        vm.datePickerOpenStatus.bpStartTreatmentDateTime = false;
        vm.datePickerOpenStatus.doorDateTime = false;
        vm.datePickerOpenStatus.appStartDateTime = false;
        vm.datePickerOpenStatus.beriplexStartDateTime = false;
        vm.datePickerOpenStatus.vitaminkDateTime = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
