var http = require('http');
var fs = require('fs');
var request = require('request');

var id = 0;
var getsPorCiclo = 10;
var tiempoEntreCiclos = 2000;
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

	var options = {
		url: 'http://www.thegamesdb.net/api/GetGame.php?id=' + id,
		/*proxy: 'http://lupus.sia.es:8080'*/
	};
	request(options, function(err, res, xml) {
		console.log("Obtenida respuesta " + res.statusCode + " para el id " + id);
		if (err) {
			console.log(err);
		}
		else {
			var options = {
	    		mergeAttrs: true,
	    		charkey: "url"
	    	};
	    	xml = xml.replace(/(?:\r\n|\r|\n)/g, '');
	  		xml += "\n"
	  		fs.appendFileSync(file, xml);
	  		console.log("Guardado juego con id " + id);
	  		total++;
		}
	}).on('error', function(e) {
	  console.log("Error en peticion get de id " + id + ": " + e.message);
	});
}