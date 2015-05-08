'use strict';

angular.module('cmmsApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;

    $scope.options = [{
      'title': 'Countries',
      'link': '/location/country'
    },
    {
      'title': 'Organization',
      'link': '/location/organization'
    },
    {
      'title':'Business category',
      'link':'/categories/business'
    },
    {
      'title':'Unit category',
      'link':'/categories/unit'
    },
    {
      'title':'Industry category',
      'link':'/categories/industry'
    },
    {
      'title':'Installation category',
      'link':'/categories/installation'
    },
    {
      'title':'Charts',
      'link':'/charts'
    },
    {
      'title':'Monitor OS',
      'link':'/monitorOS'
    }];

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });