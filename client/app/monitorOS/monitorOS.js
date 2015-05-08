'use strict';

angular.module('cmmsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('monitorOS', {
        url: '/monitorOS',
        templateUrl: 'app/monitorOS/monitorOS.html',
        controller: 'MonitorOSCtrl'
      });
  });