var controllers = angular.module('controllers', []);  

controllers.controller('gameController', function ($scope, $rootScope, $http, $location) {
	//$scope.formData = {};
	$scope.search = {};
	$scope.comment = {};
	
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

	$scope.addComment = function() {
		if (!$rootScope.user) {
			console.log("No hay usuario logeado");
			console.log("Aqui deberia cargar el formulario de registro");
		}
		else {
			var comment = {};
		comment._id = $rootScope.user._id;
		comment.picture = $rootScope.user.picture;
		comment.text = $scope.comment.text;
		$http.put('/comments/' + $rootScope.game._id, comment)
			.success(function(game) {
				console.log("Comentario añadido con exito");
				$rootScope.game = game;
			})
			.error(function(err) {
				console.log(err);
			});
		}
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

	$scope.newGameView = function() {
		$location.path('/admin/newgame');
	};

});

controllers.controller('adminController', function ($scope, $rootScope, $http, $location) {
	
	$scope.newGame = {};

	$scope.newGameView = function() {
		$location.path('/admin/newgame');
	};

	$scope.addGame = function(){
		$http.post('/games', $scope.newGame)
			.success(function (game){
				console.log("Nuevo juego insertado");
				$rootScope.game = game;
				$location.path('/games/' + game._id);
			})
			.error(function(err){
				console.log("Error" + err);
			});
	};
});