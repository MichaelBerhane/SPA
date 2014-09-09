var myApp = angular.module('myApp', [
	'ngRoute'
]);

myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/home', {
			templateUrl: 'partials/landing.html'
		}).
		when('/question', {
			templateUrl: 'partials/question.html'
		}).
		otherwise({
			redirectTo: '/home'
		});
}]);