(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('InrController', InrController);

    InrController.$inject = ['$scope', '$state', 'Inr'];

    function InrController ($scope, $state, Inr) {
        var vm = this;

        vm.inrs = [];

        loadAll();

        function loadAll() {
            Inr.query(function(result) {
                vm.inrs = result;
            });
        }
    }
})();
