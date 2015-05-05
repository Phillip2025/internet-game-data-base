var controllers = angular.module('controllers', []);  

controllers.controller('gameController', function ($scope, $rootScope, $http, $location, esrbENG, esrbESP, players, genres) {
	
	$scope.search = {};
	$rootScope.esrbENG = esrbENG;
	$rootScope.players = players;
	$rootScope.genres = genres;
	$scope.interval =5000;
	$scope.status = {
		isFirstOpen: true,
		isFirstDisabled: false
	};
	

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
			$rootScope.totalItems = games.length;
			$rootScope.letter = undefined;
			$location.path('/search/' + term);
			$rootScope.currentPage = 1;
			$rootScope.numPerPage = 5;
			$rootScope.maxSize = 5;
			$rootScope.filteredTodos = [];
			$rootScope.$watch("currentPage + numPerPage", function() {
				var begin = (($rootScope.currentPage - 1) * $rootScope.numPerPage);
				var end = begin + $rootScope.numPerPage;
				//console.log("begin:"+begin+"end:"+end);
				$rootScope.filteredTodos = $rootScope.games.slice(begin, end);
			});
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
				$rootScope.user={};
				$rootScope.user = user;
				$location.path('/');
			})
			.error(function(err){
				console.log("Error" +err);
			});
		}
		console.log("updateado usuario")
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
		$scope.newGame.genres = $rootScope.genresCheckBox;
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
	
	$scope.updateGame = function(){
		if (!$rootScope.user) {
			console.log("No hay usuario logeado");
			console.log("Aqui deberia cargar el formulario de registro");
		} else {
			if($rootScope.user.role == 'Admin') {
				console.log("Root: " + JSON.stringify($rootScope.game));
				$http.put('/games/' + $rootScope.game._id, $rootScope.game)
				.success(function (game) {
					console.log("Updateando juego con id:" + game._id);
					console.log(JSON.stringify(game));
					$rootScope.game = game;
					$location.path('/games/'+game._id);
				})
				.error(function(err) {
					console.log("Error" +err);
				});
			} else {
				console.log("El usuario no tiene los permisos para hacer esto");
			}
		}
	};
});

controllers.controller('checkBoxController', function ($scope, $rootScope) {

	$rootScope.genresCheckBox = [];

	$scope.toggle = function (genre) {
		var index = $rootScope.genresCheckBox.indexOf(genre);
		if (index > -1) {
			$rootScope.genresCheckBox.splice(index, 1);
		}
		else {
			$rootScope.genresCheckBox.push(genre);
		}
	}

	$scope.populate = function () {
		$rootScope.genresCheckBox = $rootScope.game.genres;
	}

	$scope.checkGenre = function (genre) {
		if ($rootScope.genresCheckBox.indexOf(genre) > -1) {
			return 1;
		}
		else {
			return -1;
		}
	}


});