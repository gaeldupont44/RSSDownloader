angular.module('RSSDownloader.files')
  .config(function ($stateProvider) {
  	
    $stateProvider
		.state('app.files', {
    		url: '/files',
    		views: {
      		'app-files': {
        		templateUrl: 'app/files/files.html',
        		controller: 'FilesCtrl',
        		controllerAs: 'vm'
			}
		}
	});
});
