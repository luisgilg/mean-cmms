'use strict';

angular.module('cmmsApp')
.factory('location', ['$http', 'sosvos', 
    function($http, sosvos) {
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
                .get('/api/locations/' + type + '/' + pageSize + '/' + page + '/' + orderBy + '/' + search);
            },
            getById: function(type, id, callback) {
                sosvos
                .init()
                .defaultError()
                .success(callback)
                .get('/api/locations/' + type + '/' + id);
            },
            update: function(type, id, item, callback) {
                sosvos
                .init()
                .defaultError()
                .success(callback)
                .put('/api/locations/' + type + '/' + id, item);
            },
            create: function(type, item, callback) {
                sosvos
                .init()
                .defaultError()
                .success(callback)
                .post('/api/locations/' + type, item);
            },
            delete: function(type, id, callback) {
                sosvos
                .init()
                .defaultError()
                .success(callback)
                .delete('/api/locations/' + type + '/' + id);
            }
        };
    }

]);
