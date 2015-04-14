var mongoose = require('mongoose');
var Game = mongoose.model('Game');
chalk = require('chalk');

exports.getGameById = function(req, res, next, id) {
	console.log("Peticion de juego con id " + id);
	var pattern = new RegExp("^[0-9]+$");
	if (!pattern.test(id)) {
		return res.status(400).send({
			message: 'Id invalido'
		});
	}

	Game.findById(id, function(err, game) {
		if (err) return next(err);
		if (!game) {
			console.log(chalk.red("Juego con id " + id + " no encontrado"));
			return res.status(404).send({
				message: 'Juego no encontrado'
			});
		}
		req.game = game;
		next();
	});
};

exports.read = function(req, res) {
	console.log("Peticion de visualizacion");
	res.json(req.game);
};

exports.update = function(req, res) {
	console.log("Peticion de update");
	var game = req.game;
	game.save(function (err) {
		if (err) {
			return res.status(500).send({
				message: 'Error interno de servidor'
			});
		}
		res.json(game);
	});
};

exports.delete = function(req, res) {
	console.log("Peticion de borrado");
	var game = req.game;
	game.remove(function(err) {
		if (err) {
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		res.json(game);
	});
};

exports.insert = function(req, res) {
	console.log("Peticion de insercion");
	var game = req.game;
	game.save(function(err) {
		if (err) {
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		res.json(game);
	});
};

exports.getAllGames = function(req, res){
	console.log("Peticion a todos los juegos");
	Game.find().sort('-releaseDate').exec(function(err, games){
		if(err){
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		else{
			res.send(games);
		}
	});
};

exports.getLatestGames = function(req, res) {
	console.log("Peticion de ultimos juegos");
	Game.find().sort('-releaseDate').limit(10).exec(function (err, games) {
		if(err){
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		else{
			res.send(games);
		}
	});
};