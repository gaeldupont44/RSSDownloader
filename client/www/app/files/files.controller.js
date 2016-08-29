angular.module('RSSDownloader.files')
.controller('FilesCtrl', FilesCtrl);

function FilesCtrl($ionicPopup, $rootScope, $scope, $state, FilesService, LoaderService) {
	
	var _initialized = false;
	
	$scope.$on('$ionicView.enter', function(e) {
		if(!!$rootScope.isConnected) {
			if(!_initialized) {
				_initialized = true;
				init();
			}
		} else {
			_initialized = false;
			$state.go("app.settings");
		}
  	});
  	
	var _deletePopup = null;
	
	var vm = this;
	vm.fileDelete = fileDelete;
	vm.files = [];
	vm.closeDeletePopup = closeDeletePopup;
	vm.openDeletePopup = openDeletePopup;
	
	function init() {
		LoaderService.show();
		FilesService.getAll()
			.then(function(files) {
				vm.files = files;
				FilesService.syncUpdates(vm.files);
			})
			.finally(LoaderService.hide);
		
	}
	
	
	function closeDeletePopup() {
  		_deletePopup.close();
  	}
  	
  	function fileDelete() {
  		LoaderService.show();
		FilesService.delete(vm.file._id)
			.finally(function() {
				LoaderService.hide();
				closeDeletePopup();
			});
  	}
	
	
	function openDeletePopup(file) {
		vm.file = file;
  		_deletePopup = $ionicPopup.confirm({
  			cssClass: 'files-delete-popup',
  			title: file._id,
  			templateUrl: 'app/files/files-delete.popup.html',
  			scope: $scope
  		});
  	}
}