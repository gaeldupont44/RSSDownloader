/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(server, socketio) {
	server.route(require('./api/feed'));

};
