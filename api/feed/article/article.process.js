const _ = require('lodash');
const fs = require('fs-extra');
const feedCtrl = require('./../feed.controller');
const articleCtrl = require('./article.controller');
const Config = require('./../../../config');
const completedPath = Config.file.completedPath;
const tempPath = Config.file.tempPath;
const request = require('request');
const progress = require('request-progress');
const rp = require('request-promise');
const cronTask = require('node-cron');
var repetitor = null;
var downloads = {};
const regexpCD = /filename="([^"\\]*(?:\\.[^"\\]*)*)"/i;

fs.watchFile(feedCtrl.cronPath, function() {
	load();
});

function load() {
	if(!!repetitor) {
		repetitor.destroy();
	}
	feedCtrl.delay(function(err, cron) {
		if(err) {
			console.error(err);
		}
		repetitor = cronTask.schedule(cron || '*/5 * * * *', function(){
	  		feedCtrl.refreshAll(function(err) {
	  			console.error(err);
	  		});
		});
	});
}

exports.start = function() {
	fs.ensureDirSync(tempPath);
	fs.ensureDirSync(completedPath);
	articleCtrl.articles(function(err, articles) {
		if(!err) {
			_(articles).forEach(function(article) {
				if(article.state === "NEW" || article.state === "DOWNLOADING") {
					download(article);
				}
			});
		}
		load();
	});
};

exports.clean = function() {
	for(var dl in downloads) {
		downloads[dl].cancel();
	}
	fs.removeSync(tempPath);
};

exports.on = function(event, article) {
	if(event === "save") {
		switch(article.state) {
			case "NEW":
				download(article);
				break;
			case "DELETED":
				cancel(article._id);
				break;
			default: break;
		}
	}
};

function download(article) {
	fs.ensureDirSync(tempPath);
	fs.ensureDirSync(completedPath);
	if(!fileExist(tempPath + article.title) && !fileExist(completedPath + article.title)) {
		downloads[article._id] = rp(article.url);
		progress(downloads[article._id], {})
			.on('progress', function (state) {
				
					if(article.state === "NEW") {
						article.state = "DOWNLOADING";
						article.size = state.size.total || -1;
						var contentDisposition = downloads[article._id].responseContent.headers['content-disposition'];
						var fileName = regexpCD.exec(contentDisposition)[1];
						article.fileName = fileName || -1;
					}
					if(article.state === "DOWNLOADING") {
						article.progress = state.percentage || -1;
						article.speed = state.speed || -1;
						article.transferred = state.size.transferred || -1;
						article.eta = state.time.remaining || -1;
						article.save();
					}
			})
			.on('error', function (err) {
				console.error(err);
			    article.state = "ERROR";
			    article.save();
			})
			.on('end', function (err) {
			    // Do something with err
			    if(err) {
			    	console.error(err);
			    	article.state = "ERROR";
			    	article.save();
			    } else {
			    	if(article.state === "DOWNLOADING" && !!downloads[article._id]) {
			    		fs.move(tempPath + article.title, completedPath + article.fileName, function (err) {
							if (err) { 
								console.error(err);
							} else {
					  			article.state = "DOWNLOADED";
					  			article.save();
							}
			    		});
			    	} else {
			    		if(fileExist(tempPath + article.title)) {
			    			fs.removeSync(tempPath + article.title);
			    		}
			    	}
			    }
			})
			.pipe(fs.createWriteStream(tempPath + article.title));
	}
}

function cancel(articleId) {
	if(!!downloads[articleId]) {
		downloads[articleId].cancel();
		delete downloads[articleId];
	} else {
		console.error("IMPOSSIBLE TO CANCEL UNKNOWN DOWNLOAD");
	}
}

function fileExist(file) {
	try {
    	fs.accessSync(file, fs.F_OK);
	    return true;
	} catch (e) {
	    return false;
	}
}