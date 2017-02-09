'use strict';

angular.module('app.general').controller('AppConfiguration1Controller', AppConfiguration1Controller);

AppConfiguration1Controller.$inject = ['$scope', '$stateParams', 'API', 'ConfigurationCacheService', '$ionicPopup', '$timeout', '$window'];

function AppConfiguration1Controller($scope, $stateParams, API, ConfigurationCacheService, $ionicPopup, $timeout, $window) {

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

 /*  
    $scope.config = {};
    $scope.previousConfig = {};
    $scope.dataChanged = false;
    $scope.init = function(){
        $scope.hospitals = API.getHospitalIds();
        $scope.config = ConfigurationCacheService.getConfig();
        $scope.previousConfig = angular.copy($scope.config);
    };
  
    $scope.saveConfig = function(){
        if($scope.dataChanged){
            $scope.confirmSave(ConfigurationCacheService.saveConfig);
        }
    };

    $scope.cancelUpdate = function(){
        if($scope.dataChanged){
            ConfigurationCacheService.saveConfig($scope.config);
            $scope.confirmCancel($scope.resetConfig);
        } else {
            alert("unimplemented. Will go to 'home' screen")
        }
    };

    $scope.dataUpdated = function(){
        $scope.dataChanged = true;
    };

    $scope.resetConfig = function(){
        $scope.config = angular.copy($scope.previousConfig);
        $scope.dataChanged = false;
    };

    $scope.confirmCancel = function(callBack){
        var myPopup = $ionicPopup.show({
        template: '<p>Cancel app config updated </p>',
        title: 'App config',
        scope: $scope,
        buttons: [
          {text: 'No',
          type: 'button-royal'},
          { text: 'Yes',
          type: 'button-positive',
          onTap: function(e){
              callBack();
              e.preventDefault;
            }
          }
        ]
      });
    };

    $scope.confirmSave = function(callBack){
        var myPopup = $ionicPopup.show({
        template: '<p>Update app config</p>',
        title: 'App config',
        scope: $scope,
        buttons: [
        { text: 'No',
          type: 'button-royal'},
          { text: 'Yes',
          type: 'button-positive',
          onTap: function(e){
                callBack($scope.config);
                $scope.previousConfig = angular.copy($scope.config);
                $scope.dataChanged = false;
                e.preventDefault;
            }
          }
          
        ]
      });
    };

    $scope.init();
    */
}

