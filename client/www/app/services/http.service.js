angular.module('RSSDownloader')
.factory("HttpService", HttpService);

function HttpService($http) {
	
	function parseUrl(url, params) {
		if(!!params) {
			if(url.split('{').length-1 === url.split('}').length-1 && url.split('{').length-1 === _.keys(params).length) {
				_.forOwn(params, function(value, key) {
					url = url.replace(new RegExp('{' + key+ '}', 'gi'), value);
				});
			}
		}
		return url;
	}
	
	var _timeout = 15000;
  	
  	return {
  		delete: del,
  		get: get,
  		post: post,
  		put: put
  	};
  	
  	function del(url, params, data){
  		return $http({
		    url: parseUrl(url, params), 
		    method: "DELETE",
		    timeout: _timeout
		 })
		 .then(function(response) {
		 	return response.data;
		 });
  	}
  	
  	function get(url, params){
  		return $http({
		    url: parseUrl(url, params), 
		    method: "GET",
		    timeout: _timeout
  		})
		 .then(function(response) {
		 	return response.data;
		 });
  	}
  	
  	function post(url, params, data){
  		return $http({
		    url: parseUrl(url, params), 
		    method: "POST",
		    data: data
  		})
		 .then(function(response) {
		 	return response.data;
		 });
  	}
  	
  	function put(url, params, data){
  		return $http({
		    url: parseUrl(url, params), 
		    method: "PUT",
		    data: data
  		})
		 .then(function(response) {
		 	return response.data;
		 });
  	}
  	
}