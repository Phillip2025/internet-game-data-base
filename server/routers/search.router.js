var search = require('../controllers/search.controller');

module.exports = function(app) {

	app.route("/search/:term")
		.get(search.read);

	app.param('term', search.getGamesByTerm);
};