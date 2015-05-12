var games = require('../controllers/games.controller');
var user = require('../controllers/users.controller');

module.exports = function(app) {

	app.route("/games/:gameId/comments/:commentId")
		.put(user.requiresLogin, games.updateComment)
		.delete(user.requiresLogin, games.deleteComment);

	app.route("/games/:gameId/comments")
		.post(user.requiresLogin, games.insertComment);

	//los ratings creo que van a ir al user, tiene mas logica
	/*app.route("games/:id/ratings")
		.put(user.requiresLogin, games.editRating)
		.delete(user.requiresLogin, games.deleteRating);

	app.route("games/:id/ratings")
		.post(user.requiresLogin, games.addRating);*/
	/*app.route("games/:id/ratings")
		.post(user.requiresLogin, games.addRating);	*/
	app.post('/games/:gameId/ratings', user.requiresLogin, games.addRating);
	app.route("/games/:gameId")
		.get(games.read)
		.put(user.requiresLogin, user.hasAuthorization, games.updateGame)
		.delete(user.requiresLogin, user.hasAuthorization, games.deleteGame);

	app.route("/games")
		.get(games.getAllGames)
		.post(user.requiresLogin, user.hasAuthorization, games.insertGame);

	app.get('/count', games.getCount);

	app.param('gameId', games.getGameById);

};