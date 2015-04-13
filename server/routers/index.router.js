var index = require('../controllers/index.controller');

module.exports = function(app) {

	app.route("/")
		.get(index.getIndex);
};