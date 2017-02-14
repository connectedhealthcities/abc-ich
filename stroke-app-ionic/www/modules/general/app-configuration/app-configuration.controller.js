'use strict';

angular.module('app.general').controller('AppConfigurationController', AppConfigurationController);

AppConfigurationController.$inject = ['$window', '$scope', '$state', 'AppConfigurationCacheService', 'HospitalHttpService'];

function AppConfigurationController($window, $scope, $state, AppConfigurationCacheService, HospitalHttpService) {
 
    var vm = this;

    vm.hospitals = HospitalHttpService.getHospitals();
    vm.selectedHospital;
    vm.email;
    vm.isDataUpdated;

    vm.onCancel = onCancel;
    vm.onSave = onSave;
    vm.dataUpdated = dataUpdated;
    vm.isSaveButtonEnabled = isSaveButtonEnabled;
    setValues();
    function onCancel() {
        setValues();
        $window.history.back();
    }

    function setValues() { //TODO: this is a really bad name...EMT
        vm.selectedHospital = AppConfigurationCacheService.getSelectedHospital();
        vm.email = AppConfigurationCacheService.getEmail();
        vm.isDataUpdated = false;
    }

    function isSaveButtonEnabled() {
        return vm.isDataUpdated && vm.selectedHospital && vm.email;
    }

    function dataUpdated() {
        vm.isDataUpdated = true;
    }

    function onSave() {
        AppConfigurationCacheService.setSelectedHospital(vm.selectedHospital);
        AppConfigurationCacheService.setEmail(vm.email);
        vm.isDataUpdated = false;
    } 
}