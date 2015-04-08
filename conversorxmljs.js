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