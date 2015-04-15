var parseString = require('xml2js').parseString;


var xml = '<Data><baseImgUrl>http://thegamesdb.net/banners/</baseImgUrl><Game><id>2</id><GameTitle>Crysis</GameTitle><PlatformId>1</PlatformId><Platform>PC</Platform><ReleaseDate>11/13/2007</ReleaseDate><Overview>From the makers of Far Cry, Crysis offers FPS fans the best-looking, most highly-evolving gameplay, requiring the player to use adaptive tactics and total customization of weapons and armor to survive in dynamic, hostile environments including Zero-G. Earth, 2019. A team of US scientists makes a frightening discovery on an island in the South China Sea. All contact with the team is lost when the North Korean Government quickly seals off the area. The United States responds by dispatching an elite team of Delta Force Operators to recon the situation. As tension rises between the two nations, a massive alien ship reveals itself in the middle of the island. The ship generates an immense force sphere that freezes a vast portion of the island and drastically alters the global weather system. Now the US and North Korea must join forces to battle the alien menace. With hope rapidly fading, you must fight epic battles through tropical jungle, frozen landscapes, and finally into the heart of the alien ship itself for the ultimate Zero G showdown.</Overview><ESRB>M - Mature</ESRB><Genres><genre>Shooter</genre></Genres><Players>4+</Players><Co-op>No</Co-op><Youtube>http://www.youtube.com/watch?v=i3vO01xQ-DM</Youtube><Publisher>Electronic Arts</Publisher><Developer>Crytek</Developer><Rating>7.4167</Rating><Images><fanart><original width="1920" height="1080">fanart/original/2-1.jpg</original><thumb>fanart/thumb/2-1.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/2-2.jpg</original><thumb>fanart/thumb/2-2.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/2-3.jpg</original><thumb>fanart/thumb/2-3.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/2-4.jpg</original><thumb>fanart/thumb/2-4.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/2-5.jpg</original><thumb>fanart/thumb/2-5.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/2-6.jpg</original><thumb>fanart/thumb/2-6.jpg</thumb></fanart><boxart side="back" width="1525" height="2162" thumb="boxart/thumb/original/back/2-1.jpg">boxart/original/back/2-1.jpg</boxart><boxart side="front" width="1525" height="2160" thumb="boxart/thumb/original/front/2-1.jpg">boxart/original/front/2-1.jpg</boxart><banner width="760" height="140">graphical/2-g2.jpg</banner><banner width="760" height="140">graphical/2-g3.jpg</banner><screenshot><original width="1920" height="1080">screenshots/2-1.jpg</original><thumb>screenshots/thumb/2-1.jpg</thumb></screenshot><clearlogo width="400" height="100">clearlogo/2.png</clearlogo></Images></Game></Data>'
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/igdb';
var id = 1;
var getsPorCiclo = 1;
var tiempoEntreCiclos = 10000;
var idLimite = 1;
var total = 0;
var dataBase;
var coll;

MongoClient.connect(url, function(err, db) {
	dataBase = db;
	coll = db.collection('games');
	var options = {
	    		mergeAttrs: true,
	    		charkey: "url"
	    	};
	parseString(xml, options, function(err, result) {
		try {
			if (result.Data.Game !== undefined) {
				var datos = result.Data.Game[0];
		    	var json = {};
		    	json._id = parseInt(datos.id[0]);
		    	json.gameTitle = datos.GameTitle[0];
		    	if (datos.AlternateTitles !== undefined) {
		    		json.alternateTitles = datos.AlternateTitles[0].title;
		    	}
		    	json.platformId = parseInt(datos.PlatformId[0]);
		    	json.platform = datos.Platform[0];
		    	json.releaseDate = datos.ReleaseDate[0];
		    	json.overview = datos.Overview[0];
		    	if (datos.ESRB !== undefined) {
		    		json.esrb = datos.ESRB[0];
		    	}
		    	if (datos.Genres !== undefined) {
		    		json.genres = datos.Genres[0].genre;
		    	}
		    	if (datos.Players !== undefined) {
		    		json.players = datos.Players[0];
		    	}
		    	if (datos['Co-op'] !== undefined) {
		    		json.coop = datos['Co-op'][0];
		    	}
		    	if (datos.Youtube !== undefined) {
		    		json.youtube = datos.Youtube[0];
		    	}
		    	if (datos.Publisher !== undefined) {
		    		json.publisher = datos.Publisher[0];
		    	}
		    	if (datos.Developer !== undefined) {
		    		json.developer = datos.Developer[0];
		    	}
		    	if (datos.Rating !== undefined) {
		    		json.rating = parseFloat(datos.Rating[0]);
		    	}
		    	else {
		    		json.rating = 5;
		    	}
		    	json.ratings = [];
		    	json.comments = [];
		    	if (datos.Images !== undefined) {
			    	json.images = datos.Images[0];
			    	json.baseUrl = result.Data.baseImgUrl[0];
			    } 
			    coll.insert(json);
			    console.log("Guardado juego con id " + datos.id);
			    total++;
			}
			else {
				console.log("No se encontro datos");
			}
			db.close();
		}
		catch (err){
			console.log("Fallo en id" + datos.id);
			console.log(err);
		}
	});
});