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

exports.getCount = function(req, res) {
	Game.count(function (err, count) {
		if (err) {
			return res.status(500).send({
				message: 'Error interno de servidor'
			});
		}
		res.json({'count': count});
	});
};

exports.read = function(req, res) {
	console.log("Peticion de visualizacion");
	res.json(req.game);
};

exports.updateGame = function(req, res) {
	console.log("Peticion de update");
	var game = new Game(req.body);
	Game.findOneAndUpdate({_id: game._id}, game, {upsert:true}, function (err) {
		if (err) {
			return res.status(500).send({
				message: 'Error interno de servidor'
			});
		}
		res.json(game);
	});
};

exports.deleteGame = function(req, res) {
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

exports.insertGame = function(req, res) {
	console.log("Peticion de insercion");
	var game = new Game(req.body);
	console.log(game);
	game.save(function(err) {
		if (err) {
			console.log(err);
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
			res.json(games);
		}
	});
};

exports.addComment = function (req, res) {
	console.log("Añadiendo comentario de " + req.user._id + " para el juego " + req.game._id);
	var game = req.game;
	console.log(req.body);
	game.comments.push(req.body);
	game.save(function(err) {
		if (err) {
			console.log(err);
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		res.json(game);
	});
};

exports.addRating = function (req, res) {
	console.log("Añadiendo rating de " + req.user.name + " para el juego " + req.game._id);
	var game = req.game;
	game.ratings.push(req.body);
	game.save(function(err) {
		if (err) {
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		res.json(game);
	});
};