/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/rss/feeds/:rss         ->  index
 * POST    /api/rss/feeds              ->  create
 * DELETE    /api/rss/feeds/:id        ->  destroy
 */

'use strict';
const path = require('path');
const _ = require('lodash');
const fs = require('fs-extra');
const cronPath = path.join(__dirname, "cron");
const Config = require('./../../config');
const completedPath = Config.file.completedPath;
const tempPath = Config.file.tempPath;

exports.cronPath = cronPath;

// Get list of completed DL
exports.getAll = function(req, res) {
	var files = [];
	var filesName = fs.readdirSync(completedPath, 'utf8');
	filesName.sort(function(a, b) {
		var first = a.toLowerCase();
		var second = b.toLowerCase();
		if(first < second) return -1;
		if(first > second) return 1;
		return 0;
	}).forEach(function (fileName) {
		var file = getFileInfo(fileName);
		if(!!file) files.push(file);
	});
	return res(files).code(200);
};

function getFileInfo(fileName) {
	var stats = fs.lstatSync(completedPath + fileName);
	var file = null;
	if (!stats.isDirectory()) {
		file = {
			_id: fileName,
			size: stats['size']
		};
	}
	return file;
}

exports.getFileInfo = getFileInfo;

exports.delete = function(req, res) {
	if(fileExist(completedPath + req.params.name)) {
		fs.unlink(completedPath + req.params.name, function(err) {
			if(err) { return res({error: err}).code(500); }
			return res().code(204);
		});
	} else {
		return res().code(404);
	}
	
};

function fileExist(file) {
	try {
    	fs.accessSync(file, fs.F_OK);
	    return true;
	} catch (e) {
	    return false;
	}
}