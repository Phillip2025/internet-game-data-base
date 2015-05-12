//declaracion de app y sus dependencias
var app = angular.module('igdbAngular', ['ui.router', 'controllers', 'directives', 'ngAnimate', 'ui.bootstrap', 'ui.autocomplete', 'pascalprecht.translate']);  


//state provider
app.config(function($stateProvider, $urlRouterProvider, $translateProvider) {

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
	})
	.state('allplatforms',{
		url: '/platforms',
		templateUrl: 'platforms.html'
	})
	.state('platform',{
		url: '/platform/:id',
		templateUrl: 'platform.html'
	})
	.state('newplatform',{
		url: '/admin/newplatform',
		templateUrl: 'newplatform.html'
	})
	.state('updateplatform',{
		url:'/edit/:id',
		templateUrl:'updateplatform.html'
	})

	$translateProvider
	.translations('es', translationsES)
	.translations('en', translationsEN)
	.preferredLanguage('es')
	.useSanitizeValueStrategy(null);

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

var translationsES = {
	SLOGAN_1: "Contamos con ",
	SLOGAN_2: " juegos al menos!",
	NAV_GAMES: "Juegos",
	NAV_PLATFORMS: "Plataformas",
	SEARCH_PLACEHOLDER: "Busca tu juego",
	LAST_GAMES: "Últimos juegos añadidos",
	GAME: {
		TITLE: "Titulo",
		ALTERNATE_TITLES: "Títulos alternativos",
		PLATFORM: "Plataforma",
		OTHER_PLATFORMS: "Otras plataformas",
		RELEASE_DATE: "Fecha de lanzamiento",
		ESRB: "Calificación por edades",
		PLAYERS: "Jugadores",
		COOP: "Cooperativo",
		OVERVIEW: "Descripción",
		PUBLISHER: "Editor",
		DEVELOPER: "Desarrollador",
		GENRES: "Géneros",
		RATING: "Calificación",
		BANNERS: "Banners",
		SCREENSHOTS: "Capturas de pantalla",
		FANARTS: "Imágenes de usuarios",
		COMMENTS: "Comentarios",
		NO_COMMENTS: "No hay comentarios, que esperas para ser el primero?",
		ADD_COMMENT: "Publicar comentario"
	}
};

var translationsEN = {
	SLOGAN_1: "Counting with at least ",
	SLOGAN_2: " games!",
	NAV_GAMES: "Games",
	NAV_PLATFORMS: "Platforms",
	SEARCH_PLACEHOLDER: "Search your game",
	LAST_GAMES: "Last added games",
	GAME: {
		TITLE: "Title",
		ALTERNATE_TITLES: "Alternate titles",
		PLATFORM: "Platform",
		OTHER_PLATFORMS: "Other plataforms",
		RELEASE_DATE: "Release date",
		ESRB: "ESRB Rating",
		PLAYERS: "Players",
		COOP: "Cooperative",
		OVERVIEW: "Overview",
		PUBLISHER: "Publisher",
		DEVELOPER: "Developer",
		GENRES: "Genres",
		RATING: "Rating",
		BANNERS: "Banners",
		SCREENSHOTS: "Screenshots",
		FANARTS: "Fanart",
		COMMENTS: "Comments",
		NO_COMMENTS: "There are no comments, what are you waiting to write the first one?",
		ADD_COMMENT: "Add comment"
	}
};