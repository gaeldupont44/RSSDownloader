angular.module('RSSDownloader.files')
.factory('FilesService', FilesService);

function FilesService(HttpService, SocketioService, Const) {
	
	return {
		delete: del,
		getAll: getAll,
		syncUpdates: syncUpdates,
		unsyncUpdates: unsyncUpdates
	};
	
	function del(name) {
		return HttpService.delete(API.Routes.File, { name: name });
	}
	
	function getAll() {
		return HttpService.get(API.Routes.Files);
	}
	
	function syncUpdates(files){
    	SocketioService.syncUpdates("file", files);
    }
    function unsyncUpdates() {
		SocketioService.unsyncUpdates("file");
    }
}