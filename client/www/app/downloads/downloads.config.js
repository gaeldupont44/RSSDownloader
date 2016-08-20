angular.module('RSSDownloader.downloads')
  .config(function ($stateProvider) {
    $stateProvider
		.state('app.downloads', {
    		url: '/downloads',
    		views: {
      		'app-downloads': {
        		templateUrl: 'app/downloads/downloads.html',
        		controller: 'DownloadsCtrl',
        		controllerAs: 'vm'
			}
		}
	});
});
