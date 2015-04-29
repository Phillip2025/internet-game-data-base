var games = require('../controllers/games.controller');
var user = require('../controllers/users.controller');

module.exports = function(app) {

	app.route("/comments/:id")
		.put(user.requiresLogin, games.addComment);

	app.route("/ratings/:id")
		.put(user.requiresLogin, games.addRating);


	app.route("/games/:id")
		.get(games.read)
		.put(user.requiresLogin, user.hasAuthorization, games.updateGame)
		.delete(user.requiresLogin, user.hasAuthorization, games.deleteGame);

	app.route("/games")
		.get(games.getAllGames)
		.post(user.requiresLogin, user.hasAuthorization, games.insertGame);

	app.param('id', games.getGameById);
};