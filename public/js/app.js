//declaracion de app y sus dependencias
var app = angular.module('igdbAngular', ['ui.router', 'controllers', 'directives', 'ngAnimate', 'ui.bootstrap', 'ui.autocomplete']);  


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

app.run(function ($rootScope, $location, $http) {
    $http.get('/confirmlogin')
        .success(function (user) {
        	$rootScope.user = user;
        })
        .error(function (err) {
        	console.log("Error: " + err);
        });
});

app.constant('esrbENG', 
	['T - Teen','M - Mature','E - Everyone','E10+ - Everyone 10+','RP - Rating Pending','EC - Early Childhood']
);

app.constant('esrbESP',
	['16','18','TP','10','RP','3']
);

app.constant('players',
	['1', '2', '3', '4+']
);

app.constant('genres',
	['Shooter','Action','Flight Simulator','Role-Playing','Adventure',
			'Sandbox','Fighting','Racing','Horror','MMO','Platform',
			'Puzzle','Strategy','Stealth','Sports','Construction and Management Simulation',
			'Vehicle Simulation','Life Simulation','Music']
);