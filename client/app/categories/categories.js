'use strict';

angular.module('cmmsApp')
.config(function($stateProvider) {
    $stateProvider
    .state('Category', {
        url: '/categories/:type',
        templateUrl: 'app/categories/categories.html',
        controller: 'CategoryCtrl'
    })
    .state('CategoryCreate', {
        url: '/categories/:type/create',
        templateUrl: 'app/categories/categoriesDetails.html',
        controller: 'CategoryCreateCtrl'
    })
    .state('CategoryEdit', {
        url: '/categories/:type/edit/:id',
        templateUrl: 'app/categories/categoriesDetails.html',
        controller: 'CategoryEditCtrl'
    });
});
