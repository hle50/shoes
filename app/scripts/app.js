'use strict';

/**
 * @ngdoc overview
 * @name slimApp
 * @description
 * # slimApp
 *
 * Main module of the application.
 */
angular
  .module('slimApp', [
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home',{
        url: '/home',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    })
  })
  .run(function($state){
    $state.transitionTo('home');
  });
