'use strict';

angular.module('cmmsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
    
    .when('/location','/location/country')
    .when('/location/:action/:type','/location/:action/:type')

    .when('/country','/location/country')
    .when('/country/:action','/location/:action/country')


    .when('/categories','/categories/business')
    .when('/categories/:action/:type','/categories/:action/:type')

    .when('/buisinessCategory','/categories/business')
    .when('/buisinessCategory/:action','/categories/:action/business')

    .when('/404','/404')
    .when('/500/:any','/500')
    
    
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });