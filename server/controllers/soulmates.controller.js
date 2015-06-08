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
				if (user._id !== req.params.userId) {
					var highRates = false;
					var mate = {};
					mate.user = user.user;
					mate.picture = user.picture;
					mate.games = [];
					//bucle sincrono para ver si el user 
					//tiene juegos por encima de la nota de corte
					for (var j = 0; j < user.ratings.length; j++) {
						var rate = user.ratings[j];
						if (rate.rate >= 8) {
							highRates = true;
							break;
						}
					}
					if (highRates) {
						soulmates.push(mate);
						for (var k = 0; k < user.ratings.length; k++) {
							var rate = user.ratings[k];
							if (rate.rate >= 8) {
								Game.findById(rate.gameId, function (err, game) {
									mate.games.push(game);
								});
							}
						}
					}
				}
			}
			//timeout para esperar a que acabe de leer
			//de la bbdd (malditos callbacks)
			setTimeout( function(){
            res.json(soulmates);
        }, 1000 );
		});
	});
};
