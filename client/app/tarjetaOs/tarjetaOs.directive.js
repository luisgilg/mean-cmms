'use strict';

angular.module('cmmsApp')
.directive('tarjetaos', function() {
    return {
        templateUrl: 'app/tarjetaOs/tarjetaOs.html',
        restrict: 'E',
        
        
        transclude: true,
        scope: {
            
            data: '=',
            changed: '='
        
        },
        compile: function compile(tElement, tAttrs, transclude) {
            return {
                pre: function preLink(scope, iElement, iAttrs, controller) {
                    scope.isLoaded = false;
                    
                    scope.onChange = function(item) {
                        if (scope.changed && scope.isLoaded)
                            return scope.changed(item)
                    }
                
                },
                post: function postLink(scope, iElement, iAttrs, controller) {
                    scope.isLoaded = true;
                
                }
            }
        }
    };
});
