var http = require('http');
var parseString = require('xml2js').parseString;
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/igdb';
var id = 0;
var getsPorCiclo = 40;
var tiempoEntreCiclos = 1000;
var idLimite = 41;
var total = 0;
var dataBase;
var coll;
var totalGenres = [];
var totalPlayers = [];
var totalESRB = [];
var twoBoxGames = 0;
var twoLogoGames = 0;

var imgNotAvailable = [{ 
	url: "img/image.gif",
	width: 800,
	height: 600,
	thumb: "img/image-thumb.gif"
}];

var frontBoxNotAvailable = { 
	url: "img/front.gif",
	side: "front",
	width: 800,
	height: 600,
	thumb: "img/front-thumb.gif"
};

var backBoxNotAvailable = {
	url: "img/back.gif",
	side: "back",
	width: 800,
	height: 600,
	thumb: "img/back-thumb.gif"
};

var bannerNotAvailable = [{ 
	url: "img/banner.gif",
	width: 760,
	height: 140
}];

var logoNotAvailable = [{ 
	url: "img/logo.gif",
	width: 400,
	height: 200
}];

MongoClient.connect(url, function(err, db) {
	dataBase = db;
	coll = db.collection('platforms');
	procesar(id, getsPorCiclo, procesar);
});

function procesar(id, totalAProcesar, callback) {
	var idFin = id + totalAProcesar - 1;
	if (id > idLimite) {
		dataBase.close(function() {
			console.log("Total de plataformas procesadas: " + total);
			console.log("Plataformas con mas de 2 caratulas: " + twoBoxGames);
			console.log("Plataformas con mas de 2 logos: " + twoLogoGames);
		    console.log(totalESRB);
		    console.log(totalGenres);
		    console.log(totalPlayers);
			process.exit(0);
		});
	}
	else {
		do {
			console.log("Accediendo a la plataforma con id " + id);
			saveGamebyId(id);
			id++;
		} while (id <= idFin);
		console.log("Esperando " + tiempoEntreCiclos / 1000 + " segundos a que se completen las operaciones previas");
		setTimeout(function() {
			callback(id, totalAProcesar, procesar);
		}, tiempoEntreCiclos);
	}
}

function saveGamebyId(id) {
	var getOptions = {
		host: "thegamesdb.net",
		path: "/api/GetGame.php?id=" + id
	};
	var proxyOptions = {
		host: "lupus.sia.es",
		port: 8080,
		path: "thegamesdb.net/api/GetGame.php?id=" + id,
		headers: {
		/*Host: "www.thegamesdb.net"*/
		}
	};
	http.get(getOptions, function(res) {
	  	console.log("Obtenida respuesta " + res.statusCode + " para el id " + id);
	  	var xml = "";
	  	res.on("data", function(body) {
	  		xml += body;
	  	});
	  	res.on("end", function() {
	  		var options = {
	    		mergeAttrs: true,
	    		charkey: "url"
	    	};
			parseString(xml, options, function(err, result) {
				try {
					if (result.Data.Game) {
						var datos = result.Data.Game[0];
				    	var json = {};
				    	json._id = parseInt(datos.id[0]);
				    	json.gameTitle = datos.GameTitle[0];
				    	if (datos.AlternateTitles) {
				    		json.alternateTitles = datos.AlternateTitles[0].title;
				    	}
				    	json.platformId = parseInt(datos.PlatformId[0]);
				    	json.platform = datos.Platform[0];
				    	if (datos.ReleaseDate) {
				    		json.releaseDate = new Date(datos.ReleaseDate[0]);
				    	}
				    	json.created = new Date();
				    	if (datos.Overview) {
				    		json.overview = datos.Overview[0];
				    	}
				    	if (datos.ESRB) {
				    		json.esrb = datos.ESRB[0];
				    		if (totalESRB.indexOf(json.esrb) == -1) {
				    			totalESRB.push(json.esrb);
				    		}
				    	}
				    	if (datos.Genres) {
				    		json.genres = datos.Genres[0].genre;
				    		for (var j = 0; j< json.genres.length; j++) {
				    			gen = json.genres[j];
				    			if (totalGenres.indexOf(gen) == -1) {
				    				totalGenres.push(gen);
				    			}
				    		}
				    	}
				    	if (datos.Players) {
				    		json.players = datos.Players[0];
				    		if (totalPlayers.indexOf(json.players) == -1) {
				    			totalPlayers.push(json.players);
				    		}
				    	}
				    	if (datos['Co-op']) {
				    		json.coop = datos['Co-op'][0];
				    	}
				    	if (datos.Similar) {
				    		json.similar = [];
				    		for (var i = 0; i < datos.Similar[0].SimilarCount[0]; i++) {
				    			var similarGame = {};
				    			similarGame._id = datos.Similar[0].Game[i].id[0];
				    			similarGame.platformId = datos.Similar[0].Game[i].PlatformId[0];
				    			json.similar.push(similarGame);
				    		}
				    	}
				    	if (datos.Youtube) {
				    		json.youtube = datos.Youtube[0];
				    	}
				    	if (datos.Publisher) {
				    		json.publisher = datos.Publisher[0];
				    	}
				    	if (datos.Developer) {
				    		json.developer = datos.Developer[0];
				    	}
				    	if (datos.Rating) {
				    		json.rating = parseFloat(datos.Rating[0]);
				    	}
				    	else {
				    		json.rating = 5;
				    	}
				    	json.ratings = [];
				    	json.comments = [];
				    	if (datos.Images) {
					    	json.images = {};
					    	var images = datos.Images[0];
					    	var baseUrl = result.Data.baseImgUrl[0];
					    	if (images.fanart) {
					    		json.images.fanart = [];
					    		for(var i = 0; i < images.fanart.length; i++) {
					    			var fanart = {};
					    			fanart.url = baseUrl + images.fanart[i].original[0].url;
					    			fanart.width = parseInt(images.fanart[i].original[0].width[0]);
					    			fanart.height = parseInt(images.fanart[i].original[0].height[0]);
					    			fanart.thumb = baseUrl + images.fanart[i].thumb[0];
					    			json.images.fanart.push(fanart);
					    		}
					    	}
					    	else {
					    		json.images.fanart = imgNotAvailable;
					    	}
					    	if (images.boxart) {
					    		json.images.boxart = {};
					    		for(var i = 0; i < images.boxart.length; i++) {
					    			var boxart = {};
					    			boxart.url = baseUrl + images.boxart[i].url;
					    			boxart.width = parseInt(images.boxart[i].width[0]);
					    			boxart.height = parseInt(images.boxart[i].height[0]);
					    			boxart.thumb = baseUrl + images.boxart[i].thumb[0];
					    			if (images.boxart[i].side[0] === 'front') {
					    				json.images.boxart.front = boxart;
					    			}
					    			else if (images.boxart[i].side[0] === 'back') {
					    				json.images.boxart.back = boxart;
					    			}
					    		}
					    		if (!json.images.boxart.front) {
					    			json.images.boxart.front = frontBoxNotAvailable;
					    		}
					    		if (!json.images.boxart.back) {
					    			json.images.boxart.back = backBoxNotAvailable;
					    		}
					    	}
					    	else {
					    		json.images.boxart = {};
					    		json.images.boxart.front = frontBoxNotAvailable;
					    		json.images.boxart.back = backBoxNotAvailable;
					    	}
					    	if (images.screenshot) {
					    		json.images.screenshot = [];
					    		for(var i = 0; i < images.screenshot.length; i++) {
					    			var screenshot = {};
					    			screenshot.url = baseUrl + images.screenshot[i].original[0].url;
					    			screenshot.width = parseInt(images.screenshot[i].original[0].width[0]);
					    			screenshot.height = parseInt(images.screenshot[i].original[0].height[0]);
					    			screenshot.thumb = baseUrl + images.screenshot[i].thumb[0];
									json.images.screenshot.push(screenshot);
					    		}
					    	}
					    	else {
					    		json.images.screenshot = imgNotAvailable;
					    	}
					    	if (images.banner) {
					    		json.images.banner = [];
					    		for(var i = 0; i < images.banner.length; i++) {
					    			var banner = {};
					    			banner.url = baseUrl + images.banner[i].url;
					    			banner.width = parseInt(images.banner[i].width[0]);
					    			banner.height = parseInt(images.banner[i].height[0]);
					    			json.images.banner.push(banner);
					    		}
					    	}
					    	else {
					    		json.images.banner = bannerNotAvailable;
					    	}
					    	if (images.clearlogo) {
					    		json.images.clearlogo = {};
				    			json.images.clearlogo.url = baseUrl + images.clearlogo[0].url;
				    			json.images.clearlogo.width = parseInt(images.clearlogo[0].width[0]);
				    			json.images.clearlogo.height = parseInt(images.clearlogo[0].height[0]);
					    	}
					    	else {
					    		json.images.clearlogo = logoNotAvailable;
					    	}
					    } 
					    coll.insert(json);
					    console.log("Guardado juego con id " + datos.id);
					    total++;
					}
					else {
						console.log("No se encontro datos para el id " + id);