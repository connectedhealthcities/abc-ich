'use strict';

angular.module('app.protocolC').controller('MrsEntryController', MrsEntryController);

MrsEntryController.$inject = ['$state', 'TabStateCacheService'];

function MrsEntryController($state, TabStateCacheService) {
 
    var vm = this; // S5

    TabStateCacheService.setStateTabC('tabs.mrs-entry');

    vm.onNext = onNext;

    function onNext() {
        $state.go('tabs.neurosurgery-referral-criteria');
    }

 //   $scope.default = -1;
}
