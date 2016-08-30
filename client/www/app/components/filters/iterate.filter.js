angular.module('RSSDownloader')
  .filter('iterate', function(){
    return function(n) {
      var res = [];
      for (var i = 1; i <= n; i++) {
        res.push(i);
      }
      return res;
    };
  });