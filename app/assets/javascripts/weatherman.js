app = angular.module("weatherApp", [])

app.controller('weatherCtrl', function($scope){
	$scope.data = { message: ENV["google_maps_geocode"] };
});

// app.controller('someCtrl', function($scope,Data) {
// 		$scope.data = Data, {message1: 'Hello!', message2: 'Hello2!'};
// });

// app.factory('weatherService', ['$http', '$q', function ($http, $q) {
// 	function getWeather (zip) {
//     var deferred = $q.defer();
//     $http.get('https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20weather.forecast%20WHERE%20location%3D%22' + zip + '%22&format=json&diagnostics=true&callback=')
//       .success(function(data){
//         deferred.resolve(data.query.results.channel);
//       })
//       .error(function(err){
//         console.log('Error retrieving markets');
//         deferred.reject(err);
//       });
//     return deferred.promise;
//       }

// 	return {
//  		getWeather: getWeather
// 	};
// }]);

// app.factory('weatherService', ['$http', '$q', function ($http, $q) {
// 	function getWeather (zip) {
//     var deferred = $q.defer();
//     $http.get('https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20weather.forecast%20WHERE%20location%3D%22' + zip + '%22&format=json&diagnostics=true&callback=')
//       .success(function(data){
//         deferred.resolve(data.query.results.channel);
//       })
//       .error(function(err){
//         console.log('Error retrieving markets');
//         deferred.reject(err);
//       });
//     return deferred.promise;
//       }

// 	return {
//  		getWeather: getWeather
// 	};
// }]);