const fs = require('fs-extra');
const ctrl = require('./file.controller');
const Config = require('./../../config');
const completedPath = Config.file.completedPath;
const tempPath = Config.file.tempPath;

module.exports = function (socketio) {
	fs.watch(completedPath, function(eventType, fileName) {
		if(!!fileName) {
			if(fileExist(completedPath + fileName)) {
				socketio.emit('file:save', ctrl.getFileInfo(fileName));
			} else {
				socketio.emit('file:remove', { _id: fileName });
			}
		}
	});
};

function fileExist(file) {
	try {
    	fs.accessSync(file, fs.F_OK);
	    return true;
	} catch (e) {
	    return false;
	}
}