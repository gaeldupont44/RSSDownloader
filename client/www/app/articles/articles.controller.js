angular.module('RSSDownloader.articles')
.controller('ArticlesCtrl', ArticlesCtrl);

function ArticlesCtrl($ionicPopup, $scope, ArticlesService, FilesService, LoaderService) {
	
	init();
	
	var _deletePopup = null;
	
	var vm = this;
	vm.articleDelete = articleDelete;
	vm.articles = [];
	vm.closeDeletePopup = closeDeletePopup;
	vm.openDeletePopup = openDeletePopup;
	
	function init() {
		LoaderService.show();
		ArticlesService.getAll()
			.then(function(articles) {
				vm.articles = articles;
				ArticlesService.syncUpdates(vm.articles);
			})
			.finally(LoaderService.hide);
		
	}
	
	
	function closeDeletePopup() {
  		_deletePopup.close();
  	}
  	
  	function articleDelete(removeData) {
  		LoaderService.show();
		ArticlesService.delete(vm.article._id)
			.finally(function() {
				if(!!removeData) {
					FilesService.delete(vm.article.title)
				.finally(function() {
					LoaderService.hide();
					closeDeletePopup();
				});
				} else {
					LoaderService.hide();
					closeDeletePopup();
				}
				
			});
  	}
	
	
	function openDeletePopup(article) {
		vm.article = article;
  		_deletePopup = $ionicPopup.confirm({
  			cssClass: 'articles-delete-popup',
  			title: article.title,
  			templateUrl: 'app/articles/articles-delete.popup.html',
  			scope: $scope
  		});
  	}
	
}