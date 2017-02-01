'use strict';

angular.module('app').config(AppConfig);

AppConfig.$inject = ['$urlRouterProvider', '$ionicConfigProvider', '$sceDelegateProvider'];

function AppConfig($urlRouterProvider, $ionicConfigProvider, $sceDelegateProvider) {

  $urlRouterProvider.otherwise("/patient-start");

//cjd - do we need this??
  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
}


angular.module('app').run(AppRun);

AppRun.$inject = ['$ionicPlatform'];

function AppRun($ionicPlatform) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}