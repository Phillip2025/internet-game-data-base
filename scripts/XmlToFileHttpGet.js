var http = require('http');
var fs = require('fs');

var id = 0;
var getsPorCiclo = 25;
var tiempoEntreCiclos = 1000;
var idLimite = 27000;
var total = 0;
var file = 'gamesxml.txt';

procesar(id, getsPorCiclo, procesar);

function procesar(id, totalAProcesar, callback) {
	var idFin = id + totalAProcesar - 1;
	if (id > idLimite) {
		console.log("Total de juegos procesados: " + total);
		process.exit(0);
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
	  		xml = xml.replace(/(?:\r\n|\r|\n)/g, '');
	  		xml += "\n"
	  		fs.appendFileSync(file, xml);
	  		console.log("Guardado juego con id " + id);
	  		total++;
		});
	}).on('error', function(e) {
	  console.log("Error en peticion get de id " + id + ": " + e.message);
	});
}