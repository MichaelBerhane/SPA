var appControllers = angular.module('appControllers', []);

appControllers.controller('QuestionController', ['$scope', '$http', function($scope, $http){
	$http.get('js/data.json').success(function(data){
		$scope.question = data;
		$scope.count = Number(0);

		/* Increase the counter */

		$scope.button = function(){
			if($scope.count < 5){
				$scope.count++;
			}
			
		}

	});
}]);

