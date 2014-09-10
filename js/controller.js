var appControllers = angular.module('appControllers', []);

	/* A factory to share data across Controllers */

	angular.module('myApp').factory('Data', function(){

		var score = "hello";

		return {
			return_score: function(){
					return score;
			},
			final_score: function(text){
				score = text;
			}
		};
	});

	/* Controller for the questions */

	appControllers.controller('QuestionController', ['$scope', '$http', 'Data', function($scope, $http, Data){
		$http.get('js/data.json').success(function(data){


			$scope.question = data;
			$scope.count = 0;
			$scope.answer_count = 0;

			/* Increase the counter */

			$scope.button = function(num){
				if($scope.count < 5){
					$scope.count++;
					answer(num);
				}

			}

			/* getter */

			$scope.getcounter = function(){
				return $scope.count;
			}

			var answer = function(answer){
				$scope.answer_count += answer;
				console.log("current answer: " + answer);
				console.log("current score: " + $scope.answer_count);
				Data.final_score($scope.answer_count);
				console.log(Data.return_score());
			}

		});
	}]);


	/* A Controller for the results */

	appControllers.controller('ResultController', ['$scope', '$http', 'Data', function($scope, $http, Data){
			$scope.answer = Data.return_score();
	}]);
