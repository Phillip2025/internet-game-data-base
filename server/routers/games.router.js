var games = require('../controllers/games.controller');

module.exports = function(app) {

	app.route("/games/:id")
		.get(games.read)
		.put(games.update)
		.delete(games.delete);

//comment
	app.route("/games")
		.get(games.getAllGames)
		.post(games.insert);

	app.route("/latest")
		.get(games.getLatestGames);

	app.route("/admin/game")
		.post(games.insert);

	app.param('id', games.getGameById);
};