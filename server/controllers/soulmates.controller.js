var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var User = mongoose.model('User');
var chalk = require('chalk');

exports.findGames = function(req, res) {
	var id = req.params.userId;
	console.log("Peticion de almas gemelas al id " + id);
	var pattern = new RegExp("^[0-9]+$");
	if (!pattern.test(id)) {
		return res.status(400).send({
			message: 'Id invalido'
		});
	}
	User.findById(id, function(err, user) {
		if (err) return next(err);
		if (!user) {
			console.log(chalk.red("User con id " + id + " no encontrado"));
			return res.status(404).send({
				message: 'User no enconrtado'
			});
		}

		//encontramos usuarios con votos parecidos
		var games = [];
		for (var i = 0; i < user.ratings.length; i++) {
			var game = user.ratings[i];
			if (game.rate >= 8) {
				games.push(game.gameId);
			}
		}
		User.find({'ratings.gameId': { $in: games }}, function (err, users) {
			if (err) {
				console.log(err);
				return res.status(500).send({
					message: "Error interno del servidor"
				});
			}
			if (users.length === 0) {
				return res.status(400).send({
					message: "No se encontraron almas gemelas"
				});
			}
			var soulmates = [];
			for (var i = 0; i < users.length; i++) {
				var user = users[i];
				console.log("user id:" + user._id);
				console.log("params id:" + req.params.userId);
				if (user._id != req.params.userId) {
					console.log("Entrando con " + user._id + " y " + req.params.userId);
					var highRates = false;
					var mate = {};
					mate.user = user.user;
					mate.picture = user.picture;
					mate.games = [];
	
					for (var j = 0; j < user.ratings.length; j++) {
						var rate = user.ratings[j];
						if (rate.rate >= 8) {
							highRates = true;
							//mapeo de datos de inline-thumb
							var game = {};
							game._id = rate.gameId;
							game.gameTitle = rate.gameTitle;
							game.images = {};
							game.images.boxart = {};
							game.images.boxart.front = {};
							game.rating = rate.rate;
							game.images.boxart.front.url = rate.gameImg;
							mate.games.push(game);
						}
					}
					if (highRates) {
						soulmates.push(mate);
					}
				}
			}
			if (soulmates.length === 0) {
				return res.status(400).send({
					message: "No se encontraron almas gemelas"
				});
			}
            res.json(soulmates);

		});
	});
};
