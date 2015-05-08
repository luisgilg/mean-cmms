'use strict';

angular.module('cmmsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('monitorObraSocial', {
        url: '/monitorObraSocial',
        templateUrl: 'app/monitorObraSocial/monitorObraSocial.html',
        controller: 'MonitorObraSocialCtrl'
      });
  });