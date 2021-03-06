var http = require('http');
var parseString = require('xml2js').parseString;
var MongoClient = require('mongodb').MongoClient;
var request = require('request');
var fs = require('fs');

var url = 'mongodb://localhost:27017/igdb';
var id = 0;
var getsPorCiclo = 5;
var tiempoEntreCiclos = 1000;
var idLimite = 4930;
var total = 0;
var dataBase;
var coll;
var publicPath = '../public/';
var iconsPath = 'img/platformicons/';

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

var boxNotAvailable = {
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
			process.exit(0);
		});
	}
	else {
		do {
			console.log("Accediendo a la plataforma con id " + id);
			savePlatformbyId(id);
			id++;
			//fix
			if (id == 40) {
				id = 4900;
			}
		} while (id <= idFin);
		console.log("Esperando " + tiempoEntreCiclos / 1000 + " segundos a que se completen las operaciones previas");
		setTimeout(function() {
			callback(id, totalAProcesar, procesar);
		}, tiempoEntreCiclos);
	}
}

function savePlatformbyId(id) {
	var options = {
		url: 'http://www.thegamesdb.net/api/GetPlatform.php?id=' + id,
		//proxy: 'http://lupus.sia.es:8080'
	};
	request(options, function(err, res, body) {
	  	console.log("Obtenida respuesta " + res.statusCode + " para el id " + id);
		if (err) {
			console.log(err);
		}
		else {
	  		var options = {
	    		mergeAttrs: true,
	    		charkey: "url"
	    	};
			parseString(body, options, function(err, result) {
				try {
					if (result.Data.Platform) {
						var datos = result.Data.Platform[0];
				    	var json = {};
				    	json._id = parseInt(datos.id[0]);
				    	json.platform = datos.Platform[0];
				    	if (datos.console) {
							json.console = datos.console[0];
						}
						if (datos.controller){
				    		json.controller = datos.controller[0];
						}
						if (datos.overview){
				    		json.overview = datos.overview[0];	
						}
						if (datos.developer) {
				 	  		json.developer = datos.developer[0];								
						}
						if (datos.manufacturer) {
				    		json.manufacture = datos.manufacturer[0];							
						}
						if (datos.cpu) {
				   		 	json.cpu = datos.cpu[0];							
						}
						if (datos.memory) {
				   			json.memory = datos.memory[0];							
						}
						if (datos.graphics) {
					   		json.graphics = datos.graphics[0];							
						}
						if (datos.sound) {
					   		json.sound = datos.sound[0];						
						}
						if (datos.display) {
							json.display = datos.display[0];						
						}
						if (datos.media) {
							json.media = datos.media[0];
						}
						if (datos.maxcontrollers) {
							json.maxControllers = datos.maxcontrollers[0];					
						}
				    	if (datos.Rating) {
				    		json.rating = parseFloat(datos.Rating[0]);
				    	}
				    	else {
				    		json.rating = 5;
				    	}
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
									if (images.boxart[i].side[0] === 'back') {
					    				json.images.boxart.back = boxart;
					    			}
								}
					    	}
					    	else {
					    		json.images.boxart = {};
					    		json.images.boxart = boxNotAvailable;
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
							if (images.consoleart) {
					    		json.images.consoleArt = iconsPath + id + '.png';
					    		var options = {
										url: baseUrl + images.consoleart,
										//proxy: 'http://lupus.sia.es:8080'
									};
									fs.exists(publicPath + iconsPath, function(exists) {
									    if (!exists) {
									        fs.mkdirSync(publicPath + iconsPath);
									    }
									});
									request(options).pipe(fs.createWriteStream(publicPath + iconsPath + id + '.png'));
					    	}
							else {
					    		json.images.consoleArt = iconsPath + 'no-icon.png';							
							}
							if (images.controllerart) {
					    		json.images.controllerArt = images.controllerart[0];
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
		}
	});
}