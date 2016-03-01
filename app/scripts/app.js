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
    'ngCookies',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'categoryService',
    'angular-loading-bar',
    'ngAnimate',
    'angularUtils.directives.dirPagination',
    'angularMoment',
    'toastr',
    'ngFileUpload'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
  })
  .run(function ($state) {
    $state.transitionTo('home');
  });
