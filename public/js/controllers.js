var controllers = angular.module('controllers', []);  
		
controllers.controller('gameController', function ($scope, $rootScope, $http, $location, esrbENG, esrbESP, players, genres) {
	
	$scope.comment = {};
	$scope.search = {};
	$rootScope.esrbENG = esrbENG;
	$rootScope.players = players;
	$rootScope.genres = genres;
	$scope.interval =5000;
	$scope.status = {
		isFirstOpen: true,
		isFirstDisabled: false,
		isopen: false,
	};
	$scope.max= 10; 
	$scope.rate = 1;

	$scope.claveYT ="cc-ClutaN_I";

	$scope.toggled = function(open) {
		$log.log('Dropdown is now: ', open);
	};

	$scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.isopen = !$scope.status.isopen;
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
			$scope.search = {};
			$rootScope.games = games;
			$rootScope.term = term;
			$rootScope.totalItems = games.length;
			$rootScope.letter = undefined;
			$location.path('/search/' + term);
			$rootScope.currentPage = 1;
			$rootScope.numPerPage = 8;
			$rootScope.maxSize = 5;
			$rootScope.gamesPage = [];
			$rootScope.$watch("currentPage + numPerPage", function() {
				var begin = (($rootScope.currentPage - 1) * $rootScope.numPerPage);
				var end = begin + $rootScope.numPerPage;
				//console.log("begin:"+begin+"end:"+end);
				$rootScope.gamesPage = $rootScope.games.slice(begin, end);
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

	$scope.addRating = function(){
		if (!$rootScope.user) {
			console.log("No hay usuario logeado");
			console.log("Aqui deberia cargar el formulario de registro");
		} else{
			var rating = {};
			rating.rate = $scope.rate;
			rating.userId= $rootScope.user._id;
			rating.user = $rootScope.user.user;
			console.log(JSON.stringify(rating));
			$http.post('games/' + $rootScope.game._id + '/ratings', rating)
			.success(function(game){
				console.log("Puntuacion añadida en games.");
				rating ={};
				$rootScope.game = game;
				console.log("rating reiniciado: "+JSON.stringify(rating));
				rating.rate = $scope.rate;
				rating.userId= $rootScope.user._id;
				rating.user = $rootScope.user.user;
				rating.gameId = $rootScope.game._id;
				rating.gameTitle = $rootScope.game.gameTitle;
				rating.gameImg = $rootScope.game.images.boxart.front.url;
				console.log(JSON.stringify(rating));
				$http.post('users/' + $rootScope.user._id + '/ratings', rating)
				.success(function(user){
					console.log("Puntuacion añadida en users.");
					rating = {};
					$rootScope.user = user;
					console.log(JSON.stringify($rootScope.user));
				})
				.error(function(err){
					console.log(err);
				});
			})
			.error(function(err){
				//console.log("TOY AKIIII");
				console.log(err);
			});
		}
	};

	$scope.addComment = function() {
		if (!$rootScope.user) {
			console.log("No hay usuario logeado");
			console.log("Aqui deberia cargar el formulario de registro");
		}
		else {
			var comment = {};
			console.log(JSON.stringify($rootScope.user));
			comment.userId = $rootScope.user._id;
			comment.user = $rootScope.user.user;
			comment.picture = $rootScope.user.picture.url;
			comment.text = $scope.comment.text;
			comment.gameImg = $rootScope.game.images.boxart.front.url;
			//console.log(JSON.stringify(comment));
			$http.post('games/' + $rootScope.game._id + '/comments', comment)
			.success(function(game) {
				console.log("Comentario añadido con exito en game");
				$rootScope.game = game;
				console.log("en game"+JSON.stringify(comment));
				$http.post('users/' + $rootScope.user._id + '/comments', comment)
				.success(function(user){
					console.log("en user"+JSON.stringify(comment));
					console.log("Comentario añadido con exito en user");
					$rootScope.user = user;
				})
				.error(function(err){
					console.log(err);
				})
				$location.path('/games/' + $rootScope.game._id);
			})
			.error(function(err) {
				console.log(err);
			});
		}
	};	

	$scope.updateComment = function(gameId, commentId) {
		var comment = {};
		comment.user = $rootScope.user.user;
		comment.picture = $rootScope.user.picture;
		comment.text = $scope.comment.text;
		$http.put('games/' + gameId + '/comments/' + commentId, comment)
		.success(function(game) {
			$rootScope.game = game;
		})
		.error(function (err) {
			console.log(err);
		});
	};

	$scope.deleteComment = function(gameId, commentId) {

		$http.delete('games/' + gameId + '/comments/' + commentId)
		.success(function(game) {
			$rootScope.game = game;
		})
		.error(function (err) {
			console.log(err);
		});
	};

	$scope.autoComplete = {
		options: {
			html: true,
			focusOpen: true,
			onlySelectValid: true,
			minLength: 2,
			source: function (request, response) {
				$http.get('search/' + request.term)
				.success( function(data) {
					if (data.length > 0) {
						var array = [];
						for (var i = 0; i< data.length; i++) {
							array.push(data[i].gameTitle);
						}
						response(array);
					}
					else {
						response([data.message]);
					}
				});
			},
		}
	};
	
});

var myApp = angular.module('myApp', ['youtube-embed']);

myApp.controller('MyCtrl', function ($scope) {
  // have a video id
	$scope.theBestVideo = 'sMKoNBRZM1M';
	$scope.anotherGoodOne = 'https://www.youtube.com/watch?v=18-xvIjH8T4';
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

controllers.controller('userController', function ($scope, $rootScope, $http, $modal, $location) {

	$scope.modalInstance;
	$scope.credentials = {};
	$scope.loginAlerts = [];
	$scope.alerts = [];

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

	$scope.getUserById = function (id) {
		$http.get('/users/' + id)
		.success(function(user) {
			$rootScope.profileUser = user;
			$rootScope.ratingsPage = user.ratings;
			$location.path('/users/' + id);
			$rootScope.items = user.ratings.length;
			$rootScope.currentPage = 1;
			$rootScope.numPerPage = 6;
			$rootScope.maxSize = 5;
			$rootScope.ratedPage = [];
			$rootScope.userComments = user.comments.slice(-3, user.comments.length);
			//console.log($rootScope.profileUser.ratings.length);
			$rootScope.$watch("currentPage + numPerPage", function() {
				var begin = (($rootScope.currentPage - 1) * $rootScope.numPerPage);
				var end = begin + $rootScope.numPerPage;
				//console.log("begin:"+begin+"end:"+end);
				$rootScope.ratedPage = $rootScope.ratingsPage.slice(begin, end);
			});
			console.log($rootScope.ratedPage);
		})
		.error(function(err) {
			console.log(err);
		});
	};

	$scope.login = function() {
		$http.post('/login', $scope.credentials)
		.success(function (user) {
			console.log("Logeado");
			console.log(JSON.stringify(user));
			$scope.loginAlerts= [];
			$rootScope.user = user;
			$location.path('/');
		})
		.error(function (err, status) {
			var msg = 'Ocurrió un error';
			if (status == 400) {
				msg = 'User o password incorrectos';
			}
			$scope.loginAlerts[0] = {type: 'danger', msg: msg};
		});
	};

	$scope.signUp = function() {
		$http.post('/signup', $scope.credentials)
		.success(function (user) {
			$scope.modalInstance.close();
			$scope.alerts = [];
			console.log ("Registrado y logeado");
			$rootScope.user = user;
			$location.path('/');
		})
		.error(function (err, status) {
			var msg = 'Ocurrió un error';
			if (status == 500) {
				msg = 'Todos los campos son obligatorios';
			}
			if (status == 400) {
				msg = 'El nombre no está disponible';
			}
			$scope.alerts[0] = {type: 'danger', msg: msg};
		});
	};

	$scope.updateUser = function(){
		if (!$rootScope.user) {
			console.log("No hay usuario que modificar");
		} else {
			console.log('editando user');
				$http.put('/users/' + $rootScope.user._id, $rootScope.updateUser)
				.success(function (user) {
					$scope.modalInstance.close();
					$scope.alerts = [];
					console.log(user);
					console.log("Updateando usuario con id:" + user._id);
					console.log(JSON.stringify(user));
					$rootScope.user = user;
					//$location.path('/users/'+user._id);
				})
				.error(function(err, status) {
					var msg = 'Ocurrió un error';
					if (status == 400) {
						msg = "Las contraseñas deben coincidir"
					}
					$scope.alerts[0] = {type: 'danger', msg: msg};
				});
		}
	};

	$scope.openNewUser = function () {

		$scope.loginAlerts = [];
		$scope.modalInstance = $modal.open({
			templateUrl: 'newuser.html',
			scope: $scope,
			resolve: {
				credentials: function () {
					return $scope.credentials;
				}
			}
		});

	    //Al cerrar el modal
	    $scope.modalInstance.result.then(function (credentials) {
	      console.log("Si ha cerrado bien: " + JSON.stringify(credentials));
	    }, function () {
	    	$scope.alerts = [];
	      $log.info('Modal dismissed at: ' + new Date());
	  });

};

$scope.openEditUser = function () {

	$rootScope.updateUser = clone($rootScope.user);
	console.log("abriendo editar usuario");
	$scope.modalInstance = $modal.open({
		templateUrl: 'updateuser.html',
		scope: $scope,
		resolve: {
			updateUser: function () {
				return $rootScope.updateUser;
			}
		}
	});

	    //Al cerrar el modal
	    $scope.modalInstance.result.then(function (user) {
	    	console.log("Si ha cerrado bien: " + JSON.stringify(user));
	    }, function () {
	    	console.log('update: ' + JSON.stringify($rootScope.updateUser));
	    	console.log('root: ' + JSON.stringify($rootScope.user));
    	  $rootScope.updateUser = {};
    	 	$scope.alerts = [];
	      console.info('Modal dismissed at: ' + new Date());
	      
	  });
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

	$scope.close = function (arrayAlerts) {
		arrayAlerts = [];
	};

	function clone(obj) {
		if (null == obj || "object" != typeof obj) return obj;
		var copy = obj.constructor();
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
		}
		return copy;
	}

});

controllers.controller('adminController', function ($scope, $rootScope, $http, $modal, $location) {
	
	$scope.newGame = {};
	$scope.modalInstance;

	$scope.addGame = function(){
		$scope.newGame.genres = $rootScope.genresCheckBox;
		$scope.newGame.releaseDate = new Date($scope.newGame.noFormatDate);
		console.log(JSON.stringify($scope.newGame));
		$http.post('/games', $scope.newGame)
		.success(function (game){
			console.log("Nuevo juego insertado");
			$rootScope.game = game;
			$scope.modalInstance.close();
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
					$scope.modalInstance.close();
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

	$scope.openNewGame = function () {

		$scope.modalInstance = $modal.open({
			templateUrl: 'newgame.html',
			scope: $scope,
			resolve: {
				newGame: function () {
					return $scope.newGame;
				}
			}
		});

		    //Al cerrar el modal
		    /*$scope.modalInstance.result.then(function (credentials) {
		      console.log("Si ha cerrado bien: " + JSON.stringify(credentials));
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		  });*/

};

$scope.openEditGame = function () {

	$rootScope.updateGame = clone($rootScope.game);
	$scope.modalInstance = $modal.open({
		templateUrl: 'updategame.html',
		scope: $scope,
		resolve: {
			game: function () {
				return $scope.game;
			}
		}
	});

		    //Al cerrar el modal
		    $scope.modalInstance.result.then(function (credentials) {
		    	console.log("Si ha cerrado bien: " + JSON.stringify(credentials));
		    }, function () {
		    	$rootScope.updateGame = {};
		    	console.info('Modal dismissed at: ' + new Date());
		    });

		};

		function clone(obj) {
			if (null == obj || "object" != typeof obj) return obj;
			var copy = obj.constructor();
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
			}
			return copy;
		}

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
	};

	$scope.populate = function () {
		$rootScope.genresCheckBox = $rootScope.game.genres;
	};

	$scope.checkGenre = function (genre) {
		if ($rootScope.genresCheckBox.indexOf(genre) > -1) {
			return 1;
		}
		else {
			return -1;
		}
	};


});

controllers.controller('translationController', ['$translate', '$scope', 'tmhDynamicLocale', function ($translate, $scope, tmhDynamicLocale) {

	$scope.changeLanguage = function (langKey) {
		$translate.use(langKey);
		if (langKey === 'en') {
			tmhDynamicLocale.set('en-us');
		}
		else if (langKey === 'es') {
			tmhDynamicLocale.set('es-es');
		}
		else if (langKey === 'fr') {
			tmhDynamicLocale.set('fr-fr');
		}
		else if (langKey === 'de') {
			tmhDynamicLocale.set('de-de');
		}
	};

}]);

controllers.controller('platformController', function ($scope, $rootScope, $http, $location) {

	$scope.interval =5000;
	$scope.max= 10; 
	$scope.rate = 1;
	$scope.status = {
		isFirstOpen: true,
		isFirstDisabled: false
	};
	$scope.games = [];

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

	$scope.getAllPlatforms = function(){
		console.log("Estamos en plataformas")
		$http.get('/platforms')
		.success(function(platforms){
			$rootScope.platforms = platforms;
			$rootScope.currentPage = 1;
			$rootScope.numPerPage = 12;
			$rootScope.maxSize = 5;
			$rootScope.totalItems = platforms.length;
			$rootScope.platformPage = [];
			$rootScope.$watch("currentPage + numPerPage", function() {
				var begin = (($rootScope.currentPage - 1) * $rootScope.numPerPage);
				var end = begin + $rootScope.numPerPage;
				//console.log("begin:"+begin+"end:"+end);
				$rootScope.platformPage = $rootScope.platforms.slice(begin, end);
			});
			
		})
		.error(function(err){
			console.log(err);
		});
	};
	
	$scope.getPlatformById = function (id) {
		$http.get('/platforms/' + id)
		.success(function(platform) {
			$rootScope.platform = platform;
			$location.path('/platforms/' + id);
		})
		.error(function(err) {
			console.log(err);
		});
	};

	$scope.getBestGamesByPlatform = function(id) {
		$http.get('/games/best/' + id)
		.success(function (games) {
			$scope.games = games;
		})
		.error(function (err, status) {
			console.log(err);
		}); 
	};
	
});

controllers.controller('uploadController', ['$scope', 'Upload', '$rootScope' ,function ($scope, Upload, $rootScope) {

	$scope.folder= {};
	$scope.uploadProfileImage = function (files) {
		if (files && files.length) {
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				Upload.upload({
					url: '/uploads/profile',
					fields: {'username': $scope.username},
					file: file
				}).progress(function (evt) {
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
				}).success(function (data, status, headers, config) {
					console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
					console.log(data);
					$rootScope.updateUser.picture = data;
				});
			}
		}
	};

	$scope.uploadGameImage = function (files) {
		var path = $scope.folder.folder;
		console.log("guardando imagen de juego");
		console.log("path: " + path);
		if (files && files.length) {
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				Upload.upload({
					url: '/uploads/' + $rootScope.game._id + '/' + path,
					file: file
				}).progress(function (evt) {
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
				}).success(function (data, status, headers, config) {
					console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
					if (path === 'boxartfront') {
						$rootScope.updateGame.images.boxart.front = data;
					}
					if (path === 'banner') {
						$rootScope.updateGame.images.boxart.back = data;
					}
					if (path === 'banner') {
						$rootScope.updateGame.images.clearlogo = data;
					}
					if (path === 'banner') {
						$rootScope.updateGame.images.banner.push(data);
					}
					if (path === 'screenshot') {
						$rootScope.updateGame.images.screenshot.push(data);
					}
					if (path === 'fanart') {
						$rootScope.updateGame.images.fanart.push(data);
					}
				});  
			}  
		}
	};
	$scope.folders = ['boxartfront', 'boxartback', 'logo', 'banner', 'screenshot', 'fanart'];
}]);
