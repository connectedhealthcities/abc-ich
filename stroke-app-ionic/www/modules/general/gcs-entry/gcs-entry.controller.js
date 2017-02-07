'use strict';

angular.module('app.general').controller('GcsEntryController', GcsEntryController);

GcsEntryController.$inject = ['$state'];

function GcsEntryController($state) {

    var vm = this; // S3

    vm.onNext = onNext;
    vm.gcsValueChanged = gcsValueChanged;
    
    vm.eye = null;
    vm.verbal = null;
    vm.motor = null;
    vm.total = null;

    function onNext() {
         $state.go('tabs.anticoagulant-identification');
    }

    function gcsValueChanged() {
    	if(vm.eye && vm.verbal && vm.motor){
    		vm.total = vm.eye + vm.verbal + vm.motor;
    	}
    }
}
