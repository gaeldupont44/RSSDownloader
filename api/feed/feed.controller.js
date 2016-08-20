/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/rss/feeds/:rss         ->  index
 * POST    /api/rss/feeds              ->  create
 * DELETE    /api/rss/feeds/:id        ->  destroy
 */

'use strict';

const _ = require('lodash');
const Feed = require('./feed.model');
const url = require('url');


// Get list of feeds
exports.getAll = function(req, res) {
	  Feed.find({}, function (err, rss) {
	    if(err) { return res(err).code(500); }
	    return res(rss).code(200);
	  });
};

exports.create = function(req, res){
	Feed.find({}, function (err, rss) {
	    if(err) { return res(err).code(500); }
	    var feed = new Feed({
	    	name: req.payload.name,
	    	url: req.payload.url
	    });
		feed.save();
		return res(feed).code(201);
	});
	
};

// Delete a rss in the DB.
exports.deleteOne = function(req, res) {
	console.log(req.params.id);
  Feed.findByIdAndRemove(req.params.id, function(err, feed){
  	if(err) { return res(err).code(500); }
  	if(!feed) { return res(err).code(404); } 
  	return res().code(204);
  });
};

exports.destroyAll = function(req, res) {
  Feed.remove({rss: req.params.rss }, function(err, feeds){
  	if(err) { return res.status(500).json({error: err}); }
  	return res.status(200).json(feeds);
  });
};