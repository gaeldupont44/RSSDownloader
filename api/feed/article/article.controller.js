'use strict';

const Article = require('./article.model');
const noop = require('node-noop').noop;

exports.create = function(data, callback) {
	callback = callback || noop;
	Article.findOne({url: data.url}, function (err, article) {
	    if(!!err) { return callback(err); }
	    if(!article) {
			if(!data.feedId, !data.title || !data.url) { return callback("ARTICLE_INVALID"); }
			var newArticle = new Article(data);
			newArticle.save();
			return callback(null, newArticle);
	    } else {
	    	return callback(null, article);
	    }
		
	});
};


// Get list of articles
function getAll(req, res) {
	  articles(function (err, articles) {
	    if(err) { return res({error: err}).code(500); }
	    return res(articles).code(200);
	  });
}

exports.getAll = getAll;

function articles(callback) {
	Article.find({}, function (err, articles) {
	    if(err) { callback(err); }
	    callback(null, articles);
	});
}

exports.articles = articles;

// Delete an article in the DB.
exports.deleteOne = function(req, res) {
  Article.findById(req.params.id, function(err, article){
  	if(err) { return res({error: err}).code(500); }
  	if(!article) { return res({error: err}).code(404); }
  	article.state = "DELETED";
  	article.save();
  	return res().code(204);
  });
};
