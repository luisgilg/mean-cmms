 //controler
angular.module('cmmsApp')
.controller('404Ctrl', function($scope) {
    $scope.searchKeypress = function($event,searchInput){
        if($event.keyCode==13){
            $scope.search(searchInput);
        }

    }
    $scope.search = function(searchInput){
        console.log(searchInput);
    }

});
