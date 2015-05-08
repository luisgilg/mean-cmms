'use strict';

describe('Directive: tarjetaOs', function () {

  // load the directive's module and view
  beforeEach(module('cmmsApp'));
  beforeEach(module('app/tarjetaOs/tarjetaOs.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tarjeta-os></tarjeta-os>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the tarjetaOs directive');
  }));
});