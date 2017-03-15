'use strict';

angular.module('app.general').controller('AboutController', AboutController);

AboutController.$inject = ['$window'];

function AboutController($window) {
 
    var vm = this;

    vm.version = AppVersion.version; 
//    vm.build = AppVersion.build;

    vm.onBack = onBack;

    function onBack() {
        $window.history.back();
    }
}