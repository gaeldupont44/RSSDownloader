'use strict';

var express = require('express');
var controller = require('./feed.controller');

var router = express.Router();

router.get('/:id', controller.show); //Get all Feeds from 1flow
router.post('/', controller.create); //Create a feed in 1Flow
router.delete('/:id', controller.destroyOne); //Delete a feed in1Flow
router.delete('/empty/:rss', controller.destroyAll); //Delete all feeds in1Flow
module.exports = router;

module.exports = router;
