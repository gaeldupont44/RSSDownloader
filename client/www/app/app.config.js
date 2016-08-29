angular.module('RSSDownloader')
.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider, localStorageServiceProvider) {
	
	$ionicConfigProvider.tabs.position('bottom');
	
	localStorageServiceProvider.setPrefix('RSSDownloader');
	
	$stateProvider
		.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: 'app/app.html'
		});

	$urlRouterProvider.otherwise('/app/articles');

});