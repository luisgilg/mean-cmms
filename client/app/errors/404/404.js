'use strict';

angular.module('cmmsApp')
.config(function($stateProvider) {
    $stateProvider
    .state('404', {
        url: '/404',
        templateUrl: 'app/errors/404/404.html',
        controller: '404Ctrl'
    });
});
