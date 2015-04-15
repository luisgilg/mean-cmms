'use strict';

angular.module('cmmsApp')
.config(function($stateProvider) {
    $stateProvider
    .state('500', {
        url: '/500',
        templateUrl: 'app/errors/500/500.html',
        controller: '500Ctrl'
    });
});
