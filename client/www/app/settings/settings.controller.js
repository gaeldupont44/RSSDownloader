angular.module('RSSDownloader.settings')
.controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl($ionicPopup, $scope, LoaderService, SettingsService) {
	
	init();
	
	var _feedCreatePopup = null;
 
	var vm = this;
	vm.closeFeedCreatePopup = closeFeedCreatePopup;
	vm.openFeedCreatePopup = openFeedCreatePopup;
	vm.newFeed = {};
	vm.feedCreate = feedCreate;
	vm.feedDelete = feedDelete;
	vm.feeds = [];
  	
  	function init() {
  		feedGetAll();
  	}
  	
  	function closeFeedCreatePopup() {
  		_feedCreatePopup.close();
  	}
  	
  	function feedCreate() {
  		LoaderService.show();
  		SettingsService.feedCreate(vm.newFeed)
  			.then(function(feed) {
  				vm.feeds.push(feed);
  				closeFeedCreatePopup();
  			})
  			.finally(LoaderService.hide);
  	}
  	
  	function feedDelete(feedId) {
  		LoaderService.show();
  		SettingsService.feedDelete(feedId)
  			.then(function() {
  				_.remove(vm.feeds, {_id: feedId});
  			})
  			.finally(LoaderService.hide);
  	}
  	
  	function feedGetAll() {
  		LoaderService.show();
  		SettingsService.feedGetAll()
	  		.then(function(feeds) {
	  			console.log(feeds);
	  			vm.feeds = feeds;
	  		})
  		.finally(LoaderService.hide);
  	}
  	
  	function openFeedCreatePopup() {
  		_feedCreatePopup = $ionicPopup.confirm({
  			cssClass: 'settings-feed-create-popup',
  			title: 'Ajouter un flux RSS',
  			templateUrl: 'app/settings/settings-feed-create.popup.html',
  			scope: $scope
  		});
  	}
  	
}