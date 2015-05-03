var controllers = angular.module('controllers', []);  

controllers.controller('gameController', function ($scope, $rootScope, $http, $location, esrbENG, esrbESP, players, genres) {
	
	$scope.search = {};
	$rootScope.esrbENG = esrbENG;
	$rootScope.players = players;
	$rootScope.genres = genres;
	
	
	$scope.getLatestGames = function () {
		console.log("Juegos nuevos");
		$http.get('/latest')
		.success(function(games) {
			$scope.games = games;
		})
		.error(function(err) {
			console.log(err);
		});
	};
	

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
			$rootScope.letter = undefined;
			$location.path('/search/' + term);
		});
	};

	$scope.getGamesByLetter = function () {
		var letter = $scope.search.letter;
		$http.get('search/letter/' + letter)
		.success(function(games) {
			$rootScope.games = games;
			$rootScope.letter = letter;
			$rootScope.term = undefined;
			$location.path('/search/' + letter);
		});
	};

	$scope.addComment = function() {
		if (!$rootScope.user) {
			console.log("No hay usuario logeado");
			console.log("Aqui deberia cargar el formulario de registro");
		}
		else {
			var comment = {};
			console.log(JSON.stringify($rootScope.user));
			comment._id = $rootScope.user._id;
			comment.user = $rootScope.user.user;
			comment.picture = $rootScope.user.picture;
			comment.text = $scope.comment.text;
			console.log(JSON.stringify(comment));
			$http.put('/comments/' + $rootScope.game._id, comment)
			.success(function(game) {
				console.log("Comentario añadido con exito");
				$scope.comment = {};
				$rootScope.game = game;
			})
			.error(function(err) {
				console.log(err);
			});
		}
	};
	
});

controllers.controller('countController', function ($scope, $http) {

	$scope.count = "";

	$scope.getCount = function () {
		$http.get('/count')
		.success(function (count) {
			$scope.count = count.count;
		})
		.error(function (err){
			console.log ("Error" + err);
		});
	};

});

controllers.controller('userController', function ($scope, $rootScope, $http, $location) {

	$scope.credentials = {};

	$scope.login = function() {
		$http.post('/login', $scope.credentials)
		.success(function (user) {
			console.log("Logeado");
			console.log(JSON.stringify(user));
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

	$scope.updateUser = function(){
		if (!$rootScope.user) {
			console.log("No hay usuario logeado");
			console.log("Aqui deberia cargar el formulario de registro");
		}else{
				$http.put('/updateuser', $scope.credentials)
				.success(function (user){
					console.log("Updateando user con id:" + user.user);
					$rootScope.user = user;
					$location.path('/');
				})
				.error(function(err){
					console.log("Error" +err);
				});
			}
	};

	$scope.logout = function() {
		console.log("Deslogeando");
		$http.get('/logout')
		.success(function () {
			$rootScope.user = undefined;
			$scope.credentials = {};
			$location.path('/');
		})
		.error(function (err) {
			console.log("Error " + err);
		});
	};
});

controllers.controller('adminController', function ($scope, $rootScope, $http, $location) {
	
	$scope.newGame = {};

	$scope.addGame = function(){
		console.log(JSON.stringify($scope.newGame));
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
	/*
	$scope.updateGame = function(){
		if (!$rootScope.user) {
			console.log("No hay usuario logeado");
			console.log("Aqui deberia cargar el formulario de registro");
		}else{
			if($rootScope.user.role == 'Admin'){
				$http.put('/games', $scope.newGame)
				.success(function (game){
					console.log("Updateando juego con id:" game._id);
					$rootScope.game = game;
					$location.path('/games/'+game._id);
				})
				.error(function(err){
					console.log("Error" +err);
				});
			}else{
				console.log("El usuario no tiene los permisos para hacer esto");
			}
		}
	};*/
});