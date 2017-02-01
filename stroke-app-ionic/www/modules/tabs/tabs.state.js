'use strict';;

angular.module('app').config(TabsState);

TabsState.$inject = ['$stateProvider', '$urlRouterProvider'];

function TabsState($stateProvider, $urlRouterProvider) {

  $stateProvider.state('tabs', {
    url: '/tabs',
    abstract: true,
    templateUrl: 'modules/tabs/tabs.html'
  });

}