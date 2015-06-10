var parseString = require('xml2js').parseString;
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var syncRequest = require('sync-request');

var url = 'mongodb://localhost:27017/igdb';
var file = "fullxml.txt";
var dataBase;
var coll;
var ids = [908,161,646,746,149,140,151,12,7870,4378,526,13958];

var input = fs.createReadStream(file);

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
	if (err) {
		console.log(err);
	}
	dataBase = db;
	coll = db.collection('games');
	for (var i = 0; i < ids.length; i++) {
		var gameId = ids[i];
		coll.findOne({_id:gameId}, function(err, game) {
			if (err) {
				console.log(err)
			}
			else if (game){
				game.created = new Date();
				var images = game.images;
				console.log(images.fanart[0].url + ": si es estatico no deberia entrar");
				if (images.fanart[0].url.indexOf('h') == 0) {
					for(var i = 0; i < images.fanart.length; i++) {
						var fanart = images.fanart[i];
						var img = syncRequest('GET', fanart.url);
						var commonRoute = 'img/fanart/' + fanart.url.substr(fanart.url.lastIndexOf('/') + 1, fanart.url.length);
						fs.writeFileSync('../public/' + commonRoute, img.body);
						fanart.url = commonRoute;
					}
				}
				if (images.boxart.front.url.indexOf('h') == 0) {
					var boxart = images.boxart;
					var img = syncRequest('GET', boxart.front.url);
					var commonRoute = 'img/boxartfront/' + boxart.front.url.substr(boxart.front.url.lastIndexOf('/') + 1, boxart.front.url.length);
					fs.writeFileSync('../public/' + commonRoute, img.body);
					boxart.front.url = commonRoute;
					
				}
				if (images.boxart.back.url.indexOf('h') == 0) {
					var boxart = images.boxart;
					var img = syncRequest('GET', boxart.back.url);
					var commonRoute = 'img/boxartback/' + boxart.back.url.substr(boxart.back.url.lastIndexOf('/') + 1, boxart.back.url.length);
					fs.writeFileSync('../public/' + commonRoute, img.body);
					boxart.back.url = commonRoute;
					
				}
				if (images.screenshot[0].url.indexOf('h') == 0) {
					for(var i = 0; i < images.screenshot.length; i++) {
						var screenshot = images.screenshot[i];
						var img = syncRequest('GET', screenshot.url);
						var commonRoute = 'img/screenshot/' + screenshot.url.substr(screenshot.url.lastIndexOf('/') + 1, screenshot.url.length);
						fs.writeFileSync('../public/' + commonRoute, img.body);
						screenshot.url = commonRoute;
					}
				}
				if (images.banner[0].url.indexOf('h') == 0) {
					for(var i = 0; i < images.banner.length; i++) {
						var banner = images.banner[i];
						var img = syncRequest('GET', banner.url);
						var commonRoute = 'img/banner/' + banner.url.substr(banner.url.lastIndexOf('/') + 1, banner.url.length);
						fs.writeFileSync('../public/' + commonRoute, img.body);
						banner.url = commonRoute;
					}
				}
				if (images.clearlogo.url.indexOf('h') == 0) {
					var clearlogo = images.clearlogo;
					var img = syncRequest('GET', clearlogo.url);
					var commonRoute = 'img/logo/' + clearlogo.url.substr(clearlogo.url.lastIndexOf('/') + 1, clearlogo.url.length);
					fs.writeFileSync('../public/' + commonRoute, img.body);
					clearlogo.url = commonRoute;
					
				}
				coll.save(game);
				console.log("Guardado juego con id " + game._id);
			}
		});
	}
});