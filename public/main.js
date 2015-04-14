var app = angular.module('igdbAngular', ['ngRoute']);  

app.controller('gameController', function ($scope, $http, $location) {
	$scope.formData = {};
	
	$http.get('/latest')
		.success(function(games) {
			$scope.games = games;
			console.log(games);
		})
		.error(function(err) {
			console.log(err);
		});

	$scope.getGameById = function (id) {
		console.log('Peticion a juego ' + id);
		$http.get('/games/' + id)
			.success(function(game) {
				$scope.game = game;
				$location.path('games/' + id);

			})
			.error(function(err) {
				console.log(err);
			})
	}


	
	
});

var url = "http://localhost:8888/games/20960";
	
	//Al ejecutar el script, espera a que se pulse el boton para acceder al numero de visitas
	$('document').ready( function() {

		$('#boton').click(function () {
			console.log("boton pulsado");
			$.ajax(url, {success: function(game) {
				console.log(game);
				$('#texto').html(game.gameTitle);
			}});
		});
	});
	