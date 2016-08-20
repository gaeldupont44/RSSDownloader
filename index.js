'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const config = require('./config');
const server = new Hapi.Server();
server.connection({ routes: { cors: true }, port: 3000 });


// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

});

server.route(
	{
        method: 'GET',
    	path: '/{param*}',
    	handler: {
        	directory: {
				path: "client/www",
				index: true
    	    }
    	}
    }
);

server.route(
	{
	    method: 'GET',
	    path: '/api',
	    handler: function (request, reply) {
	        reply('Hello, world!');
	    }
	}
);

require('./routes')(server);

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});