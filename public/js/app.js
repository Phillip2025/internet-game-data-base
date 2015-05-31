//declaracion de app y sus dependencias
var app = angular.module('igdbAngular', ['ui.router', 'controllers', 'directives', 'ngAnimate', 'ui.bootstrap', 'ui.autocomplete', 'pascalprecht.translate', 'tmh.dynamicLocale', 'ngFileUpload', 'youtube-embed']);  

//state provider
app.config(function($stateProvider, $urlRouterProvider, $translateProvider, tmhDynamicLocaleProvider) {

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
	.state('api', {
		url: '/api',
		templateUrl: 'api.html'
	})
	.state('user',{
		url:'/users/:id',
		templateUrl:'profile.html'
	})
	.state('platforms',{
		url: '/platforms',
		templateUrl: 'platforms.html'
	})
	.state('platform',{
		url: '/platforms/:id',
		templateUrl: 'platform.html'
	});

	$translateProvider
	.translations('es', translationsES)
	.translations('en', translationsEN)
	.preferredLanguage('es')
	.useSanitizeValueStrategy(null);

	tmhDynamicLocaleProvider
	.localeLocationPattern('js/ext/angular-locale_{{locale}}.js');

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
	NAV: {
		GAMES: "Juegos",
		PLATFORMS: "Plataformas",
		API: "Json Api",
		ABOUT: "Sitio web inspirado por thegamesdb.net. Felipe Murillo - Rafael Morena - Mario Arranz",
		SEARCH_PLACEHOLDER: "Busca tu juego",
		WELCOME: "Bienvenido",
		DROPDOWN: {
			ACCOUNT: "Tu cuenta",
			VIEW: "Ver perfil",
			MODIFY: "Ajustes de usuario",
			ADD_GAME: "Añadir juego",
			LOGOUT: "Cerrar sesión"
		}
	},
	LAST_GAMES: "Últimos juegos añadidos",
	BEST_GAMES: "Mejores juegos",
	RELATED_GAMES: "Juegos relacionados con el termino",
	ALL_PLATFORMS: "Todas las plataformas",
	GAME: {
		TITLE: "Titulo",
		ALTERNATE_TITLES: "Títulos alternativos",
		PLATFORM: "Plataforma",
		OTHER_PLATFORMS: "Otras plataformas",
		RELEASE_DATE: "Fecha de lanzamiento",
		ESRB: "Calificación por edades",
		PLAYERS: "Jugadores",
		COOP: "Cooperativo",
		COOPVALUES: {
			YES: 'Si',
			NO: 'No'
		},
		OVERVIEW: "Descripción",
		PUBLISHER: "Editor",
		DEVELOPER: "Desarrollador",
		GENRES: "Géneros",
		RATING: "Calificación",
		BANNERS: "Banners",
		SCREENSHOTS: "Capturas de pantalla",
		FANARTS: "Imágenes de usuarios",
		VIDEO: "Video",
		COMMENTS: "Comentarios",
		NO_COMMENTS: "No hay comentarios, que esperas para ser el primero?",
		ADD_COMMENT: "Publicar comentario",
		ADMIN: {
			DELETE: "Borrar juego",
			EDIT: "Editar juego"
		}
	},
	PLATFORM: {
		PLATFORM: "Plataforma",
		OVERVIEW: "Descripción",
		DEVELOPER: "Desarrollador",
		MANUFACTURER: "Fabricante",
		CPU: "Procesador",
		MEMORY: "Memoria",
		GRAPHICS: "Grafica",
		SOUND: "Sonido", 
		DISPLAY: "Display",
		MEDIA: "Media",
		MAXCONTROLLERS: "Maximo de Controladores",
		BANNERS: "Banners",
		SCREENSHOTS: "Capturas de pantalla",
		FANARTS: "Imágenes de usuarios"
	},
	NEW_USER_FORM: "Registro de nuevo usuario",
	USER: {
		USERNAME: "Nombre de usuario",
		PASSWORD: "Password",
		NAME: "Nombre",
		SURNAME: "Apellidos",
		EMAIL: "E-Mail",
		PICTURE: "Imagen de perfil"
	},
	PAGINATION: {
		PREVIOUS: "Anterior",
		NEXT: "Siguiente"
	}
};

var translationsEN = {
	SLOGAN_1: "Counting with at least ",
	SLOGAN_2: " games!",
	NAV: {
		GAMES: "Games",
		PLATFORMS: "Platforms",
		API: "Json Api",
		ABOUT: "Website inspired in thegamesdb.net. Felipe Murillo - Rafael Morena - Mario Arranz",
		SEARCH_PLACEHOLDER: "Search your game",
		WELCOME: "Welcome",
		DROPDOWN: {
			ACCOUNT: "Your account",
			VIEW: "View profile",
			MODIFY: "User settings",
			ADD_GAME: "Add game",
			LOGOUT: "Logout"
		}
	},
	LAST_GAMES: "Last added games",
	BEST_GAMES: "Best games",
	RELATED_GAMES: "Related games with the term",
	ALL_PLATFORMS: "All platforms",
	GAME: {
		TITLE: "Title",
		ALTERNATE_TITLES: "Alternate titles",
		PLATFORM: "Platform",
		OTHER_PLATFORMS: "Other plataforms",
		RELEASE_DATE: "Release date",
		ESRB: "ESRB Rating",
		PLAYERS: "Players",
		COOP: "Cooperative",
		COOPVALUES: {
			YES: 'Yes',
			NO: 'No'
		},
		OVERVIEW: "Overview",
		PUBLISHER: "Publisher",
		DEVELOPER: "Developer",
		GENRES: "Genres",
		RATING: "Rating",
		BANNERS: "Banners",
		SCREENSHOTS: "Screenshots",
		FANARTS: "Fanart",
		VIDEO: "video",
		COMMENTS: "Comments",
		NO_COMMENTS: "There are no comments, what are you waiting to write the first one?",
		ADD_COMMENT: "Add comment",
		ADMIN: {
			DELETE: "Delete game",
			EDIT: "Edit game"
		}
	},
	PLATFORM:{
		PLATFORM: "Platform",
		OVERVIEW: "Overview",
		DEVELOPER: "Developer",
		MANUFACTURER: "Manufacturer",
		CPU: "CPU",
		MEMORY: "Memory",
		GRAPHICS: "Graphics",
		SOUND: "Sound", 
		DISPLAY: "Display",
		MEDIA: "Media",
		MAXCONTROLLERS: "Controllers",
		BANNERS: "Banners",
		SCREENSHOTS: "Screenshots",
		FANARTS: "Fanarts"
	},
	NEW_USER_FORM: "User Sign Up",
	USER: {
		USERNAME: "Username",
		PASSWORD: "Password",
		NAME: "Name",
		SURNAME: "Surname",
		EMAIL: "Email",
		PICTURE: "Profile picture"
	},
	PAGINATION: {
		PREVIOUS: "Previous",
		NEXT: "Next"
	}
};