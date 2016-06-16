var weatherman = angular.module('weatherApp', []);

weatherman.factory('weatherService', function () {
	return {temperature: "90"}
})

function WeatherCtrl($scope, weatherService) {
	$scope.data = weatherService
}