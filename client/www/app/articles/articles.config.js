angular.module('RSSDownloader.articles')
  .config(function ($stateProvider) {
    $stateProvider
		.state('app.articles', {
    		url: '/articles',
    		views: {
      		'app-articles': {
        		templateUrl: 'app/articles/articles.html',
        		controller: 'ArticlesCtrl',
        		controllerAs: 'vm'
			}
		}
	});
});