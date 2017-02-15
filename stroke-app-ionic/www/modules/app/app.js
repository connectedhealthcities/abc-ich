'use strict';

angular.module('app').factory('httpInterceptor', httpInterceptor);

httpInterceptor.$inject = ['$injector'];

function httpInterceptor($injector) {
  return {
    'request': function(config) {
        if( (config.url.indexOf('/api/') > -1) && 
            (config.url.indexOf('/api/authenticate') === -1) ) {
          // use $injector to prevent circular dependency
          var authenticationService = $injector.get('AuthenticationService');
          return authenticationService.authenticate().then(function() {
            config.headers.Authorization = 'Bearer ' + authenticationService.getJwt();
            return config;
          });
        }
        else {
          return config;
        }
      }
  };
}

angular.module('app').config(AppConfig);

AppConfig.$inject = ['$urlRouterProvider', '$ionicConfigProvider', '$sceDelegateProvider','$httpProvider'];

function AppConfig($urlRouterProvider, $ionicConfigProvider, $sceDelegateProvider, $httpProvider) {

  $urlRouterProvider.otherwise("/patient-start");

//cjd - do we need this??
  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

  $httpProvider.interceptors.push('httpInterceptor'); 

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