'use strict';

angular.module('app.general').controller('UserCredentialsConfigurationController', UserCredentialsConfigurationController);

UserCredentialsConfigurationController.$inject = ['$window', '$ionicLoading', '$ionicPopup', 'UserCredentialsConfigurationControllerService', 'UserCredentialsCacheService', 'AuthenticationService'];

function UserCredentialsConfigurationController($window, $ionicLoading, $ionicPopup, UserCredentialsConfigurationControllerService, UserCredentialsCacheService, AuthenticationService) {

    var vm = this;

    function init() {
        // initialise vm parameters
        vm.username = UserCredentialsCacheService.getUsername();
        vm.password = UserCredentialsCacheService.getPassword();
        vm.serverAddress = UserCredentialsCacheService.getServerAddress();

        // Setup click handlers
        vm.onCancel = onCancel;
        vm.onSave = onSave;
        vm.onTestLogin = onTestLogin;

        // Setup enable/disable handlers
        vm.isTestLoginButtonEnabled = isTestLoginButtonEnabled;
    }

    init();

    // Click handlers
    function onCancel() {
        $window.history.back();
    }

    function onSave() {
        UserCredentialsCacheService.setUsername(vm.username);
        UserCredentialsCacheService.setPassword(vm.password);
        UserCredentialsCacheService.setServerAddress(vm.serverAddress);
        $window.history.back();
    }

    function onTestLogin() {
        $ionicLoading.show();
        UserCredentialsCacheService.setServerAddress(vm.serverAddress);
        AuthenticationService.testAuthentication(vm.username, vm.password).then(function(success) {
            var alertText = "Failure";
            if (success) {
                alertText = "Success";
            }
            $ionicLoading.hide();
            showAlert(alertText);
        })
    }

    // Enable/disable handlers
    function isTestLoginButtonEnabled() {       
        return UserCredentialsConfigurationControllerService.isTestLoginButtonEnabled(vm.username, vm.password, vm.serverAddress);
    }

    // Popups
    function showAlert(text) {
        var popupTemplate = {
            template: text,
            title: 'Test login'
        };

        $ionicPopup.alert(popupTemplate);
    }
 }

