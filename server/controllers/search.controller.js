var mongoose = require('mongoose');
var Game = mongoose.model('Game');
chalk = require('chalk');

exports.getGamesByTerm = function(req, res, next, term) {
	console.log("Peticion por nombre: " + term);
	var regex = new RegExp('^.*'+term+'.*$', "i");
	Game.find({gameTitle: regex}).select('gameTitle').sort('rating').exec( function(err, games) {
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
		req.games = games;
		next();
		
	});
};

exports.read = function(req, res) {
	console.log("Peticion de visualizacion por termino de busqueda");
	res.json(req.games);
};