angular.module('RSSDownloader.articles')
.factory('ArticlesService', ArticlesService);

function ArticlesService(HttpService, SocketioService, Const) {
	
	return {
		delete: del,
		getAll: getAll,
		syncUpdates: syncUpdates,
		unsyncUpdates: unsyncUpdates
	};
	
	function del(id) {
		return HttpService.delete(API.Routes.Article, { id: id });
	}
	
	function getAll() {
		return HttpService.get(API.Routes.Articles);
	}
	
	function syncUpdates(articles){
    	SocketioService.syncUpdates("article", articles);
    }
    function unsyncUpdates() {
		SocketioService.unsyncUpdates("article");
    }
}