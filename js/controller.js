var appControllers = angular.module('appControllers', []);

appControllers.controller('QuestionController', ['$scope', '$http', function($scope, $http){
	$http.get('js/data.json').success(function(data){
		$scope.question = data;
	});
}]);