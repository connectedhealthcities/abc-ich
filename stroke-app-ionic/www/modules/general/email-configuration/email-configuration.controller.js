'use strict';

angular.module('app.general').controller('EmailConfigurationController', EmailConfigurationController);

EmailConfigurationController.$inject = ['$window', 'EmailCacheService'];

function EmailConfigurationController($window, EmailCacheService) {
 
    var vm = this;

    vm.email = EmailCacheService.getEmail();

    vm.onCancel = onCancel;
    vm.onSave = onSave;

    function onCancel() {
        $window.history.back();
    }

    function onSave() {
        EmailCacheService.setEmail(vm.email);
        $window.history.back();
    } 
}