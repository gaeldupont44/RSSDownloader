angular.module('RSSDownloader')
.factory("LoaderService", LoaderService);

function LoaderService($ionicLoading) {
  	
  	return {
  		hide: hide,
  		show: show
  	};
  	
  	function show(){
  		$ionicLoading.show({
      		template: 'Chargement en cours...'
	    });
  	}
  	
  	function hide(){
  		$ionicLoading.hide();
  	}
  	
}