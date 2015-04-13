var parseString = require('xml2js').parseString;

var xml = "<Data><baseImgUrl>http://thegamesdb.net/banners/</baseImgUrl><Game><id>20960</id><GameTitle>Bloodborne</GameTitle><PlatformId>4919</PlatformId><Platform>Sony Playstation 4</Platform><ReleaseDate>03/24/2015</ReleaseDate><Overview>Face your fears as you search for answers in the ancient city of Yharnam, now cursed with a strange endemic illness spreading through the streets like wildfire. Danger, death and madness lurk around every corner of this dark and horrific world, and you must discover its darkest secrets in order to survive. A Terrifying New World: Journey to a horror-filled gothic city where deranged mobs and nightmarish creatures lurk around every corner. Strategic Action Combat: Armed with a unique arsenal of weaponry, including guns and saw cleavers, you'll need wits, strategy and reflexes to take down the agile and intelligent enemies that guard the city's dark secrets. A New Generation of Action RPG: Stunningly detailed gothic environments, atmospheric lighting, and advanced new online experiences showcase the power and prowess of the PlayStation(R)4 system.</Overview><ESRB>RP - Rating Pending</ESRB><Genres><genre>Action</genre><genre>Role-Playing</genre></Genres><Players>1</Players><Co-op>No</Co-op><Youtube>http://www.youtube.com/watch?v=G203e1HhixY</Youtube><Publisher>Sony</Publisher><Developer>FromSoftware, Inc.</Developer><Images><fanart><original width=\"1920\" height=\"1080\">fanart/original/20960-1.jpg</original><thumb>fanart/thumb/20960-1.jpg</thumb></fanart><boxart side=\"front\" width=\"410\" height=\"453\" thumb=\"boxart/thumb/original/front/20960-1.jpg\">boxart/original/front/20960-1.jpg</boxart><screenshot><original width=\"1920\" height=\"1080\">screenshots/20960-1.jpg</original><thumb>screenshots/thumb/20960-1.jpg</thumb></screenshot><screenshot><original width=\"1920\" height=\"1080\">screenshots/20960-2.jpg</original><thumb>screenshots/thumb/20960-2.jpg</thumb></screenshot><screenshot><original width=\"1920\" height=\"1080\">screenshots/20960-3.jpg</original><thumb>screenshots/thumb/20960-3.jpg</thumb></screenshot></Images></Game></Data>";

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
	coll = db.collection('juegos');
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