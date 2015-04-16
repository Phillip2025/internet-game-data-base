var controllers = angular.module('controllers', []);  

controllers.controller('gameController', function ($scope, $rootScope, $http, $location) {
	//$scope.formData = {};
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

	$scope.getGamesByTerm = function () {
		var term = $scope.search.term;
		$http.get('/search/' + term)
			.success(function(games) {
				console.log(games);
				$rootScope.games = games;
				$rootScope.term = term;
				$location.path('/search/' + term);
			});
	};

	
});

controllers.controller('userController', function ($scope, $rootScope, $http, $location) {

	$scope.credentials = {};

	$scope.login = function() {
		$http.post('/login', $scope.credentials)
			.success(function(user) {
				console.log("Logeado");
				$rootScope.user = user;
				$location.path('/');
			})
			.error(function (err) {
				console.log("Error: " + err);
			});
	};

	$scope.signUp = function() {
		$http.post('/signup', $scope.credentials)
			.success(function (user) {
				console.log ("Registrado y logeado");
				$rootScope.user = user;
				$location.path('/');
			})
			.error(function (err) {
				console.log("Error: " + err);
			});
	};

});