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


	angular.module('myApp').factor('Answer', function(){

			var answer;

			return {
				answer: function(input){
						var answer = input;
				},
				return_answer: function(input){
						return answer;
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

	appControllers.controller('ResultController', ['$scope', '$http', 'Data', 'Answer', function($scope, $http, Data, Answer){

			$scope.answer = Data.percentage();
			Answer.answer($scope.answer);
			var down = $scope.answer / 10;
		  var face =	Math.round(down);
			$scope.number = [];

			for (var i= 0; i < face; i++){
				$scope.number.push('/images/face.png');
			}

			$http.get('js/lyrics.json').success(function(data){
					if(face <= 3){
						$scope.entry = data[5];
					}
					else if(face > 3 && face <= 5){
						$scope.entry = data[4];
					}
					else if(face > 5 && face <= 7){
						$scope.entry = data[3];
					}
					else if(face > 7 && face <= 8){
						$scope.entry = data [2];
					}
					else if(face > 8 && face <= 9){
						$scope.entry = data[1];
					}
					else if(face > 9 && face <= 10){
						$scope.entry = data[0];
					}
	});

	}]);


	appControllers.controller('fbCtrl', ['$scope', '$http', 'Answer', function($scope, $http, Answer){
			$scope.share = function(){
				FB.ui({
						method: 'feed',
		        name: 'Your Drake Sensitivty Score ' + Answer.return_answer() + ' %',
		        link: 'www.feelingslikedrake.com/',
		        picture: 'www.feelingslikedrake.com/images/face.png',
		        caption: '',
		        description: 'This is the content of the "description" field, below the caption.',
		        message: ''
				});
			}

	}]);
