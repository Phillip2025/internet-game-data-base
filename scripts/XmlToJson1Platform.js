var parseString = require('xml2js').parseString;


var xml = '<Data> <baseImgUrl>http://thegamesdb.net/banners/</baseImgUrl> <Platform> <id>2</id> <Platform>Nintendo GameCube</Platform> <console>http://www.youtube.com/watch?v=2.png</console> <controller>http://www.youtube.com/watch?v=2.png</controller> <overview> The Nintendo GameCube was the first Nintendo console to use optical discs as its primary storage medium, after several aborted projects from Nintendo and its partners to utilize optical-based storage media. In contrast with the GameCube&#039;s contemporary competitors, Sony&#039;s PlayStation 2, Sega&#039;s Dreamcast and Microsoft&#039;s Xbox, the GameCube uses miniDVD-based discs instead of full-size DVDs. Partially as a result of this, it does not have the DVD-Video playback functionality of these systems, nor the audio CD playback ability of other consoles that use full-size optical discs. In addition, the GameCube introduced a variety of connectivity options to Nintendo consoles, and was the fourth Nintendo console, after the Nintendo 64DD, Famicom Modem and Satellaview, to support online play officially, via the Nintendo GameCube Broadband Adapter and Modem Adapter (sold separately). It also enabled connectivity to the Game Boy Advance to access exclusive features of certain games or to use the portable system as a controller for the Game Boy Player. </overview> <developer>Nintendo</developer> <manufacturer>Nintendo</manufacturer> <cpu>486 MHz IBM &quot;Gekko&quot; PowerPC CPU</cpu> <memory>43 MB total non-unified RAM</memory> <graphics> 162 MHz &quot;Flipper&quot; LSI (co-developed by Nintendo and ArtX, acquired by ATI) </graphics> <sound>Dolby Pro Logic II</sound> <display> 640×480 interlaced (480i) or progressive scan (480p) - 60 Hz </display> <media>Disc</media> <maxcontrollers>4</maxcontrollers> <Rating>7.6429</Rating> <Images> <fanart> <original width="1920" height="1080">platform/fanart/2-1.jpg</original> <thumb>platform/fanart/thumb/2-1.jpg</thumb> </fanart> <fanart> <original width="1920" height="1080">platform/fanart/2-2.jpg</original> <thumb>platform/fanart/thumb/2-2.jpg</thumb> </fanart> <fanart> <original width="1920" height="1080">platform/fanart/2-3.jpg</original> <thumb>platform/fanart/thumb/2-3.jpg</thumb> </fanart> <boxart side="back" width="550" height="773">platform/boxart/2-1.jpg</boxart> <boxart side="back" width="550" height="773">platform/boxart/2-2.jpg</boxart> <banner width="760" height="140">platform/banners/2-1.png</banner> <banner width="760" height="140">platform/banners/2-2.jpg</banner> <consoleart>platform/consoleart/2.png</consoleart> <controllerart>platform/controllerart/2.png</controllerart> </Images> </Platform> </Data>';
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
				json.controller = datos.controller[0];		    	
				json.overview = datos.overview[0];
				json.developer = datos.developer[0];
				json.manufacturer = datos.manufacturer[0];				
				json.cpu = datos.cpu[0];
				json.memory = datos.memory[0];
				json.graphics = datos.graphics[0];
				json.sound = datos.sound[0];
				json.display = datos.display[0];
				json.media = datos.media[0];							
		    	if (datos.Rating) {
		    		json.rating = parseFloat(datos.Rating[0]);
		    	}
		    	else {
		    		json.rating = 5;
		    	}
		    	if (datos.Images) {
			    	json.images = datos.Images[0];
			    	json.baseUrl = result.Data.baseImgUrl[0];
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
		catch (err){
			console.log("Fallo en id" + datos.id);
			console.log(err);
		}
	});
});