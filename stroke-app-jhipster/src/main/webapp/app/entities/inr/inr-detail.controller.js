(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('InrDetailController', InrDetailController);

    InrDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Inr', 'Patient'];

    function InrDetailController($scope, $rootScope, $stateParams, previousState, entity, Inr, Patient) {
        var vm = this;

        vm.inr = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('strokeApp:inrUpdate', function(event, result) {
            vm.inr = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
