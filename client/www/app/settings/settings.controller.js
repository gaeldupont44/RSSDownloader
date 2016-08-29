angular.module('RSSDownloader.settings')
.controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl($ionicPopup, $q, $scope, $timeout, LoaderService, SettingsService) {
	
	init();
	
	var _feedCreatePopup = null;
 
	var vm = this;
	vm.api = {
		host: SettingsService.getAPIHost(),
		connected: null
	};
	vm.changeCronValueLimite = changeCronValueLimite;
	vm.closeFeedCreatePopup = closeFeedCreatePopup;
	vm.openFeedCreatePopup = openFeedCreatePopup;
	vm.newFeed = {};
	vm.feedCreate = feedCreate;
	vm.feedDelete = feedDelete;
	vm.feedRefresh = feedRefresh;
	vm.feedSetRefreshDelay = feedSetRefreshDelay;
	vm.feeds = [];
	vm.setAPIHost = setAPIHost;
  	vm.cron = {
  		current: {
			type: "",
			value: 0,
			limite: 0
  		},
  		limites: [
  			{
  				type: "MINUTE",
  				value: 59
  			},
  			{
  				type: "HOUR",
  				value: 23
  			},
  			{
  				type: "DAY",
  				value: 31
  			},
  			{
  				type: "MONTH",
  				value: 12
  			}
  		]
  	};
  	
  	
  	function init() {
  		LoaderService.show();
  		checkAPIHost()
  			.then(function() {
  				var promises = [feedGetAll(), feedGetRefreshDelay()];
  				$q.all(promises).finally(LoaderService.hide);
  			});
  	}
  	
  	function changeCronValueLimite(updateSrv) {
		_(vm.cron.limites).forEach(function(limite) {
  					if(vm.cron.current.type === limite.type) {
  						vm.cron.current.limite = limite.value;
  						if(vm.cron.current.value > limite.value) {
  							vm.cron.current.value = limite.value;
  						}
  						if(!!updateSrv) {
  							feedSetRefreshDelay();
  						}
  					}
  				});
  	}
  	
  	function checkAPIHost() {
  		return SettingsService.checkAPIHost()
  			.then(function() {
  				vm.api.connected = true;
  			})
  			.catch(function() {
  				vm.api.connected = false;
  			});
  	}
  	
  	function setAPIHost() {
  		LoaderService.show();
  		SettingsService.setAPIHost(vm.api.host);
  		init();
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
  	
  	function feedDelete(id) {
  		LoaderService.show();
  		SettingsService.feedDelete(id)
  			.then(function() {
  				_.remove(vm.feeds, {_id: id});
  			})
  			.finally(LoaderService.hide);
  	}
  	
  	function feedGetAll() {
  		SettingsService.feedGetAll()
	  		.then(function(feeds) {
	  			vm.feeds = feeds;
	  		})
	  		.catch(function() {
	  			vm.feeds = [];
	  		});
  	}
  	
  	function feedGetRefreshDelay() {
  		SettingsService.feedGetRefreshDelay()
  			.then(function(cron) {
  				console.log(cron);
  				vm.cron.current = cron2obj(cron);
  				changeCronValueLimite(false);
  			});
  	}
  	
  	function feedRefresh(id) {
  		LoaderService.show();
  		SettingsService.feedRefresh(id)
  			.finally(LoaderService.hide);
  	}
  	
  	function feedSetRefreshDelay() {
  		LoaderService.show();
  		SettingsService.feedSetRefreshDelay(obj2cron(angular.copy(vm.cron.current)))
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
  	
  	function cron2obj(cron) {
  		var parsedCron = {};
  		var hasSecond = (cron.split(" ").length >= 6);
  		var splitCron = cron.split("/");
  		parsedCron.value = parseInt(splitCron[1].split(" ")[0]);
  		switch(hasSecond ? splitCron[0].split(" ").length : splitCron[0].split(" ").length + 1) {
  			case 1: parsedCron.type = "SECOND"; break;
  			case 2: parsedCron.type = "MINUTE"; break;
  			case 3: parsedCron.type = "HOUR"; break;
  			case 4: parsedCron.type = "DAY"; break;
  			case 5: parsedCron.type = "MONTH"; break;
  			default: break;
  		}
  		return parsedCron;
  	}
  	
  	function obj2cron(obj) {
  		var parsedCron = "";
  		var iterator = "*/" + obj.value;
  		switch(obj.type) {
  			case "SECOND": parsedCron = iterator + " * * * * *"; break;
  			case "MINUTE": parsedCron = iterator + " * * * *"; break;
  			case "HOUR": parsedCron = "* " + iterator + " * * *"; break;
  			case "DAY": parsedCron = "* * " + iterator + " * *"; break;
  			case "MONTH": parsedCron = "* * * " + iterator + " *"; break;
  			default: break;
  		}
  		return parsedCron;
  	}
}