var mongoose = require('mongoose');
var Game = mongoose.model('Game');

exports.getGameById = function(req, res, next, id) {
	console.log("Peticion de juego con id " + id);
	var pattern = new RegExp("^[0-9]+$");
	if (!pattern.test(id)) {
		return res.status(400).send({
			message: 'Id invalido'
		});
	}

	Game.findById(id).exec(function(err, game) {
		if (err) return next(err);
		if (!game) {
			return res.status(404).send({
				message: 'Juego no encontrado'
			});
		}
		req.game = game;
		next();
	});
};

exports.read = function(req, res) {
	res.json(req.game);
};

exports.getAllGames = function(req, res){
	Game.find(function(err, games){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
			res.send(games);
		}
	});
};