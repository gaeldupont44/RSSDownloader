'use strict';

var controller = require('./file.controller');
const Config = require('./../../config');
const completedPath = Config.file.completedPath;
const tempPath = Config.file.tempPath;

var routes = [
		{
		    method: 'GET',
		    path: '/api/file',
		    handler: controller.getAll
		},
		{
	        method: 'GET',
	    	path: '/api/file/{name}',
	    	handler: {
	        	directory: {
					path: completedPath,
					index: true
	    	    }
	    	}
		},
		{
		    method: 'DELETE',
		    path: '/api/file/{name}',
		    handler: controller.delete
		}
	];

module.exports = routes;

