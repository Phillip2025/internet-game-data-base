//declaracion de app y sus dependencias
var app = angular.module('igdbAngular', ['ui.router', 'controllers']);  


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
	.state('adminpanel',{
		url:'/admin/adminPanel',
		templateUrl:'adminPanel.html'
	})
	.state('newgame',{
		url: '/admin/newgame',
		templateUrl: 'newgame.html'
	})
<<<<<<< HEAD
	.state('newuser',{
		url: '/user',
		templateUrl: 'newuser.html'
	})
=======
	.state('updategame',{
		url:'/admin/updategame',
		templateUrl:'updategame.html'
	});
>>>>>>> 4c8e07f45630e19a4befd95c0094b4f852e9695d
});

app.constant('esrbENG', 
	['T - Teen','M - Mature','E - Everyone','E10+ - Everyone 10+','RP - Rating Pending','EC - Early Childhood']
);

app.constant('esrbESP',
	['16','18','TP','10','RP','3']
);