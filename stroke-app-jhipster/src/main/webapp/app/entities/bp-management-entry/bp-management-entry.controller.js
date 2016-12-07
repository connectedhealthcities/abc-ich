(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('BpManagementEntryController', BpManagementEntryController);

    BpManagementEntryController.$inject = ['$scope', '$state', 'BpManagementEntry'];

    function BpManagementEntryController ($scope, $state, BpManagementEntry) {
        var vm = this;

        vm.bpManagementEntries = [];

        loadAll();

        function loadAll() {
            BpManagementEntry.query(function(result) {
                vm.bpManagementEntries = result;
            });
        }
    }
})();
