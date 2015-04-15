angular.module('cmmsApp')
.factory('sosvos', ['$http','$state', 
    function($http,$state) {
        // Service logic
        // ...

        // Public API here
        var SosVos = function(){
                return {
                    _success:function(){},
                    _error:function(err){},
                    init:function(){
                        return new SosVos();
                    },
                    defaultError:function(){
                       var _this= this;
                       this.error(
                        function(err,status){
                           if (status==500) {
                               return $state.go('500');
                           }
                           if(status==404){
                               return $state.go('404');
                           }
                           return $state.go('500');
                        }
                       );
                       return _this;
                    },
                    errorNext:function(){
                        var _this = this;
                        _this.error(function(){
                            if (_this._success){
                                return _this._success(arguments);
                            }
                        });
                        return _this;
                    },
                    success:function(callback){
                        var _this=this;
                        _this._success=callback;
                        return _this;
                    },
                    error:function(callback){
                        var _this=this;
                        _this._error=callback;
                        return _this;
                    },
                    get:function(url){
                        var _this=this;
                        $http.get(url)
                        .success(function(data, status, headers, config){
                            if (_this._success){
                                return _this._success(data);
                            }                    
                        })
                        .error(function(data, status, headers, config){
                            if (_this._error){
                                return _this._error(data,status);
                            }
                        });
                        return _this;
                    },
                    post:function(url,obj){
                        var _this=this;
                        $http.post(url,obj)
                        .success(function(data, status, headers, config){
                            if (_this._success){
                                return _this._success(data);
                            }                    
                        })
                        .error(function(data, status, headers, config){
                            if (_this._error){
                                return _this._error(data,status);
                            }
                        });
                        return _this;

                    },
                    put:function(url,obj){
                        var _this=this;
                         $http.put(url,obj)
                        .success(function(data, status, headers, config){
                            if (_this._success){
                                return _this._success(data);
                            }                    
                        })
                        .error(function(data, status, headers, config){
                            if (_this._error){
                                return _this._error(data,status);
                            }
                        });
                        return _this;
                    },
                    delete:function(url){
                        var _this=this;
                        $http.delete(url)
                        .success(function(data, status, headers, config){
                            if (_this._success){
                                return _this._success(data);
                            }                    
                        })
                        .error(function(data, status, headers, config){
                            if (_this._error){
                                return _this._error(data,status);
                            }
                        });
                        return _this;
                    },
                    call:function(err){
                        var _this=this;
                        var arg = [].slice(arguments,1);
                        if(err){
                           return _this._error(err,arg);
                        }
                        return _this._success(arg);
                    }
                };
        }
        return new SosVos();

    }
]);
