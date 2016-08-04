angular
	.module("weatherApp")
  // .config(['$httpProvider', function($httpProvider) {
  //   $httpProvider.defaults.withCredentials = true;
  // }])
  // .config(['$httpProvider', function($httpProvider) {
  //       $httpProvider.defaults.useXDomain = true;
  //       $httpProvider.defaults.headers.common = 'Content-Type: application/json';
  //       delete $httpProvider.defaults.headers.common['X-Requested-With'];
  //   }
  // ])
	.factory('weatherService', ['$http', '$q', 
	
function ($http, $q) {
	var getGeoCode = function(zip) {
    var deferred = $q.defer();
    $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + zip + '&key=AIzaSyCAARRQCHp-g71b1k8up7GkbflSLeI02XY')
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(err){
        console.log('Error retrieving markets');
        deferred.reject(err);
      });
    return deferred.promise;
  };

  var getWeather = function(geocode) {
  	var lat = geocode.lat;
  	var lng = geocode.lng;
  	var deferred = $q.defer();
    $http.get('https://api.forecast.io/forecast/55017c0ce854ceab1db44c34d7bb07d5/' + lat + ',' + lng)
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(err){
        console.log('Error retrieving markets');
        deferred.reject(err);
      });
    return deferred.promise;
  };

	return {
 		getGeoCode: getGeoCode,
 		getWeather: getWeather
	};
	
}]);