angular.module('RSSDownloader.settings')
.factory('SettingsService', SettingsService);

function SettingsService(HttpService, localStorageService, Const) {
	
	return {
		checkAPIHost: checkAPIHost,
		getAPIHost: getAPIHost,
		feedGetRefreshDelay: feedGetRefreshDelay,
		feedCreate: feedCreate,
		feedDelete: feedDelete,
		feedGetAll: feedGetAll,
		feedRefresh: feedRefresh,
		setAPIHost: setAPIHost,
		feedSetRefreshDelay: feedSetRefreshDelay
	};
	
	function checkAPIHost() {
		return HttpService.get(API.Routes.Check);
	}
	
	function getAPIHost() {
		return localStorageService.get(Const.LS.APIHost);
	}
	
	function feedGetRefreshDelay() {
		return HttpService.get(API.Routes.Delay);
	}
	
	function feedCreate(data) {
		return HttpService.post(API.Routes.Feeds, {}, data);
	}
	
	function feedDelete(id) {
		return HttpService.delete(API.Routes.Feed, { id: id });
	}
	
	function feedGetAll() {
		return HttpService.get(API.Routes.Feeds);
	}
	
	function feedRefresh(id) {
		return HttpService.get(API.Routes.FeedRefresh, { id: id });
	}
	
	function setAPIHost(host) {
		localStorageService.set(Const.LS.APIHost, host);
	}
	
	function feedSetRefreshDelay(cron) {
		return HttpService.post(API.Routes.Delay, {}, {cron: cron});
	}
	
}