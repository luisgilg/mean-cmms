'use strict';

describe('Controller: MonitorOSCtrl', function () {

  // load the controller's module
  beforeEach(module('cmmsApp'));

  var MonitorOSCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MonitorOSCtrl = $controller('MonitorOSCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
