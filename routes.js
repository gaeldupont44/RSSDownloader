/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app, socketio) {
  // Make socketio accessible to our router
  app.use(function(req,res,next){
    req.socketio = socketio;
    next();
  });
  
  // Insert routes below
  app.use('/api/feed', require('./api/feed'));
  

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get((req, res) => {
   		res.status(404).end();
   });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.setHeader('Last-Modified', (new Date()).toUTCString());
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
