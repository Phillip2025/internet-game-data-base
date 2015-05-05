var parseString = require('xml2js').parseString;


var xml = '<Data><baseImgUrl>http://thegamesdb.net/banners/</baseImgUrl><Game><id>5281</id><GameTitle>Call of Juarez</GameTitle><PlatformId>1</PlatformId><Platform>PC</Platform><ReleaseDate>06/05/2007</ReleaseDate><Overview>A narrator tells the legend of the Gold of Juarez, which was allegedly meant as a ransom for Moctezuma, held hostage by conquistadores. The treasure was lost long ago and never found again. Nevertheless, many daring souls set out to retrieve the riches of the Aztec Empire, but the treasure is rumored to be cursed. Billy is a young man who doesn\'t know who his father is, and has no real last name. Due to the town\'s racism against his Mexican ancestry, he suffered racial prejudice from the local population. He especially hated his stepfather Thomas, who beat him daily. Fed up, Billy left his hometown of Hope to go after the Gold of Juarez, but after two years of fruitless searching, he found nothing. Billy eventually returns to Hope, but when he arrives, he finds his mother and Thomas dead, lying underneath the words "Call of Juarez" written in blood. A man named Reverend Ray, a former outlaw who is Thomas\' brother, sees Billy standing over his family, and presumes that Billy is the murderer. Billy flees from Ray’s attacks and escapes. Ray decides that it is his duty as God\'s emissary to track down and kill Billy for the crime.</Overview><ESRB>M - Mature</ESRB><Genres><genre>Shooter</genre></Genres><Co-op>No</Co-op><Publisher>Ubisoft</Publisher><Developer>Techland</Developer><Rating>6.25</Rating><Similar><SimilarCount>1</SimilarCount><Game><id>12895</id><PlatformId>15</PlatformId></Game></Similar><Images><fanart><original width="1920" height="1080">fanart/original/5281-1.jpg</original><thumb>fanart/thumb/5281-1.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/5281-2.jpg</original><thumb>fanart/thumb/5281-2.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/5281-3.jpg</original><thumb>fanart/thumb/5281-3.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/5281-4.jpg</original><thumb>fanart/thumb/5281-4.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/5281-5.jpg</original><thumb>fanart/thumb/5281-5.jpg</thumb></fanart><boxart side="back" width="756" height="1079" thumb="boxart/thumb/original/back/5281-1.jpg">boxart/original/back/5281-1.jpg</boxart><boxart side="front" width="1517" height="2139" thumb="boxart/thumb/original/front/5281-1.jpg">boxart/original/front/5281-1.jpg</boxart><banner width="760" height="140">graphical/5281-g.png</banner><banner width="760" height="140">graphical/5281-g2.png</banner><screenshot><original width="1920" height="1080">screenshots/5281-1.jpg</original><thumb>screenshots/thumb/5281-1.jpg</thumb></screenshot><screenshot><original width="1920" height="1080">screenshots/5281-2.jpg</original><thumb>screenshots/thumb/5281-2.jpg</thumb></screenshot><screenshot><original width="1920" height="1080">screenshots/5281-3.jpg</original><thumb>screenshots/thumb/5281-3.jpg</thumb></screenshot><screenshot><original width="1920" height="1080">screenshots/5281-4.jpg</original><thumb>screenshots/thumb/5281-4.jpg</thumb></screenshot><clearlogo width="400" height="100">clearlogo/5281.png</clearlogo></Images></Game></Data>';
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
			console.log(result.Data.Game);
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
			    //coll.insert(json);
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