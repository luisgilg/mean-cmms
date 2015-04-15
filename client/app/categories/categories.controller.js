'use strict';

angular.module('cmmsApp')
.controller('CategoryCtrl', ['$scope', '$state', '$stateParams', 'categoryFactory', '$window', 
    function($scope, $state, $stateParams, categoryFactory, $window) {
        var type = $stateParams.type || 'business';
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
            case "business":
                $scope.title = 'Business category management';
                $scope.typeLabel = type;
                break;
            case "unit":
                $scope.title = 'Unit category management';
                $scope.typeLabel = type;
                break;
            case "installation":
                $scope.title = 'Installation category management';
                $scope.typeLabel = type;
                break;
            case "industry":
                $scope.title = 'Industry category management';
                $scope.typeLabel = type;
                break;
            default:
                            
                return $state.go('404');
                break;
        }
        
        $scope.index = function() {
            
            categoryFactory.index(type, $scope.pageSize, $scope.currentPage, $scope.orderBy, $scope.searchInput, 
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
            return $state.go('CategoryCreate', {type: type});
        }
        
        
        $scope.edit = function(item) {
            return $state.go('CategoryEdit', {type: type,id: item._id});
        
        }
        $scope.delete = function(item) {
            var confirm = $window.confirm('Are you absolutely sure you want to delete?');
            if (confirm) {
                categoryFactory.delete(type, item._id, function(data) {                  
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
.controller('CategoryEditCtrl', ['$scope', '$state', '$stateParams', 'categoryFactory', 
    function($scope, $state, $stateParams, categoryFactory) {
        var type = $stateParams.type || 'business';
        var id = $stateParams.id;
        
        switch (type) {
            case "business":
                $scope.title = 'Edit business category';
                $scope.typeLabel = type;
                break;
            case "unit":
                $scope.title = 'Edit unit category';
                $scope.typeLabel = type;
                break;
            case "installation":
                $scope.title = 'Edit installation category';
                $scope.typeLabel = type;
                break;
            case "industry":
                $scope.title = 'Edit industry category';
                $scope.typeLabel = type;
                break;
            default:
                return $state.go('404');
                break;
        
        }
        
        categoryFactory.getById(type, id, function(data) {            
            $scope.item = data;
        });
        
        
        $scope.cancel = function() {
            return $state.go('Category', {type: type});
        };
        $scope.done = function(item) {
            categoryFactory.update(type, id, item, function(data) {                
                return $state.go('Category', {type: type});
            });
        };
    
    }])
.controller('CategoryCreateCtrl', ['$scope', '$state', '$stateParams', 'categoryFactory', 
    function($scope, $state, $stateParams, categoryFactory) {
        var type = $stateParams.type || 'business';
        
        switch (type) {
            case "business":
                $scope.title = 'Create business category';
                $scope.typeLabel = type;
                break;
            case "unit":
                $scope.title = 'Create unit category';
                $scope.typeLabel = type;
                break;
            case "installation":
                $scope.title = 'Create installation category';
                $scope.typeLabel = type;
                break;
            case "industry":
                $scope.title = 'Create industry category';
                $scope.typeLabel = type;
                break;
            default:
                return $state.go('404');                
                break;
        
        }
        
        $scope.cancel = function() {
            return $state.go('Category', {type: type});
        };
        $scope.done = function(item) {
            categoryFactory.create(type, item, function(data) {                
                return $state.go('Category', {type: type});
            });
        };
    
    }]);
