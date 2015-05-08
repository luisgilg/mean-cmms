'use strict';

describe('Controller: MonitorObraSocialCtrl', function () {

  // load the controller's module
  beforeEach(module('cmmsApp'));

  var MonitorObraSocialCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MonitorObraSocialCtrl = $controller('MonitorObraSocialCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
