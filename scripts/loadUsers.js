var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

var url = 'mongodb://localhost:27017/igdb';
//users totales
var limit = 30000;
//id por el que empieza a crear users
var minId = 30000;
//array que contiene los nombres de los juegos
var gameNames = new Array(27000);

/*Con la lista original de 100 usuarios, va creando usuarios
con diferentes juegos y diferentes notas hasta llegar al 
limite de usuarios marcado
*/
MongoClient.connect(url, function(err, db) {
	coll = db.collection('games');
	coll.find().toArray(function(err, games) {
		for (var i = 0; i < games.length; i++) {
			var pos = games[i]._id;
			gameNames[pos] = games[i].gameTitle;
		}
		//damos tiempo a cargar el array
		setTimeout(function () {
			coll = db.collection('users');
			var users = JSON.parse(fs.readFileSync('100users.json', 'utf8'));
			processUser(minId, users);
		}, 1000);
	});
});

function processUser(id, users) {
	if (id > (limit + minId)) {
		process.exit(0);
	}
	console.log("Guardando usuario " + id);
	var realId = id % 100;
	var user = users[realId];
	user._id = id;
	var ratings = user.ratings;
	for (var j = 0; j < ratings.length; j++) {
		var rating = ratings[j];
		rating.rate = Math.floor((Math.random() * 10) + 1);
		rating.gameId = (rating.gameId + id) % 27000;
		rating.gameTitle = gameNames[rating.gameId];
		rating.gameImg = "http://thegamesdb.net/banners/boxart/thumb/original/front/" + rating.gameId + "-1.jpg";
	}
	coll.insert(user, function () {
		processUser(id + 1, users); 
	});
}

function loadTitles() {

}
