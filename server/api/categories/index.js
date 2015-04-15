'use strict';

var express = require('express');
var controller = require('./categories.controller');

var router = express.Router();
router.get('/:type/:pageSize/:page/:orderBy/:search', controller.index);
router.get('/:type/:id', controller.show);
router.post('/:type', controller.create);
router.post('/populate/:type', controller.populate);
router.put('/:type/:id', controller.update);
router.patch('/:type/:id', controller.update);
router.delete('/:type/:id', controller.destroy);

module.exports = router;