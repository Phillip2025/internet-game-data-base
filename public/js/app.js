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
	})
	.state('soulmates', {
		url: '/soulmates/:id',
		templateUrl: 'soulmates.html'
	});

	$translateProvider
	.translations('es', translationsES)
	.translations('en', translationsEN)
	.translations('fr', translationsFR)
	.translations('de', translationsDE)
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
		SOUL_MATES: "Almas gemelas",
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
		COMMENT: "Introduce tu comentario",
		NO_COMMENTS: "No hay comentarios, que esperas para ser el primero?",
		ADD_COMMENT: "Publicar comentario",
		REGISTER_TO_RATE: "Regístrate para votar este juego",
		REGISTER_TO_COMMENT: "Regístrate para comentar este juego",
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
		PROFILE_MSG: "Bienvenido a tu perfil: ",
		UPDATE: "Editar perfil",
		USERNAME: "Nombre de usuario",
		PASSWORD: "Password",
		NAME: "Nombre",
		SURNAME: "Apellidos",
		EMAIL: "E-Mail",
		PICTURE: "Imagen de perfil",
		CONFIRM: "Escribe de nuevo la Password",
		SELECT: "Seleccionar",
		PHOTO: "Foto actual",
		EDIT: "Editar"
	},
	PAGINATION: {
		PREVIOUS: "Anterior",
		NEXT: "Siguiente"
	},
	API: {
		TITLE: "API pública",
		INTRO_1: "Todos nuestros datos proceden de",
		INTRO_2: "Nuestro trabajo ha consistido en la serialización a JSON de su base de datos. Así mismo ofrecemos la posibilidad de usar nuestra API de forma pública, usando sencillos comandos",
		GAMES: {
			INTRO: "Dentro de games tenemos varios usos del API",
			GET_GAME: "Devuelve la información de un juego dado su id, por ejemplo:",
		},
		SEARCH: {
			INTRO: "Dentro de search tenemos varios usos del API:",
			SEARCH_BY_TERM: "Devuelve una lista con la información de uno o varios juegos dado un término de busqueda, por ejemplo:",
			SEARCH_BY_LETTER: "Devuelve una lista con la información de uno o varios juegos comenzando por la letra dada, por ejemplo:"
		},
		PLATFORMS: {
			INTRO: "Dentro de platforms tenemos varios usos del API:",
			GET_PLATFORM: "Devuelve la información de una plataforma de videojuegos dado su id, por ejemplo:"
		},
		USERS: {
			INTRO: "Dentro de users tenemos varios usos del API:",
			GET_USER: "Devuelve la información de un usuario dado su id. Contiene sus datos proporcionados, sus comentarios y sus votaciones. Por ejemplo:"
		}
	},
	SOUL_MATES: {
		TITLE: "Juegos recomendados por usuarios con gustos similares",
		RECOMMENDS: "te sugiere jugar a:"
	}
};

var translationsEN = {
	SLOGAN_1: "Counting with at least ",
	SLOGAN_2: " games!",
	NAV: {
		GAMES: "Games",
		PLATFORMS: "Platforms",
		SOUL_MATES: "Soulmates",
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
		VIDEO: "Video",
		COMMENTS: "Comments",
		COMMENT: "Enter your comment",
		NO_COMMENTS: "There are no comments, what are you waiting to write the first one?",
		ADD_COMMENT: "Add comment",
		REGISTER_TO_RATE: "Register here to rate this game",
		REGISTER_TO_COMMENT: "Register here to comment this game",
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
		PROFILE_MSG: "Welcome to your profile: ",
		UPDATE: "Edit profile",
		USERNAME: "Username",
		PASSWORD: "Password",
		NAME: "Name",
		SURNAME: "Surname",
		EMAIL: "Email",
		PICTURE: "Profile picture",
		CONFIRM: "Retype Password",
		SELECT: "Select",
		PHOTO: "Current photo",
		EDIT: "Edit"
	},
	PAGINATION: {
		PREVIOUS: "Previous",
		NEXT: "Next"
	},
	API: {
		TITLE: "Public API",
		INTRO_1: "All of our data comes from",
		INTRO_2: "Our job has consisted in the JSON serialization of their database. Like they do, we offer the possibility to access our data using easy commands from our public API: ",
		GAMES: {
			INTRO: "Inside games we have several uses of our API:",
			GET_GAME: "Returns information of a game, using its id as parameter, for example:",
		},
		SEARCH: {
			INTRO: "Inside search we have several uses of our API:",
			SEARCH_BY_TERM: "Returns a list with information of one or several games, using a search term as parameter, for example:",
			SEARCH_BY_LETTER: "Returns a list with information of one or several games starting with a given letter, for example:"
		},
		PLATFORMS: {
			INTRO: "Inside platforms we have several uses of our API:",
			GET_PLATFORM: "Returns information of a videogame platform, using its id as parameter, for example:"
		},
		USERS: {
			INTRO: "Inside users we have several uses of our API:",
			GET_USER: "Returns information of an user, using its id as parameter, including their public data, comments and ratings, for example:"
		}
	},
	SOUL_MATES: {
		TITLE: "Suggested games from users with similar tastes",
		RECOMMENDS: "suggests you to play:"
	}
};

var translationsFR = {
	SLOGAN_1: "Compter avec au moins ",
	SLOGAN_2: " jeux!",
	NAV: {
		GAMES: "Jeux",
		PLATFORMS: "Platformes",
		SOUL_MATES: "Âmes soeurs",
		API: "Json Api",
		ABOUT: "Site inspiré dans thegamesdb.net. Felipe Murillo - Rafael Morena - Mario Arranz",
		SEARCH_PLACEHOLDER: "Cherchez dans votre jeu",
		WELCOME: "Bienvenue",
		DROPDOWN: {
			ACCOUNT: "Votre compte",
			VIEW: "Voir le profil",
			MODIFY: "Paramètres de l'utilisateur",
			ADD_GAME: "Ajouter le jeu",
			LOGOUT: "Déconnexion"
		}
	},
	LAST_GAMES: "Dernier ajouté jeux",
	BEST_GAMES: "Les meilleurs jeux",
	RELATED_GAMES: "Jeux liés avec le terme",
	ALL_PLATFORMS: "Toutes les platsformes",
	GAME: {
		TITLE: "Titre",
		ALTERNATE_TITLES: "Titres alternatifs",
		PLATFORM: "Platforme",
		OTHER_PLATFORMS: "Autres plataformes",
		RELEASE_DATE: "Date de sortie",
		ESRB: "Classement ESRB",
		PLAYERS: "Joueurs",
		COOP: "Coopérative",
		COOPVALUES: {
			YES: 'Oui',
			NO: 'Non'
		},
		OVERVIEW: "Présentation",
		PUBLISHER: "Editeur",
		DEVELOPER: "Développeur",
		GENRES: "Genres",
		RATING: "Note",
		BANNERS: "Bannières",
		SCREENSHOTS: "Captures d'écran",
		FANARTS: "Fanart",
		VIDEO: "Video",
		COMMENTS: "Commentaires",
		COMMENT: "Entrez votre commentaire",
		NO_COMMENTS: "Il n'y a aucun commentaire, qu'attendez-vous pour écrire le premier?",
		ADD_COMMENT: "Ajouter un commentaire",
		REGISTER_TO_RATE: "Inscrivez-vous pour noter ce jeu",
		REGISTER_TO_COMMENT: "Inscrivez-vous ici pour commenter ce jeu",
		ADMIN: {
			DELETE: "Suprimmer jeu",
			EDIT: "Modifier jeu"
		}
	},
	PLATFORM:{
		PLATFORM: "Platforme",
		OVERVIEW: "Présentation",
		DEVELOPER: "Développeur",
		MANUFACTURER: "Fabricant",
		CPU: "CPU",
		MEMORY: "Mémoire",
		GRAPHICS: "Graphics",
		SOUND: "Son", 
		DISPLAY: "Display",
		MEDIA: "Media",
		MAXCONTROLLERS: "Contrôleurs",
		BANNERS: "Bannières",
		SCREENSHOTS: "Captures d'écran",
		FANARTS: "Fanarts"
	},
	NEW_USER_FORM: "Inscription",
	USER: {
		PROFILE_MSG: "Bienvenue à votre profil: ",
		UPDATE: "Modifier mon profil",
		USERNAME: "Nom d'utilisateur",
		PASSWORD: "Mot de passe",
		NAME: "Prenom",
		SURNAME: "Nom",
		EMAIL: "Email",
		PICTURE: "Photo de profil",
		CONFIRM: "Confirmer mot de passe",
		SELECT: "Sélectionner",
		PHOTO: "Photo actuelle",
		EDIT: "Modifier"
	},
	PAGINATION: {
		PREVIOUS: "Précédent",
		NEXT: "Suivant"
	},
	API: {
		TITLE: "API publique",
		INTRO_1: "Tous nos données proviennent de",
		INTRO_2: "Notre travail a consisté à la sérialisation JSON de leur base de données comme ils le font, nous offrons la possibilité d'accéder à nos données en utilisant des commandes simples de notre API publique:",
		GAMES: {
			INTRO: "Dans jeux, nous avons plusieurs utilisations de notre API:",
			GET_GAME: "Renvoie les informations d'un jeu, en utilisant son identifiant comme paramètre, par exemple:",
		},
		SEARCH: {
			INTRO: "Dans Recherche, nous avons plusieurs utilisations de notre API:",
			SEARCH_BY_TERM: "Retourne une liste avec des informations d'un ou plusieurs jeux, en utilisant un terme de recherche en tant que paramètre, par exemple:",
			SEARCH_BY_LETTER: "Retourne une liste avec des informations d'un ou plusieurs jeux commençant par une lettre donnée, par exemple:"
		},
		PLATFORMS: {
			INTRO: "Dans platesformes, nous avons plusieurs utilisations de notre API:",
			GET_PLATFORM: "Renvoie les informations d'une plate-forme de jeu vidéo, en utilisant son identifiant comme paramètre, par exemple:"
		},
		USERS: {
			INTRO: "Dans utilisateurs, nous ont plusieurs utilisations de notre API:",
			GET_USER: "Renvoie les informations d'un utilisateur, en utilisant son id en tant que paramètre, y compris leurs données publiques et commentaires, par exemple:"
		}
	},
		SOUL_MATES: {
		TITLE: "Jeux proposés des utilisateurs avec des goûts similaires",
		RECOMMENDS: "suggère de jouer:"
	}
};

var translationsDE = {
	SLOGAN_1: "Zählen mit mindestens ",
	SLOGAN_2: " Videospielen!",
	NAV: {
		GAMES: "Videospielen",
		PLATFORMS: "Plattforms",
		SOUL_MATES: "Seelenverwandten",
		API: "Json Api",
		ABOUT: "Webseite in thegamesdb.net inspiriert Felipe Murillo - Rafael Morena - Mario Arranz",
		SEARCH_PLACEHOLDER: "Suchen Sie Ihr Videopiel",
		WELCOME: "Willkommen",
		DROPDOWN: {
			ACCOUNT: "Ihr Konto",
			VIEW: "Profil",
			MODIFY: "Benutzereinstellungen",
			ADD_GAME: "Spiel hinzufügen",
			LOGOUT: "Logout"
		}
	},
	LAST_GAMES: "Zuletzt hinzugefügt Videospielen",
	BEST_GAMES: "Best games",
	RELATED_GAMES: "Ähnliche VideoSpielen mit dem Begriff",
	ALL_PLATFORMS: "Alle plattformen",
	GAME: {
		TITLE: "Titel",
		ALTERNATE_TITLES: "Ähnliche Titel",
		PLATFORM: "Plattform",
		OTHER_PLATFORMS: "Andere plattformen",
		RELEASE_DATE: "Veröffentlichung",
		ESRB: "ESRB Rating",
		PLAYERS: "Players",
		COOP: "Cooperative",
		COOPVALUES: {
			YES: 'Ja',
			NO: 'Nein'
		},
		OVERVIEW: "Übersicht",
		PUBLISHER: "Publisher",
		DEVELOPER: "Entwickler",
		GENRES: "Genres",
		RATING: "Rating",
		BANNERS: "Banners",
		SCREENSHOTS: "Screenshots",
		FANARTS: "Fanart",
		VIDEO: "Video",
		COMMENTS: "Kommentare",
		COMMENT: "Geben Sie Ihren Kommentar",
		NO_COMMENTS: "Es gibt keine Kommentare, worauf warten Sie noch, um die erste schreiben?",
		ADD_COMMENT: "Kommentar hinzufügen",
		REGISTER_TO_RATE: "Melden Sie sich hier, um dieses Spiel zu bewerten",
		REGISTER_TO_COMMENT: "Melden Sie sich hier, um dieses Spiel zu kommentieren",
		ADMIN: {
			DELETE: "Videospiel löschen",
			EDIT: "Edit Videospiel"
		}
	},
	PLATFORM:{
		PLATFORM: "Plattform",
		OVERVIEW: "Übersicht",
		DEVELOPER: "Entwickler",
		MANUFACTURER: "Hersteller",
		CPU: "CPU",
		MEMORY: "Memory",
		GRAPHICS: "Graphics",
		SOUND: "Sound", 
		DISPLAY: "Display",
		MEDIA: "Media",
		MAXCONTROLLERS: "Steuerungen",
		BANNERS: "Banners",
		SCREENSHOTS: "Screenshots",
		FANARTS: "Fanarts"
	},
	NEW_USER_FORM: "User Registrieren",
	USER: {
		PROFILE_MSG: "Willkommen in Ihrem Profil: ",
		UPDATE: "Profil hinzufügen",
		USERNAME: "Benutzername",
		PASSWORD: "Password",
		NAME: "Name",
		SURNAME: "Surname",
		EMAIL: "Email",
		PICTURE: "Bild",
		CONFIRM: "Passwort erneut eingeben",
		SELECT: "Select",
		PHOTO: "Aktuelle Bild",
		EDIT: "Edit"
	},
	PAGINATION: {
		PREVIOUS: "Zurück",
		NEXT: "Nächster"
	},
	API: {
		TITLE: "Public API",
		INTRO_1: "Alle unsere Daten stammen aus",
		INTRO_2: "Unsere Aufgabe ist in der JSON Serialisierung von ihrer Datenbank bestand aus wie sie es tun, bieten wir die Möglichkeit, unsere Daten mit einfachen Befehlen von unseren öffentlichen API zugreifen. ",
		GAMES: {
			INTRO: "Inside Videospiele, die wir haben einigen Gebrauch unserer API:",
			GET_GAME: "Gibt Informationen aus einem Videospiel, mit dessen ID als Parameter, zum Beispiel:",
		},
		SEARCH: {
			INTRO: "Inside Suche Wir haben verschiedene Einsatzmöglichkeiten unserer API:",
			SEARCH_BY_TERM: "Gibt eine Liste mit Informationen von einem oder mehreren Videospielen, mit einem Suchbegriff als Parameter, zum Beispiel:",
			SEARCH_BY_LETTER: "Gibt eine Liste mit den Daten einer oder mehrerer Videospiele, beginnend mit einem bestimmten Buchstaben, zum Beispiel:"
		},
		PLATFORMS: {
			INTRO: "Inside Plattformen Wir haben verschiedene Einsatzmöglichkeiten unserer API:",
			GET_PLATFORM: "Gibt Informationen aus einem Videospiel Plattform, mit seiner ID als Parameter, zum Beispiel:"
		},
		USERS: {
			INTRO: "Inside Benutzer wir haben einigen Gebrauch unserer API:",
			GET_USER: "Gibt Informationen eines Benutzers, mit seiner ID als Parameter, einschließlich ihrer öffentlichen Daten, Kommentare und Bewertungen, zum Beispiel:"
		}
	},
		SOUL_MATES: {
		TITLE: "Spielvorschläge von Nutzern mit ähnlichen Geschmack",
		RECOMMENDS: "schlägt vor spielen:"
	}
};