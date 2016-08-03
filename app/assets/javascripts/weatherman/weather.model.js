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