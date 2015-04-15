'use strict';

angular.module('cmmsApp')
.factory('categoryFactory', ['$http','sosvos', 
    function($http,sosvos) {
        // Service logic
        // Public API here
        return {
                                            
            index: function(type, pageSize, page, orderBy, search, callback) {
                if (search == '') {
                    search = '$';
                }
                sosvos
                .init()
                .defaultError()
                .success(callback)
                .get('/api/categories/' + type + '/' + pageSize + '/' + page + '/' + orderBy + '/' + search);
            },
            getById: function(type, id, callback) {
                 sosvos
                 .init()
                .defaultError()
                .success(callback)
                .get('/api/categories/' + type + '/' + id);
            },
            update: function(type, id, item, callback) {
                 sosvos
                 .init()
                .defaultError()
                .success(callback)
                .put('/api/categories/' + type + '/' + id, item);
            },
            create: function(type, item, callback) {
                 sosvos
                .init()
                .defaultError()
                .success(callback)
                .post('/api/categories/' + type, item);
            },
            delete: function(type, id, callback) {
                 sosvos
                .defaultError()
                .success(callback)
                .delete('/api/categories/' + type + '/' + id);
            }
        };
    }
]);
