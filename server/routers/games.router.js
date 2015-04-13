var games = require('../controllers/games.controller');

module.exports = function(app) {

	app.route("/game/:id")
		.get(games.read);

	app.route("/games")
		.get(games.getAllGames);

	app.param('id', games.getGameById);
};