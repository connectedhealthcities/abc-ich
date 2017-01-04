(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('InrDetailController', InrDetailController);

    InrDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Inr'];

    function InrDetailController($scope, $rootScope, $stateParams, previousState, entity, Inr) {
        var vm = this;

        vm.inr = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('strokeApp:inrUpdate', function(event, result) {
            vm.inr = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
