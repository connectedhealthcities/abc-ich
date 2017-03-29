'use strict';

angular.module('app.general').controller('EmailConfigurationController', EmailConfigurationController);

EmailConfigurationController.$inject = ['$window', '$scope', '$ionicPopup', 'EmailConfigurationControllerService', 'EmailCacheService', 'EmailService'];

function EmailConfigurationController($window, $scope, $ionicPopup, EmailConfigurationControllerService, EmailCacheService, EmailService) {
 
    var vm = this;

    function init() {
        // initialise vm parameters
        vm.email = EmailCacheService.getEmail();

        // Setup click handlers
        vm.onCancel = onCancel;
        vm.onSave = onSave;
        vm.onSendTestEmail = onSendTestEmail;

        // Setup enable/disable handlers
        vm.isSendTestEmailButtonEnabled = isSendTestEmailButtonEnabled;
        vm.isSaveButtonEnabled = isSaveButtonEnabled;
    }

    init();

    // Click handlers
    function onCancel() {
        $window.history.back();
    }

    function onSave() {
        EmailCacheService.setEmail(vm.email);
        $window.history.back();
    }

    function onSendTestEmail() {
        EmailService.sendTestEmail(vm.email, showEmailOKPopup, showEmailClientNotInstalledOnDevicePopup);
    }

    // Enable/disable handlers
    function isSendTestEmailButtonEnabled() {
        // vm.email is bound to input of type email. vm.email is undefined when the input text cannot be interpreted as a valid email address string according to the built-in rules of the input.
        return EmailConfigurationControllerService.isSendTestEmailButtonEnabled(vm.email);
    }

    function isSaveButtonEnabled() {
        return EmailConfigurationControllerService.isSaveButtonEnabled(vm.email);
    }

    // Popups
    function showEmailOKPopup() {
        var popupTemplate = {
            templateUrl: 'modules/general/email-configuration/email-ok-popup.html',
            title: 'Email configuration',
            cssClass: 'chi-wide-popup',
            scope: $scope
        };
        var popup = $ionicPopup.alert(popupTemplate);
    }

    function showEmailClientNotInstalledOnDevicePopup() {
        var popupTemplate = {
            templateUrl: 'modules/general/email-configuration/email-client-not-installed-on-device-popup.html',
            title: 'Email error',
            cssClass: 'chi-wide-popup'
        };
        $ionicPopup.alert(popupTemplate);
    }
}