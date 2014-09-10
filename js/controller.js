var appControllers = angular.module('appControllers', []);

appControllers.controller('QuestionController', ['$scope', '$http', function($scope, $http){
	$http.get('js/data.json').success(function(data){
		$scope.question = data;
		$scope.count = Number(0);
		$scope.answer_count = 0;

		/* Increase the counter */

		$scope.button = function(num){
			if($scope.count < 5){
				$scope.count++;
			}	
			
			var score = Number(num);
			answer(score);
		}

		/* getter */

		$scope.getcounter = function(){
			return $scope.count;
		}

		var answer = function(answer){
			console.log("current answer: " + answer);
			$scope.answer_count += answer;
			console.log("current score: " + $scope.answer_count);
		}

	});
}]);


appControllers.controller('AnswerController', ['$scope', '$http', function($scope, $http){





}]);

