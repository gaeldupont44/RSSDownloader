/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/rss/feeds/:rss         ->  index
 * POST    /api/rss/feeds              ->  create
 * DELETE    /api/rss/feeds/:id        ->  destroy
 */

'use strict';

var _ = require('lodash');
var Feed = require('./feed.model');
var url = require('url');

// Get list of feeds
exports.show = function(req, res) {
	if(req.params.rss){
	  Feed.find({ user: req.user._id, rss: req.params.rss}, function (err, rss) {
	    if(err) { return res.status(500).json({error: err}); }
	    return res.status(200).json(rss);
	  });
	} else {
		return res.status(400).json({error: "NO_RSS_NAME"});
	}
};

// Creates a new feed in the DB.
exports.create = function(req, res) {
  if(req.body.rss){
	  delete req.body.date;
	  Feed.findOne({_id: req.body.rss}, function(err, rss){
	  	if(rss){
	  		console.log(rss);
	  		if(rss.user.equals(req.user._id)){
	  			Feed.find({user: req.user._id, rss: req.body.rss}, function(err, feeds){
				  	if(feeds.length === 0){
				  		createFeed(req, res);
				  	} else {
				  		var exist = false;
				  		for(var i=0, len=feeds.length ; i<len ; i++){
				  			var parsedNewFeedurl = url.parse(req.body.url);
				  			var parsedCurrentFeedUrl = url.parse(feeds[i].url);
				  			//MUST CHANGE TO COMPARE ONLY PATH AND NAME
				  			if(parsedNewFeedurl.path === parsedCurrentFeedUrl) {
				  				exist = true;
				  				return res.status(201).json(feeds[i]);
				  			}
				  		}
				  		if(!exist) {
				  			return createFeed(req, res);
				  		}
				  	}
				 });
	  		} else { res.status(403).end(); }
	  	} else {
	  		return res.status(404).end();
	  	}
	  });
  } else {
  	return res.status(400).json({error: "FEED_INVALID"});
  }
};

function createFeed(req, res){
	var feed = new Feed(_.merge({ user: req.user._id }, req.body));
	feed.save();
	return res.status(201).json(feed);
}

// Delete a rss in the DB.
exports.destroyOne = function(req, res) {
  Feed.findByIdAndRemove(req.params.id, function(err, feed){
  	if(err) { return res.status(500).json({error: err}); }
  	return res.status(200).json(feed);
  });
};

exports.destroyAll = function(req, res) {
  Feed.remove({rss: req.params.rss }, function(err, feeds){
  	if(err) { return res.status(500).json({error: err}); }
  	return res.status(200).json(feeds);
  });
};

exports.removeAllFromUser = function(userId, cb) {
	Feed.remove({user: userId}, function(err){
		cb(err);
	});
};