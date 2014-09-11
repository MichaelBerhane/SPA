var appControllers = angular.module('appControllers', []);

	/*********************************************
	 * A factory to share data across Controllers
	***********************************************/

	angular.module('myApp').factory('Data', function(){

		var score = 0;
		var max = 24;
		var final;

		return {
			return_score: function(){
					return score;
			},
			final_score: function(text){
				score = text;
			},
			percentage: function(){
				var answer = (this.return_score()/max) * 100;
				var randomizer = Math.random() * 9;
				console.log(randomizer);
				console.log(answer);

				if(answer !== 100){
					final = Math.round(answer + randomizer);
				}
				else {
					final = Math.round(answer - randomizer);
				}

				return final;
			}
		};
	});

	/*******************************
	* Controller for the questions
	***********************************/

	appControllers.controller('QuestionController', ['$scope', '$http', '$location', 'Data', function($scope, $http, $location, Data){
		$http.get('js/data.json').success(function(data){


			$scope.question = data; // Json data //
			$scope.count = 0;  			// Rotate through Json Array
			$scope.answer_count = 0; // The score //
			var button_click = 0; // How many times clicked

			/* Increase the counter */

			$scope.button = function(num){
				button_click++;  // button increase every time an answer is clicked

				if($scope.count <= 5 && button_click <= 5){
					$scope.count++;  // go to the next question
					answer(num);    // add to answer
				}

				if(button_click === 6){
					answer(num);   // add answer on the final question.
					$location.path('/result'); // Go to the results page
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
			}

		});
	}]);


	/*******************************
	* A Controller for the results
	*******************************/

	appControllers.controller('ResultController', ['$scope', '$http', 'Data', function($scope, $http, Data){
			$scope.answer = Data.percentage();

			var down = $scope.answer / 10;
		  var face =	Math.round(down);
			$scope.number = [];
			for (var i= 0; i < face; i++){
				$scope.number.push('/images/face.png');
			}

			console.log($scope.number);


	}]);
