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
		{
		    method: 'GET',
		    path: '/api/feed/{id}/refresh',
		    handler: controller.refresh
		},
		{
		    method: 'GET',
		    path: '/api/feed/delay',
		    handler: controller.getDelay
		},
		{
		    method: 'POST',
		    path: '/api/feed/delay',
		    handler: controller.setDelay,
		    config: {
		    	validate: {
		    		payload: {
					    cron: Joi.string().required()
					}
		    	}
		    }
		},
		
	];

module.exports = routes;

