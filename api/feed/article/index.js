'use strict';

var controller = require('./article.controller');

var routes = [
		{
		    method: 'GET',
		    path: '/api/feed/article',
		    handler: controller.getAll
		},
		{
		    method: 'DELETE',
		    path: '/api/feed/article/{id}',
		    handler: controller.deleteOne
		}
	];
	
module.exports = routes;

