var http = require('http');
var parseString = require('xml2js').parseString;
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/igdb';
var id = 1;
var getsPorCiclo = 50;
var tiempoEntreCiclos = 1000;
var idLimite = 500;
var total = 0;
var dataBase;
var coll;
var totalGenres = [];
var totalPlayers = [];
var totalESRB = [];

MongoClient.connect(url, function(err, db) {
	dataBase = db;
	coll = db.collection('games');
	procesar(id, getsPorCiclo, procesar);
});

function procesar(id, totalAProcesar, callback) {
	var idFin = id + totalAProcesar - 1;
	if (id > idLimite) {
		dataBase.close(function() {
			console.log("Total de juegos procesados: " + total);
			process.exit(0);
		});
	}
	else {
		do {
			console.log("Accediendo al juego con id " + id);
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
				    		json.releaseDate = datos.ReleaseDate[0];
				    	}
				    	if (datos.Overview) {
				    		json.overview = datos.Overview[0];
				    	}
				    	if (datos.ESRB) {
				    		json.esrb = datos.ESRB[0];
				    		if (!totalESRB[json.esrb]) {
				    			totalESRB.push(json.esrb);
				    		}
				    	}
				    	if (datos.Genres) {
				    		json.genres = datos.Genres[0].genre;
				    		for (var j = 0; j< json.genres.length; j++) {
				    			gen = json.genres[j];
				    			if (!totalGenres[gen]) {
				    				totalGenres.push(gen);
				    			}
				    		}
				    	}
				    	if (datos.Players) {
				    		json.players = datos.Players[0];
				    		if (!totalPlayers[json.players]) {
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
					    	json.images = datos.Images[0];
					    	json.baseUrl = result.Data.baseImgUrl[0];
					    } 
					    coll.insert(json);
					    console.log("Guardado juego con id " + datos.id);
					    total++;
					    console.log(totalESRB);
					    console.log(totalGenres);
					    console.log(totalPlayers);
					}
					else {
						console.log("No se encontro datos para el id " + id);
					}
				}
				catch (err){
					console.log("Fallo en id" + id);
					console.log(err);
				}
			});
		});
	}).on('error', function(e) {
	  console.log("Error en peticion get de id " + id + ": " + e.message);
	});
}