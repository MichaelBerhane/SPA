var myApp = angular.module('myApp', [
	'ngRoute',
	'appControllers'
]);

myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/home', {
			templateUrl: 'partials/landing.html'
		}).
		when('/question', {
			templateUrl: 'partials/question.html',
			controller: 'QuestionController'
		}).
		otherwise({
			redirectTo: '/home'
		});
}]);