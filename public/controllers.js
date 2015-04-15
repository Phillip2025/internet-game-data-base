var controllers = angular.module('controllers', []);  

controllers.controller('gameController', function ($scope, $rootScope, $http, $location) {
	$scope.formData = {};
	$scope.search = {};
	
	$http.get('/latest')
	.success(function(games) {
		$scope.games = games;
	})
	.error(function(err) {
		console.log(err);
	});

	$scope.getGameById = function (id) {
		$http.get('/games/' + id)
		.success(function(game) {
			$rootScope.game = game;
			$location.path('/games/' + id);

		})
		.error(function(err) {
			console.log(err);
		});
	};

	$scope.getGamesByName = function () {
		var term = $scope.search.term;
		$http.get('/games/search?term=' + term)
			.success(function(games) {
				console.log(games);
				$rootScope.games = games;
				$rootScope.term = term;
				$location.path('/games/search');
			});
	};

	
});