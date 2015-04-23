var parseString = require('xml2js').parseString;


var xml = '<Data><baseImgUrl>http://thegamesdb.net/banners/</baseImgUrl><Game><id>149</id><GameTitle>World of Warcraft</GameTitle><PlatformId>1</PlatformId><Platform>PC</Platform><ReleaseDate>11/23/2004</ReleaseDate><ESRB>T - Teen</ESRB><Genres><genre>MMO</genre><genre>Role-Playing</genre></Genres><Players>4+</Players><Co-op>Yes</Co-op><Youtube>http://www.youtube.com/watch?v=dYK_Gqyf48Y</Youtube><Publisher>Blizzard Entertainment</Publisher><Developer>Blizzard Entertainment</Developer><Rating>7.6667</Rating></Game></Data>';
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
	coll = db.collection('games');
	var options = {
	    		mergeAttrs: true,
	    		charkey: "url"
	    	};
	parseString(xml, options, function(err, result) {
		try {
			if (result.Data.Game) {
				var datos = result.Data.Game[0];
		    	var json = {};
		    	json._id = parseInt(datos.id[0]);
		    	json.gameTitle = datos.GameTitle[0];
		    	if (datos.AlternateTitles) {
		    		json.alternateTitles = datos.AlternateTitles[0].title;
		    	}
		    	json.platformId = parseInt(datos.PlatformId[0]);
		    	json.platform = datos.Platform[0];
		    	if (datos.ReleaseDate) {
		    		json.releaseDate = datos.ReleaseDate[0];
		    	}
		    	if (datos.Overview) {
		    		json.overview = datos.Overview[0];
		    	}
		    	if (datos.ESRB) {
		    		json.esrb = datos.ESRB[0];
		    		if (!totalESRB[json.esrb]) {
		    			totalESRB.push(json.esrb);
		    		}
		    	}
		    	if (datos.Genres) {
		    		json.genres = datos.Genres[0].genre;
		    		for (var j = 0; j< json.genres.length; j++) {
		    			gen = json.genres[j];
		    			if (!totalGenres[gen]) {
		    				totalGenres.push(gen);
		    			}
		    		}
		    	}
		    	if (datos.Players) {
		    		json.players = datos.Players[0];
		    		if (!totalPlayers[json.players]) {
		    			totalPlayers.push(json.players);
		    		}
		    	}
		    	if (datos['Co-op']) {
		    		json.coop = datos['Co-op'][0];
		    	}
		    	if (datos.Similar) {
		    		json.similar = [];
		    		for (var i = 0; i < datos.Similar[0].SimilarCount[0]; i++) {
		    			var similarGame = {};
		    			similarGame._id = datos.Similar[0].Game[i].id[0];
		    			similarGame.platformId = datos.Similar[0].Game[i].PlatformId[0];
		    			json.similar.push(similarGame);
		    		}
		    	}
		    	if (datos.Youtube) {
		    		json.youtube = datos.Youtube[0];
		    	}
		    	if (datos.Publisher) {
		    		json.publisher = datos.Publisher[0];
		    	}
		    	if (datos.Developer) {
		    		json.developer = datos.Developer[0];
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
			    	json.images = datos.Images[0];
			    	json.baseUrl = result.Data.baseImgUrl[0];
			    } 
			    console.log(json);
			    coll.insert(json);
			    console.log("Guardado juego con id " + datos.id);
			    total++;
			    console.log(totalESRB);
			    console.log(totalGenres);
			    console.log(totalPlayers);
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