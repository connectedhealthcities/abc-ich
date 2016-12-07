(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('HospitalDetailController', HospitalDetailController);

    HospitalDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Hospital'];

    function HospitalDetailController($scope, $rootScope, $stateParams, previousState, entity, Hospital) {
        var vm = this;

        vm.hospital = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('strokeApp:hospitalUpdate', function(event, result) {
            vm.hospital = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
