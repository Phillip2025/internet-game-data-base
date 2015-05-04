var search = require('../controllers/search.controller');

module.exports = function(app) {

	app.route('/latest')
		.get(search.getLatestGames);

	app.route('/search/letter/:letter')
		.get(search.read);

	app.route("/search/:term/:page")
		.get(search.read);

	app.param('letter', search.getGamesByLetter);
	app.param('term', search.getGamesByTerm);
};