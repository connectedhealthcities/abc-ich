'use strict';

angular.module('app.protocolC').controller('MrsEntryController', MrsEntryController);

MrsEntryController.$inject = ['$state']; // , '$stateParams'

function MrsEntryController($state) { // , $stateParams
 
    var vm = this; // S5

    vm.onNext = onNext;

    function onNext() {
        $state.go('tabs.neurosurgery-referral-criteria'); // S12
    }

// premorbidMrsScore	Integer

 //   $scope.default = -1;
}
