angular.module('RSSDownloader.settings')
  .config(function ($stateProvider) {
    $stateProvider
		.state('app.settings', {
    		url: '/settings',
    		views: {
      		'app-settings': {
        		templateUrl: 'app/settings/settings.html',
        		controller: 'SettingsCtrl',
        		controllerAs: 'vm'
			}
		}
	});
});
