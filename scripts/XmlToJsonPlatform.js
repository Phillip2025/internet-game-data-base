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
var twoBoxPlatforms = 0;
var twoLogoPlatforms = 0;

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
			console.log("Plataformas con mas de 2 caratulas: " + twoBoxPlatforms);
			console.log("Plataformas con mas de 2 logos: " + twoLogoPlatforms);
		    console.log(totalESRB);
		    console.log(totalGenres);
		    console.log(totalPlayers);
			process.exit(0);
		});
	}
	else {
		do {
			console.log("Accediendo a la plataforma con id " + id);
			savePlatformbyId(id);
			id++;
		} while (id <= idFin);
		console.log("Esperando " + tiempoEntreCiclos / 1000 + " segundos a que se completen las operaciones previas");
		setTimeout(function() {
			callback(id, totalAProcesar, procesar);
		}, tiempoEntreCiclos);
	}
}

function savePlatformbyId(id) {
	var getOptions = {
		host: "thegamesdb.net",
		path: "/api/GetPlatform.php?id=" + id
	};
	var proxyOptions = {
		host: "lupus.sia.es",
		port: 8080,
		path: "thegamesdb.net/api/GetPlatform.php?id=" + id,
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
					if (result.Data.Platform) {
						var datos = result.Data.Platform[0];
				    	var json = {};
				    	json._id = parseInt(datos.id[0]);
						console.log("ha entrado hasta aqui")
				    	json.platform = datos.Platform[0];
				    	json.console = datos.console[0].title;
				    	json.platformId = parseInt(datos.PlatformId[0]);
				    	json.platform = datos.Platform[0];

				    	if (datos.Controller) {
				    		json.controller = datos.Controller[0];
				    	}
				    	if (datos.Overview) {
				    		json.overview = datos.Overview[0];
				    	}
				    	if (datos.Developer) {
				    		json.developer = datos.Developer[0];
				    	}
				    	if (datos.Manufacture) {
				    		json.manufacture = datos.Manufacture[0];
				    	}
				    	if (datos.Cpu) {
				    		json.cpu = datos.Cpu[0];
				    	}
				    	if (datos.Memory) {
				    		json.memory = datos.Memory[0];
				    	}
				    	if (datos.Graphics) {
				    		json.graphics = datos.Graphics[0];
				    	}
				    	if (datos.Sound) {
				    		json.sound = datos.Sound[0];
				    	}
						if (datos.Display) {
							json.display = datos.Display[0];
						}
						if (datos.Media) {
							json.media = datos.Media[0];
						}
						if (datos.MaxControllers) {
							json.maxControllers = datos.MaxControllers[0];
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
							if (!json.images.ConsoleArt) {
					    		json.images.consoleart = datos.ConsoleArt[0];
					    	}
							else {
					    		json.images.consoleart = imgNotAvailable;								
							}
							if (!json.images.ControllerArt) {
					    		json.images.controllerart = datos.ControllerArt[0];
					    	}
							else {
					    		json.images.consoleart = imgNotAvailable;								
							}
					    } 
					    coll.insert(json);
					    console.log("Guardado plataforma con id " + datos.id);
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
}