'use strict';

angular.module('app.general').controller('UserCredentialsConfigurationController', UserCredentialsConfigurationController);

UserCredentialsConfigurationController.$inject = ['$window', 'UserCredentialsCacheService'];

function UserCredentialsConfigurationController($window, UserCredentialsCacheService) {

    var vm = this;

    vm.username = UserCredentialsCacheService.getUsername();
    vm.password = UserCredentialsCacheService.getPassword();


    vm.onCancel = onCancel;
    vm.onSave = onSave;

    function onCancel() {
        $window.history.back();
    }

    function onSave() {
        UserCredentialsCacheService.setUsername(vm.username);
        UserCredentialsCacheService.setPassword(vm.password);
        $window.history.back();
    }

 }

