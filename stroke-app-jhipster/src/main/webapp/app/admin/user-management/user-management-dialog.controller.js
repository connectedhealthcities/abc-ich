(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('UserManagementDialogController',UserManagementDialogController);

    UserManagementDialogController.$inject = ['$stateParams', '$uibModalInstance', 'entity', 'User', 'Hospital'];

    function UserManagementDialogController ($stateParams, $uibModalInstance, entity, User, Hospital) {
        var vm = this;

        vm.authorities = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_MOBILE'];
        vm.clear = clear;
        vm.languages = null;
        vm.save = save;
        vm.user = entity;
        vm.hospitals = [];
        vm.selectedHospital = null;

        loadHospitals();

        function loadHospitals() {
            Hospital.query(function(result) {
                vm.hospitals = result;
                if (vm.user.id !== null) {
                	var selectedHospital = getSelectedHospital(vm.hospitals, vm.user.hospitalId);
                	vm.selectedHospital = selectedHospital;
                }
            });
        }
        
        function getSelectedHospital(hospitals, hospitalId) {
        	var hospital = null;
        	
        	for(var i = 0; i < hospitals.length; i++) {
        		if (hospitals[i].uniqueId === hospitalId) {
        			hospital = hospitals[i];
        			break;
        		}
        	}
        	return hospital;
        }

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function onSaveSuccess (result) {
            vm.isSaving = false;
            $uibModalInstance.close(result);
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        function save () {
            vm.isSaving = true;
 
            if (vm.selectedHospital) {
            	vm.user.hospitalId = vm.selectedHospital.uniqueId;
            }
            
            if (vm.user.id !== null) {
                User.update(vm.user, onSaveSuccess, onSaveError);
            } else {
                vm.user.langKey = 'en';
                User.save(vm.user, onSaveSuccess, onSaveError);
            }
        }
    }
})();
