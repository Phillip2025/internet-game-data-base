var games = require('../controllers/games.controller');

module.exports = function(app) {

	app.route("/games/:id")
		.get(games.read)
		.put(games.update)
		.delete(games.delete);

	app.route("/games")
		.get(games.getAllGames)
		.post(games.insert);

	app.param('id', games.getGameById);
};