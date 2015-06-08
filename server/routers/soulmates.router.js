var soulmates = require('../controllers/soulmates.controller.js');

module.exports = function(app) {

	app.get('/soulmates/:userId', soulmates.findGames);
	
};