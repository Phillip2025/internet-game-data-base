var app = angular.module('igdbAngular', ['ui.router']);  

app.controller('gameController', function ($scope, $rootScope, $http, $location) {
	$scope.formData = {};
	
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
			$location.path('games/' + id);

		})
		.error(function(err) {
			console.log(err);
		});
	};

	
});

app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
			url: '/',
			templateUrl: 'main.html',
		})
	.state('game', {
		url: '/games/:id',
		templateUrl: 'game.html'
	});
});