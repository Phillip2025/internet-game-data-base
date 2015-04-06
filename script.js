var http = require('http');
var parseString = require('xml2js').parseString;
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/igdb';
var id = 1;
var getsPorCiclo = 50;
var tiempoEntreCiclos = 1000;
var idLimite = 2000;
var total = 0;
var dataBase;
var coll;

MongoClient.connect(url, function(err, db) {
	dataBase = db;
	coll = db.collection('juegos');
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
	    		explicitArray: false,
	    		charkey: "content"
	    	};
			parseString(xml, options, function(err, result) {
				try {
					if (result.Data.Game !== undefined) {
						var datos = result.Data.Game;
				    	var json = {};
				    	json._id = parseInt(datos.id);
				    	json.titulo = datos.GameTitle;
				    	if (datos.AlternateTitles !== undefined) {
				    		json.tituloAlternativo = datos.AlternateTitles.title;
				    	}
				    	json.idPlataforma = parseInt(datos.PlatformId);
				    	json.plataforma = datos.Platform;
				    	json.fechaDeLanzamiento = datos.ReleaseDate;
				    	json.descripcion = datos.Overview;
				    	if (datos.ESRB !== undefined) {
				    		json.clasificacion = datos.ESRB;
				    	}
				    	if (datos.Genres !== undefined) {
				    		json.genero = datos.Genres.genre;
				    	}
				    	if (datos.Players !== undefined) {
				    		json.jugadores = datos.Players;
				    	}
				    	json.coop = datos['Co-op'];
				    	if (datos.Youtube !== undefined) {
				    		json.youtube = datos.Youtube;
				    	}
				    	if (datos.Publisher !== undefined) {
				    		json.editor = datos.Publisher;
				    	}
				    	if (datos.Developer !== undefined) {
				    		json.desarrollador = datos.Developer;
				    	}
				    	json.puntuacion = datos.Rating;
				    	if (datos.Images !== undefined) {
					    	json.imagenes = datos.Images;
					    	json.urlBase = result.Data.baseImgUrl;
					    } 
					    coll.insert(json);
					    console.log("Guardado juego con id " + id);
					    total++;
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
};