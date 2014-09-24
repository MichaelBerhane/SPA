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
		when('/result', {
			templateUrl: 'partials/result.html',
			controller: 'ResultController'
		}).
		when('/about',{
			templateUrl: 'partials/about.html'
		}).
		otherwise({
			redirectTo: '/home'
		});
}]);
