'use strict';

angular.module('cmmsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('charts', {
        url: '/charts',
        templateUrl: 'app/charts/charts.html',
        controller: 'ChartsCtrl'
      });
  });