var parseString = require('xml2js').parseString;


var xml = '<Data> <baseImgUrl>http://thegamesdb.net/banners/</baseImgUrl> <Platform> <id>8</id> <Platform>Nintendo DS</Platform> <console>http://www.youtube.com/watch?v=8.png</console> <overview> The Nintendo DS (abbreviated to DS or NDS) is a portable game console produced by Nintendo, first released on November 21, 2004. A distinctive feature of the system is the presence of two separate LCD screens, the lower of which is a touchscreen, encompassed within a clamshell design, similar to the Game Boy Advance SP. The Nintendo DS also features a built-in microphone and supports wireless standards, allowing players to interact with each other within short range, or online with the Nintendo Wi-Fi Connection service. The Nintendo DS is the first Nintendo console to be released in North America before Japan. </overview> <developer>Nintendo</developer> <manufacturer>Foxconn</manufacturer> <cpu>ARM9</cpu> <memory>4 MB RAM</memory> <graphics>ARM946E-S</graphics> <sound>ARM7TDMI</sound> <display>256 × 192</display> <media>Cartridge</media> <maxcontrollers>1</maxcontrollers> <Rating>7.2857</Rating> <Images> <fanart> <original width="1920" height="1080">platform/fanart/8-1.jpg</original> <thumb>platform/fanart/thumb/8-1.jpg</thumb> </fanart> <fanart> <original width="1920" height="1080">platform/fanart/8-2.jpg</original> <thumb>platform/fanart/thumb/8-2.jpg</thumb> </fanart> <fanart> <original width="1920" height="1080">platform/fanart/8-3.jpg</original> <thumb>platform/fanart/thumb/8-3.jpg</thumb> </fanart> <boxart side="back" width="1533" height="1379">platform/boxart/8-1.jpg</boxart> <banner width="760" height="140">platform/banners/8-1.jpg</banner> <consoleart>platform/consoleart/8.png</consoleart> <controllerart>platform/controllerart/8.png</controllerart> </Images> </Platform> </Data>';
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/igdb';
var id = 1;
var getsPorCiclo = 1;
var tiempoEntreCiclos = 10000;
var idLimite = 1;
var total = 0;
var dataBase;
var coll;
var totalGenres = [];
var totalPlayers = [];
var totalESRB = [];

MongoClient.connect(url, function(err, db) {
	dataBase = db;
	coll = db.collection('platforms');
	var options = {
	    		mergeAttrs: true,
	    		charkey: "url"
	    	};
	parseString(xml, options, function(err, result) {
		try {
			console.log(result.Data.Platform);
			if (result.Data.Platform) {
				var datos = result.Data.Platform[0];
		    	var json = {};
		    	json._id = parseInt(datos.id[0]);
		    	json.platform = datos.Platform[0];
		    	json.console = datos.console[0];
				json.overview = datos.overview[0];

				json.developer = datos.developer[0];
				json.manufacturer = datos.manufacturer[0];				
				json.cpu = datos.cpu[0];
				json.memory = datos.memory[0];
				json.graphics = datos.graphics[0];
				json.sound = datos.sound[0];
				json.display = datos.display[0];
				json.media = datos.media[0];	
				json.media = datos.maxcontrollers[0];
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
							if (images.consoleart) {
					    		json.images.consoleArt = images.consoleart[0];
					    	}
							if (images.controllerart) {
					    		json.images.controllerArt = images.controllerart[0];
					    	}
			    console.log(json);
			    coll.insert(json);
			    console.log("Guardado plataforma con id " + datos.id);
			}
			else {
				console.log("No se encontro datos para el id " + id);
			}
			db.close();
			}
		}
		catch (err){
			console.log("Fallo en id" + datos.id);
			console.log(err);
		}
	});
});