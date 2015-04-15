'use strict';

angular.module('cmmsApp')
.config(function($stateProvider) {
    $stateProvider
    .state('location', {
        url: '/location/:type',
        templateUrl: 'app/location/location.html',
        controller: 'LocationCtrl'
    })
    .state('locationCreate', {
        url: '/location/:type/create',
        templateUrl: 'app/location/locationDetails.html',
        controller: 'LocationCreateCtrl'
    })
    .state('locationEdit', {
        url: '/location/:type/edit/:id',
        templateUrl: 'app/location/locationDetails.html',
        controller: 'LocationEditCtrl'
    });
});
