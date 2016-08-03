angular
	.module("weatherApp")
  .controller("weatherCtrl", ['$scope','weatherService',
 
function($scope, weatherService) {
	
	function fetchWeather(locationQuery) {
		weatherService.getGeoCode(locationQuery).then(function(geodata){
			if (geodata.status != 'OK') {
				$scope.address = "I couldn't find what you were looking for."
				return;
			};
			var geocode = geodata.results[0].geometry.location;
			$scope.address = geodata.results[0].formatted_address;

			weatherService.getWeather(geocode).then(function(weatherData){
				$scope.currentTemp = Math.round(weatherData.currently.temperature);
				$scope.currentSummary = weatherData.currently.summary;
				$scope.todayMax = Math.round(weatherData.daily.data[0].temperatureMax);
				$scope.todayMin = Math.round(weatherData.daily.data[0].temperatureMin);
				
				var daysShown =  [0,1,2,3];
				var dates = getDate(weatherData, daysShown);
				var days = getDay(weatherData, daysShown);
				var maxs = getMaxOrMin(weatherData, daysShown, "Max");
				var mins = getMaxOrMin(weatherData, daysShown, "Min");
				var summaries = getSummary(weatherData, daysShown);
				var icon = getIcon(weatherData, daysShown);
				$scope.forecast = buildForecast(dates, days, maxs, mins, summaries, icon);
			});
		});
	};

	$scope.findWeather = function(locationQuery) {
    fetchWeather(locationQuery);
  };

fetchWeather("Central Park");
}]);