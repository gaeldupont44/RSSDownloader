/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/rss/feeds/:rss         ->  index
 * POST    /api/rss/feeds              ->  create
 * DELETE    /api/rss/feeds/:id        ->  destroy
 */

'use strict';
const path = require('path');
const _ = require('lodash');
const Article = require('./article/article.controller');
const Feed = require('./feed.model');
const url = require('url');
const parser = require('rss-parser');
const fs = require('fs-extra');
const cronPath = path.join(__dirname, "cron");

exports.cronPath = cronPath;

// Get list of feeds
exports.getAll = function(req, res) {
	  Feed.find({}, function (err, rss) {
	    if(err) { return res({error: err}).code(500); }
	    return res(rss).code(200);
	  });
};

exports.create = function(req, res) {
	Feed.findOne({url: req.payload.url}, function (err, feed) {
	    if(err) { console.log("error bdd", err); return res({error: err}).code(500); }
	    if(feed) { return res({error: "FEED_ALREADY_EXIST"}).code(400); }
		getFeedTitle(req.payload.url, function(err, title) {
			if(err) { return res({error: "FEED_INVALID"}).code(400); }
			
			var feed = new Feed({
				title: title,
	    		url: req.payload.url
	    	});
	    	
			feed.save();
			return res(feed).code(201);
		});
	});
};

// Delete a rss in the DB.
exports.deleteOne = function(req, res) {
	console.log(req.params.id);
  Feed.findByIdAndRemove(req.params.id, function(err, feed){
  	if(err) { return res({error: err}).code(500); }
  	if(!feed) { return res().code(404); } 
  	return res().code(204);
  });
};

exports.refresh = function(req, res) {
	refreshOne(req.params.id, function(err) {
		if(err) { return res({error: err}).code(500); }
		return res().code(204);
	});
			
};

function refreshOne(id, callback) {
	Feed.findById(id, function(err, feed) {
		console.log("Refreshing " + feed.title);
		getFeedArticles(feed.url, function(err, articles) {
			if(err) { return callback(err); }
			if(!!articles) {
				_(articles).forEach(function(article) {
					var data = {
						feed: feed._id,
						title: decodeURIComponent(article.title),
						url: article.link,
						date: article.pubDate
					};
					Article.create(data, function (err, article) {
					  if (err) return callback(err);
					});
				});
			}
			return callback(null);
		});
	});
}

exports.refreshOne = refreshOne;

exports.refreshAll = function(callback) {
	Feed.find({}, function(err, feeds) {
		if(!!feeds.length) {
			_(feeds).forEach(function(feed) {
				console.log("Refreshing " + feed.title);
				getFeedArticles(feed.url, function(err, articles) {
					if(err) { return callback(err); }
					if(!!articles) {
						_(articles).forEach(function(article) {
							var data = {
								feed: feed._id,
								title: decodeURIComponent(article.title),
								url: article.link,
								date: article.pubDate
							};
							Article.create(data, function (err, article) {
							  if (err) return callback(err);
							});
						});
					}
				});
			});
		}
	});
};

function getFeedArticles(url, callback) {
	parser.parseURL(url, function(err, parsed) {
		if(err) { return callback(err); }
		return callback(null, parsed.feed.entries);
	});
}

function getFeedTitle(url, callback) {
	parser.parseURL(url, function(err, parsed) {
		if(err) { return callback(err); }
		return callback(null, parsed.feed.title);
	});
}

exports.getDelay = function(req, res) {
	delay(function(err, cron) {
		if(err) { return res({error: err}).code(500); }
		return res(cron).code(200);
	});
};

exports.setDelay = function(req, res) {
	fs.writeFile(cronPath, req.payload.cron, 'utf8', function(err) {
		if(err) { return res({error: err}).code(500); }
		return res().code(204);
	});
};

function delay(callback) {
	fs.readFile(cronPath, 'utf8', callback);
}

exports.delay = delay;
