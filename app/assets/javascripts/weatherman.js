app = angular.module('myApp', [])

	app.controller('weatherCtrl', ['$scope', 'weatherForecast', function($scope, weatherForecast){
		function fetchWeather(zip) {
			weatherForecast.getWeather(zip).then(function(data){
				$scope.hashie = data;	
			});
		}

		$scope.findWeather = function(zip) {
			$scope.place = ''
			fetchWeather(zip);
		};
	}]);
	
	app.factory('weatherForecast', ['$http', '$q', function ($http, $q){
		function getWeather (zip) {
			var deferred = $q.defer();
      $http.get('https://api.forecast.io/forecast/55017c0ce854ceab1db44c34d7bb07d5/37.8267,-122.423')
      	.success(function(data){
      		deferred.resolve(data);
      	})
				.error(function(err){
					console.log('Error retrieving data');
					deferred.reject(err);
				});
			return deferred.promise;
		}

		return {
			getWeather: getWeather
		};
	}]);

	app.factory('Data', function() {
		return {message0: "This is a message inside a factory." }
	})
	
	app.controller('someCtrl', function($scope,Data) {
		$scope.data = Data, {message1: 'Hello!', message2: 'Hello2!'};
	});