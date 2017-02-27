'use strict';

angular.module('app.general').controller('UserCredentialsConfigurationController', UserCredentialsConfigurationController);

UserCredentialsConfigurationController.$inject = ['$window', '$ionicPopup', 'UserCredentialsCacheService', 'AuthenticationService'];

function UserCredentialsConfigurationController($window, $ionicPopup, UserCredentialsCacheService, AuthenticationService) {

    var vm = this;

    vm.username = UserCredentialsCacheService.getUsername();
    vm.password = UserCredentialsCacheService.getPassword();


    vm.onCancel = onCancel;
    vm.onSave = onSave;
    vm.isTestLoginButtonEnabled = isTestLoginButtonEnabled;
    vm.onTestLogin = onTestLogin;

    function onCancel() {
        $window.history.back();
    }

    function onSave() {
        UserCredentialsCacheService.setUsername(vm.username);
        UserCredentialsCacheService.setPassword(vm.password);
        $window.history.back();
    }

    function isTestLoginButtonEnabled() {
        var isEnabled = false;

        if (vm.username && vm.password) {
            isEnabled = true;
        }

        return isEnabled;
    }

    function onTestLogin() {
        AuthenticationService.testAuthentication(vm.username, vm.password).then(function(success) {
            var alertText = "Failure";
            if (success) {
                alertText = "Success";
            }
            showAlert(alertText);
        })
    }

    function showAlert(text) {
        var popupTemplate = {
            template: text,
            title: 'Test login'
        };

        $ionicPopup.alert(popupTemplate);
    }
 }

