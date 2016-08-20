'use strict';

var controller = require('./feed.controller');
var Joi = require('joi');

var routes = [
		{
		    method: 'GET',
		    path: '/api/feed',
		    handler: controller.getAll
		},
		{
		    method: 'POST',
		    path: '/api/feed',
		    handler: controller.create,
		    config: {
		    	validate: {
		    		payload: {
					    name: Joi.string().alphanum().min(1).required(),
					    url: Joi.string().uri().required()
					}
		    	}
		    }
		},
		{
		    method: 'DELETE',
		    path: '/api/feed/{id}',
		    handler: controller.deleteOne
		},
	];
/*
router.get('/:id', controller.show); //Get all Feeds from 1flow
router.post('/', controller.create); //Create a feed in 1Flow
router.delete('/:id', controller.destroyOne); //Delete a feed in1Flow
router.delete('/empty/:rss', controller.destroyAll); //Delete all feeds in1Flow
*/
module.exports = routes;

