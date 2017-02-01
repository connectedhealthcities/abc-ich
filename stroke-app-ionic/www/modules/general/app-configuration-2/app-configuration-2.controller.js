'use strict';

angular.module('app.general').controller('AppConfiguration2Controller', AppConfiguration2Controller);

AppConfiguration2Controller.$inject = ['$window', '$stateParams'];

function AppConfiguration2Controller($window, $stateParams) {
 
    var vm = this;
    vm.onCancel = onCancel;
    vm.onSave = onSave;

    function onCancel() {
        $window.history.back();
    }

    function onSave() {
        //ToDo save
        $window.history.back();
    }

}