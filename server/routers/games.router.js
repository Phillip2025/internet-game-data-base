var games = require('../controllers/games.controller');
var user = require('../controllers/users.controller');

module.exports = function(app) {

	app.route("/comments/:id")
		.put(user.requiresLogin, games.addComment);

	app.route("/ratings/:id")
		.put(user.requiresLogin, games.addRating);


	app.route("/games/:id")
		.get(games.read)
		.put(user.requiresLogin, user.hasAuthorization, games.update)
		.delete(user.requiresLogin, user.hasAuthorization, games.delete);

//comment
	app.route("/games")
		.get(games.getAllGames)
		.post(user.requiresLogin, user.hasAuthorization, games.insert);

	app.route("/latest")
		.get(games.getLatestGames);

	app.param('id', games.getGameById);
};