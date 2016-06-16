angular.module('myApp', [])
	.controller('FirstCtrl', function($scope) {
		$scope.data = {message: 'Hello!', message2: 'Hello2!'};
	});