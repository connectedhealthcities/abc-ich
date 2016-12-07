(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('HospitalController', HospitalController);

    HospitalController.$inject = ['$scope', '$state', 'Hospital'];

    function HospitalController ($scope, $state, Hospital) {
        var vm = this;

        vm.hospitals = [];

        loadAll();

        function loadAll() {
            Hospital.query(function(result) {
                vm.hospitals = result;
            });
        }
    }
})();
