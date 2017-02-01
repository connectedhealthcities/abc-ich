'use strict';

angular.module('app.general').controller('GcsEntryController', GcsEntryController);

GcsEntryController.$inject = ['$state']; // , '$stateParams'

function GcsEntryController($state) { // , $stateParams

    var vm = this; // S3

    vm.onNext = onNext;

    function onNext() {
        $state.go('tabs.anticoagulant-identification'); // S6
    }

// gcsScore - Total	Integer
// gcsScore - Eye	Integer
// gcsScore - Verbal	Integer
// gcsScore - Motor	Integer
}
