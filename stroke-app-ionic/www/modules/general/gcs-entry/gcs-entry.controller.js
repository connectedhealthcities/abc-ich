'use strict';

angular.module('app.general').controller('GcsEntryController', GcsEntryController);

GcsEntryController.$inject = ['$state'];

function GcsEntryController($state) {

    var vm = this; // S3

    vm.onNext = onNext;

    function onNext() {
         $state.go('tabs.anticoagulant-identification');
    }
}
