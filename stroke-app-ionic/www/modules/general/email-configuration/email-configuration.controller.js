'use strict';

angular.module('app.general').controller('EmailConfigurationController', EmailConfigurationController);

EmailConfigurationController.$inject = ['$window', '$scope', '$ionicPopup', 'EmailCacheService', 'EmailService'];

function EmailConfigurationController($window, $scope, $ionicPopup, EmailCacheService, EmailService) {
 
    var vm = this;

    vm.email = EmailCacheService.getEmail();

    vm.onCancel = onCancel;
    vm.onSave = onSave;
    vm.onSendTestEmail = onSendTestEmail;
    vm.isSendTestEmailButtonEnabled = isSendTestEmailButtonEnabled;
 
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

    function isSendTestEmailButtonEnabled() {
        var isEnabled = false;
        
        if (vm.email) {
            isEnabled = true;
        }
        return isEnabled;
    }
}