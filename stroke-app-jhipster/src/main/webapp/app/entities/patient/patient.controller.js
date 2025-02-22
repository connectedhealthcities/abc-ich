(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('PatientController', PatientController);

    PatientController.$inject = ['$scope', '$state', 'Patient', 'ParseLinks', 'AlertService', 'pagingParams', 'paginationConstants', '_', 'DateUtils'];

    function PatientController ($scope, $state, Patient, ParseLinks, AlertService, pagingParams, paginationConstants, _, DateUtils) {
        var vm = this;

        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.itemsPerPage = paginationConstants.itemsPerPage;

        loadAll();

        function loadAll () {
            Patient.query({
                page: pagingParams.page - 1,
                size: vm.itemsPerPage,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.patients = addCalculatedFields(data);
                vm.page = pagingParams.page;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }
        
        function addCalculatedFields(patients) {
        	
        	_.forEach(patients, function(patient) {
            	var doorDate = DateUtils.convertDateTimeFromServer(patient.doorDateTime);
            	
            	var bpTargetReachedDate = DateUtils.convertDateTimeFromServer(patient.bpTargetReachedDateTime);
            	patient.dtt = DateUtils.getMinutesBetweenDates(doorDate, bpTargetReachedDate);

        		patient.dnt = null;
            	if (!patient.reversalAgentAdministeredAtExternalHospital) {
                	var reversalAgentStartDateTime = DateUtils.convertDateTimeFromServer(patient.reversalAgentStartDateTime);
                	patient.dnt = DateUtils.getMinutesBetweenDates(doorDate, reversalAgentStartDateTime);
            	}
            });
        	
        	return patients;
        }
        
        function loadPage (page) {
            vm.page = page;
            vm.transition();
        }

        function transition () {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch
            });
        }
    }
})();
