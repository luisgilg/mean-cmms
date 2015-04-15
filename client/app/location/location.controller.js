'use strict';

function showField(type, fieldName) {
    if (type == 'organization')
        return fieldName == 'business' || fieldName == 'industry';
}

function requireField(type, fieldName) {
    if (type == 'organization')
        return fieldName == 'business' || fieldName == 'industry';
}

angular.module('cmmsApp')
.controller('LocationCtrl', ['$scope', '$state', '$stateParams', 'location', '$window', 
    function($scope, $state, $stateParams, location, $window) {
        var type = $stateParams.type || 'country';
        
        if ($stateParams.page) {
            $scope.currentPage = $stateParams.page;
        } else {
            $scope.currentPage = 1;
        }
        
        if ($stateParams.pageSize) {
            $scope.pageSize = $stateParams.pageSize;
        } else {
            $scope.pageSize = 20;
        }
        
        $scope.maxSize = 18;
        $scope.orderBy = 'code asc';
        $scope.searchInput = '';
        
        switch (type) {
            case 'country':
                $scope.title = 'Country management';
                $scope.typeLabel = type;
                break;
            
            case 'organization':
                $scope.title = 'Organization management';
                $scope.typeLabel = type;
                break;
            default:
                
                return $state.go('404');
                break;
        
        }
        
        $scope.showField = showField;
        $scope.requireField = requireField;
        
        $scope.index = function() {
            
            location.index(type, $scope.pageSize, $scope.currentPage, $scope.orderBy, $scope.searchInput, 
            function(result) {
                
                $scope.items = result.data;
                $scope.totalItems = result.totalItems; //Total de items
                $scope.numPages = $scope.totalItems % $scope.pageSize;
            }
            );
        }
        
        $scope.index();
        
        
        $scope.pageChanged = function() {
            $scope.index();
        };
        
        $scope.searchKeypress = function($event, query) {
            if ($event.keyCode == 13) {
                $scope.search(query);
            }
        }
        
        $scope.search = function(query) {
            $scope.index();
        
        }
        $scope.create = function() {
            return $state.go('locationCreate', {type: type});
        }
        
        
        $scope.edit = function(item) {
            return $state.go('locationEdit', {type: type,id: item._id});
        
        }
        $scope.delete = function(item) {
            var confirm = $window.confirm('Are you absolutely sure you want to delete?');
            if (confirm) {
                location.delete(type, item._id, function(data) {
                    
                    var index = $scope.items.indexOf(item);
                    $scope.items.splice(index, 1);
                })
            }
        }
        $scope.sort = function(sort) {
            var sParams = sort.split(' ');
            var cParams = $scope.orderBy.split(' ');
            
            var sentido = 'asc';
            
            if (sParams[0] == cParams[0]) {
                sentido = cParams[1] == 'asc' ? 'desc' : 'asc';
            }
            
            $scope.orderBy = sParams[0] + ' ' + sentido;
            $scope.currentPage = 1;
            
            $scope.index();
        
        }
        
    }

])
.controller('LocationEditCtrl', ['$scope', '$state', '$stateParams', 'location', 'categoryFactory', 
    function($scope, $state, $stateParams, location, categoryFactory) {
        var type = $stateParams.type || 'country';
        var id = $stateParams.id;
        
        switch (type) {
            case 'country':
                $scope.title = 'Edit country';
                $scope.typeLabel = type;
                break;
            case 'organization':
                $scope.title = 'Edit organization';
                $scope.typeLabel = type;

                categoryFactory.index('business', 150, 1, 'name', '', function(result) {                    
                    $scope.businessItems = result.data;
                });

                categoryFactory.index('industry', 150, 1, 'name', '', function(result) {                   
                    $scope.industryItems = result.data;
                });

                break;
            default:
                return $state.go('404');
                break;
        
        }

        $scope.showField = showField;
        $scope.requireField = requireField;
               
        location.getById(type, id, function(data) {            
            $scope.item = data;
        });
                
        $scope.cancel = function() {
            return $state.go('location', {type: type});
        };

        $scope.done = function(item) {
            location.update(type, id, item, function(data) {                
                return $state.go('location', {type: type});
            });
        };    
    }])
.controller('LocationCreateCtrl', ['$scope', '$state', '$stateParams', 'location', 'categoryFactory', 
    function($scope, $state, $stateParams, location, categoryFactory) {
        var type = $stateParams.type || 'country';
        
        switch (type) {
            case 'country':
                $scope.title = 'Create country';
                $scope.typeLabel = type;
                break;
            case 'organization':
                $scope.title = 'Create organization';
                $scope.typeLabel = type;
                
                categoryFactory.index('business', 150, 1, 'name', '', function(result) {                    
                    $scope.businessItems = result.data;
                });                
                categoryFactory.index('industry', 150, 1, 'name', '', function(result) {
                    
                    $scope.industryItems = result.data;
                });
                
                break;
            default:
                return $state.go('404');
                break;
        }

        $scope.showField = showField;
        $scope.requireField = requireField;

        $scope.cancel = function() {
            return $state.go('location', {type: type});
        };
        $scope.done = function(item) {
            location.create(type, item, function(data) {                
                return $state.go('location', {type: type});
            });
        };
            
    }]);
