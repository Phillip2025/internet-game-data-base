//declaracion de app y sus dependencias
var app = angular.module('igdbAngular', ['ui.router', 'controllers', 'ngAnimate', 'ui.bootstrap']);  


//state provider
app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: 'main.html',
	})
	.state('search', {
		url: '/search/:term',
		templateUrl: 'search.html'
	})
	.state('game', {
		url: '/games/:id',
		templateUrl: 'game.html'
	})
	.state('newgame',{
		url: '/admin/newgame',
		templateUrl: 'newgame.html'
	})
	.state('newuser',{
		url: '/user',
		templateUrl: 'newuser.html'
	})
	.state('updategame',{
		url:'/edit/:id',
		templateUrl:'updategame.html'
	})
	.state('updateuser',{
		url:'/updateuser/:user',
		templateUrl:'updateuser.html'
	})
	.state('perfil',{
		url:'/perfil',
		templateUrl:'perfil.html'
	});
});

app.constant('esrbENG', 
	['T - Teen','M - Mature','E - Everyone','E10+ - Everyone 10+','RP - Rating Pending','EC - Early Childhood']
);

app.constant('esrbESP',
	['16','18','TP','10','RP','3']
);