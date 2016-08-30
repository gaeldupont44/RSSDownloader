'use strict';

var routes = [
		{
		    method: 'GET',
		    path: '/api/check',
		    handler: function(req, res) {
		    	return res().code(200);
		    }
		}
	];

module.exports = routes;

