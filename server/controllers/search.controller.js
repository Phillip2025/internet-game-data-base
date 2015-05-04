var mongoose = require('mongoose');
var Game = mongoose.model('Game');
chalk = require('chalk');

exports.getGamesByTerm = function(req, res, next, term) {
	console.log("Peticion por nombre: " + term + ". Pagina " + req.params.page);
	var page = req.params.page;
	var regex = new RegExp('^.*'+term+'.*$', "i");
	Game.find({gameTitle: regex}).select('gameTitle').exec(function(err, games) {
		if (err) {
			return res.status(500).send({
				message: 'Error interno de servidor'
			});
		}
		if (games.length === 0) {
			console.log(chalk.red("No hay similitudes"));
			return res.json({
				message: 'No hay similitudes'
			});
		}
		//Total de juegos antes de la paginacion
		var count = games.length;
		Game.find({gameTitle: regex})
		.select('gameTitle')
		.sort('rating')
		.skip((page - 1) * 10)
		.limit(10)
		.exec( function(err, games) {
			req.search = {};
			req.search.games = games;
			req.search.count = count;
			next();
		});
	});
};

exports.getGamesByLetter = function(req, res) {
	var letter = req.query.letter;
	console.log("Peticion por letra" + letter);
	var regex = new RegExp('^' + letter + '.*$', 'i');
	Game.find({gameTitle: regex}).select('gameTitle').sort('rating').exec( function(err, games) {
		if (err) {
			return res.status(500).send({
				message: 'Error interno de servidor'
			});
		}
		if (games.length === 0) {
			console.log(chalk.red("No hay similitudes"));
			return res.json({
				message: 'No hay juegos que comiencen por esa letra'
			});
		}
		res.json(games);
		
	});
};

exports.getLatestGames = function(req, res) {
	console.log("Peticion de ultimos juegos");
	Game.find().sort('-created').limit(10).exec(function (err, games) {
		if(err){
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		else{
			res.json(games);
		}
	});
};

exports.read = function(req, res) {
	console.log("Peticion de visualizacion por termino de busqueda");
	if (req.search) {
		res.json(req.search);
	}
	else {
		res.json(req.games);
	}
	
};