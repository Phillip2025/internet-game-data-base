var parseString = require('xml2js').parseString;

var xml = '<Data><baseImgUrl>http://thegamesdb.net/banners/</baseImgUrl><Game><id>161</id><GameTitle>The Legend of Zelda: Ocarina of Time</GameTitle><AlternateTitles><title>Zelda 64</title></AlternateTitles><PlatformId>3</PlatformId><Platform>Nintendo 64</Platform><ReleaseDate>11/21/1998</ReleaseDate><Overview>Ganondorf, the evil King of Thieves, is on the move, threatening the peaceful land of Hyrule. He is determined to steal his way into the legendary Sacred Realm in hopes of harnessing the power of the mythical Triforce. As the young hero Link, it is your destiny to thwart Ganondorf’s evil schemes. Navi, your guardian fairy, will guide you as you venture through the many regions of Hyrule, from the volcanic caves of Death Mountain to the treacherous waters of Zora’s Domain. Before you complete this epic quest, you’ll delve into deadly dungeons, collect weapons of great power and learn the spells you need to conquer the most irresistible force of all-time. * The immersive storyline and environments draw players into an amazing 3D world. * Time travel allows you to play as Link in different stages of his life. * New gameplay features include a unique targeting system and 1st and 3rd person perspectives. * Up to three games can be saved simultaneously to memory!</Overview><ESRB>E - Everyone</ESRB><Genres><genre>Action</genre><genre>Adventure</genre><genre>Role-Playing</genre></Genres><Players>1</Players><Co-op>No</Co-op><Youtube>http://www.youtube.com/watch?v=gw1e2qFhGzY</Youtube><Publisher>Nintendo</Publisher><Developer>Nintendo EAD</Developer><Rating>8.125</Rating><Similar><SimilarCount>1</SimilarCount><Game><id>21449</id><PlatformId>9</PlatformId></Game></Similar><Images><fanart><original width="1920" height="1080">fanart/original/161-1.jpg</original><thumb>fanart/thumb/161-1.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-10.jpg</original><thumb>fanart/thumb/161-10.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-11.jpg</original><thumb>fanart/thumb/161-11.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-12.jpg</original><thumb>fanart/thumb/161-12.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-13.jpg</original><thumb>fanart/thumb/161-13.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-14.jpg</original><thumb>fanart/thumb/161-14.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-16.jpg</original><thumb>fanart/thumb/161-16.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-17.jpg</original><thumb>fanart/thumb/161-17.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-18.jpg</original><thumb>fanart/thumb/161-18.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-19.jpg</original><thumb>fanart/thumb/161-19.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-2.jpg</original><thumb>fanart/thumb/161-2.jpg</thumb></fanart><fanart><original width="1280" height="720">fanart/original/161-20.jpg</original><thumb>fanart/thumb/161-20.jpg</thumb></fanart><fanart><original width="1280" height="720">fanart/original/161-21.jpg</original><thumb>fanart/thumb/161-21.jpg</thumb></fanart><fanart><original width="1280" height="720">fanart/original/161-23.jpg</original><thumb>fanart/thumb/161-23.jpg</thumb></fanart><fanart><original width="1280" height="720">fanart/original/161-24.jpg</original><thumb>fanart/thumb/161-24.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-25.jpg</original><thumb>fanart/thumb/161-25.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-3.jpg</original><thumb>fanart/thumb/161-3.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-4.jpg</original><thumb>fanart/thumb/161-4.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-5.jpg</original><thumb>fanart/thumb/161-5.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-6.jpg</original><thumb>fanart/thumb/161-6.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-7.jpg</original><thumb>fanart/thumb/161-7.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-8.jpg</original><thumb>fanart/thumb/161-8.jpg</thumb></fanart><fanart><original width="1920" height="1080">fanart/original/161-9.jpg</original><thumb>fanart/thumb/161-9.jpg</thumb></fanart><boxart side="back" width="1000" height="697" thumb="boxart/thumb/original/back/161-1.jpg">boxart/original/back/161-1.jpg</boxart><boxart side="front" width="2100" height="1530" thumb="boxart/thumb/original/front/161-1.png">boxart/original/front/161-1.png</boxart><banner width="760" height="140">graphical/161-g.jpg</banner><banner width="760" height="140">graphical/161-g2.png</banner><screenshot><original width="1024" height="768">screenshots/161-1.jpg</original><thumb>screenshots/thumb/161-1.jpg</thumb></screenshot><screenshot><original width="1440" height="900">screenshots/161-2.jpg</original><thumb>screenshots/thumb/161-2.jpg</thumb></screenshot><clearlogo width="400" height="300">clearlogo/161.png</clearlogo></Images></Game></Data>';
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
		    		json.releaseDate = new Date(datos.ReleaseDate[0]);
		    	}
		    	json.created = new Date();
		    	if (datos.Overview) {
		    		json.overview = datos.Overview[0];
		    	}
		    	if (datos.ESRB) {
		    		json.esrb = datos.ESRB[0];
		    		if (totalESRB.indexOf(json.esrb) == -1) {
		    			totalESRB.push(json.esrb);
		    		}
		    	}
		    	if (datos.Genres) {
		    		json.genres = datos.Genres[0].genre;
		    		for (var j = 0; j< json.genres.length; j++) {
		    			gen = json.genres[j];
		    			if (totalGenres.indexOf(gen) == -1) {
		    				totalGenres.push(gen);
		    			}
		    		}
		    	}
		    	if (datos.Players) {
		    		json.players = datos.Players[0];
		    		if (totalPlayers.indexOf(json.players) == -1) {
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
			    	if (images.screenshot) {
			    		json.images.screenshot = [];
			    		for(var i = 0; i < images.screenshot.length; i++) {
			    			var screenshot = {};
			    			screenshot.url = baseUrl + images.screenshot[i].original[0].url;
			    			screenshot.width = parseInt(images.screenshot[i].original[0].width[0]);
			    			screenshot.height = parseInt(images.screenshot[i].original[0].height[0]);
			    			screenshot.thumb = baseUrl + images.screenshot[i].thumb[0];
							json.images.screenshot.push(screenshot);
			    		}
			    	}
			    	else {
			    		json.images.screenshot = imgNotAvailable;
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
			    	if (images.clearlogo) {
			    		json.images.clearlogo = {};
		    			json.images.clearlogo.url = baseUrl + images.clearlogo[0].url;
		    			json.images.clearlogo.width = parseInt(images.clearlogo[0].width[0]);
		    			json.images.clearlogo.height = parseInt(images.clearlogo[0].height[0]);
			    	}
			    	else {
			    		json.images.clearlogo = logoNotAvailable;
			    	}
			    } 
			    coll.insert(json);
			    console.log("Guardado juego");// con id " + datos.id);
			    total++;
			}
			else {
				console.log("No se encontro datos");// para el id " + id);
			}
		}
		catch (err){
			console.log("Fallo");// en id" + id);
			console.log(err);
		}
	});
});