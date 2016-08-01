app = angular.module("weatherApp", [])

app.factory('weatherService', ['$http', '$q', 
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

app.controller("weatherCtrl", ['$scope','weatherService',
 function($scope, weatherService) {
	function fetchWeather(locationQuery) {
		weatherService.getGeoCode(locationQuery).then(function(geodata){
			// console.log(geodata);
			var geocode = geodata.results[0].geometry.location;
			$scope.address = geodata.results[0].formatted_address;
		weatherService.getWeather(geocode).then(function(weatherData){
			$scope.currentTemp = weatherData.currently.temperature;
			$scope.currentSummary = weatherData.currently.summary;
			$scope.todayMax = weatherData.daily.data[0].temperatureMax;
			$scope.todayMin = weatherData.daily.data[0].temperatureMin;
			console.log(weatherData);
		});
		});
	};
	$scope.findWeather = function(locationQuery) {
    fetchWeather(locationQuery);
  };
  fetchWeather("Central Park");
}]);