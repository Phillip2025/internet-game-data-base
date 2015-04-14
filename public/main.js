var app = angular.module('igdbAngular', ['ngRoute']);  

app.controller('gameController', function ($scope, $http) {
	$scope.formData = {};
	
	$http.get('/games')
		.success(function(games) {
			$scope.games = games;
			console.log(games);
		})
		.error(function(err) {
			console.log(err);
		});
	
	
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
	