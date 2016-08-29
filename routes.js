/**
 * Main application routes
 */

'use strict';

module.exports = function(server, socketio) {
	server.route(require('./api/check'));
	server.route(require('./api/feed'));
	server.route(require('./api/feed/article'));
	server.route(require('./api/file'));
};