angular.module('RSSDownloader.settings')
.factory('SettingsService', SettingsService);

function SettingsService(HttpService) {
	
	return {
		feedCreate: feedCreate,
		feedDelete: feedDelete,
		feedGetAll: feedGetAll
	};
	
	function feedCreate(data) {
		return HttpService.post(API.Routes.Feeds, {}, data);
	}
	
	function feedDelete(id) {
		return HttpService.delete(API.Routes.Feed, { id: id });
	}
	
	function feedGetAll() {
		return HttpService.get(API.Routes.Feeds);
	}
}