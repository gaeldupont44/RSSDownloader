'use strict';
angular.module('RSSDownloader')
.filter('byte', function() {
	return function(bytes, precision) {
		if (isNaN(parseFloat(bytes)) || !isFinite(bytes) || bytes == 0 ) return '0' ;
		if (typeof precision === 'undefined') precision = 1;
		var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
			number = Math.floor(Math.log(bytes) / Math.log(1024));
		return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
	}
});