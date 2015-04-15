'use strict';

describe('Controller: LocationCtrl', function() {

    // load the controller's module
    beforeEach(module('cmmsApp'));
    
    var LocationCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        LocationCtrl = $controller('LocationCtrl', {
            $scope: scope
        });
    }));
    
    it('should ...', function() {
        expect(1).toEqual(1);
    });
});
