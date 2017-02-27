'use strict';

angular.module('app').controller('MenuController', MenuController);

MenuController.$inject = ['$scope', '$state', 'PatientCacheService'];

function MenuController($scope, $state, PatientCacheService) {

 //   var vm = this;

    $scope.onDemoMode = onDemoMode;

    function onDemoMode() {
        PatientCacheService.setIsDemoMode(true);
        $state.go("register-patient");
    }
}
