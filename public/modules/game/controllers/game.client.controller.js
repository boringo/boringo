'use strict';

angular.module('game').controller('GameController', ['$scope', '$stateParams', '$location', 'Authentication', 'Game',
	function($scope, $stateParams, $location, Authentication, Game) {
		$scope.authentication = Authentication;

		$scope.gameName = '';
		$scope.gameTerms = '';
		$scope.freeSpace = '';
		$scope.boardLength = '';

		$scope.talk = function(){
			alert($scope.gameTerms);
		};

		$scope.create = function(){
			var game = new Game({
				gameName : this.gameName,
				gameTerms : this.gameTerms,
				freeSpace : this.freeSpace,
				boardLength : this.boardLength
			});

			game.$save(function(response){
				alert(response);
			}, function(errorResponse){
				alert(errorResponse);
			});

		};

		// $scope.create = function() {
		// 	var article = new Articles({
		// 		title: this.title,
		// 		content: this.content
		// 	});
		// 	article.$save(function(response) {
		// 		$location.path('articles/' + response._id);

		// 		$scope.title = '';
		// 		$scope.content = '';
		// 	}, function(errorResponse) {
		// 		$scope.error = errorResponse.data.message;
		// 	});
		// };

		// $scope.remove = function(article) {
		// 	if (article) {
		// 		article.$remove();

		// 		for (var i in $scope.articles) {
		// 			if ($scope.articles[i] === article) {
		// 				$scope.articles.splice(i, 1);
		// 			}
		// 		}
		// 	} else {
		// 		$scope.article.$remove(function() {
		// 			$location.path('articles');
		// 		});
		// 	}
		// };

		// $scope.update = function() {
		// 	var article = $scope.article;

		// 	article.$update(function() {
		// 		$location.path('articles/' + article._id);
		// 	}, function(errorResponse) {
		// 		$scope.error = errorResponse.data.message;
		// 	});
		// };

		// $scope.find = function() {
		// 	$scope.articles = Articles.query();
		// };

		// $scope.findOne = function() {
		// 	$scope.article = Articles.get({
		// 		articleId: $stateParams.articleId
		// 	});
		// };
	}
]);