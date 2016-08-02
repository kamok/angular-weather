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

function buildForecast(dates, days, max, min, summaries, icon) {
	var output = []
	for (i in dates) {
		var obj = {
			date: dates[i],
			day: days[i],
			max: max[i],
			min: min[i],
			summary: summaries[i],
			icon: icon[i]
		};
		output.push(obj);
	};
	return output;
};

function getDate(weatherData, daysShown) {
	var arrayOfDates = []
	for (i in daysShown) {
		var fullDate = new Date(weatherData.daily.data[i]["time"]*1000)
		arrayOfDates.push((fullDate.getMonth() + 1) + '/' + fullDate.getDate())
	};
	return arrayOfDates;
};

function getDay(weatherData, daysShown) {
	var day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	var arrayOfDays = []
	for (i in daysShown) {
		var fullDate = new Date(weatherData.daily.data[i]["time"]*1000)
		arrayOfDays.push(day[fullDate.getDay()])
	};
	return arrayOfDays;
};

function getMaxOrMin(weatherData, daysShown, type) {
	var arrayOfTemp = []
	for (i in daysShown) {
		var value = weatherData.daily.data[i]["temperature" + type]
		arrayOfTemp.push(Math.round(value))
	};
	return arrayOfTemp;
};

function getSummary(weatherData, daysShown) {
	var arrayOfSummaries = []
	for (i in daysShown) {
		var summary = weatherData.daily.data[i]["summary"]
		arrayOfSummaries.push(summary)
	};
	return arrayOfSummaries;
};

function getIcon(weatherData, daysShown) {
	var arrayOfIcons = []
	var forecast_to_wi_icon = {
      "clear-day":           "day-sunny",
      "clear-night":         "night-clear",
      "rain":                "rain",
      "snow":                "snow",
      "sleet":               "hail",
      "wind":                "strong-wind",
      "fog":                 "fog",
      "cloudy":              "cloudy",
      "partly-cloudy-day":   "day-cloudy",
      "partly-cloudy-night": "night-cloudy"
    }

	for (i in daysShown) {
		var icon = weatherData.daily.data[i]["icon"]
		if (icon in forecast_to_wi_icon){
			arrayOfIcons.push(forecast_to_wi_icon[icon])
		};
	};
	return arrayOfIcons;
};