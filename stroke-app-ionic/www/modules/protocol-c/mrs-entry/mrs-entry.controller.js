'use strict';

angular.module('app.protocolC').controller('MrsEntryController', MrsEntryController);

MrsEntryController.$inject = ['$state', 'TabStateCacheService'];

function MrsEntryController($state, TabStateCacheService) {
 
    var vm = this; // S5

    vm.onNext = onNext;

    function onNext() {
        TabStateCacheService.setStateTabC('tabs.neurosurgery-referral-criteria');
        $state.go('tabs.neurosurgery-referral-criteria');
    }

 //   $scope.default = -1;
}
