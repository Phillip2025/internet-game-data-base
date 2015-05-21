var platforms = require('../controllers/platforms.controller');
var user = require('../controllers/users.controller');

module.exports = function(app) {
	
app.route("/platforms")
		.get(platforms.getAllPlatforms)
		.post(user.requiresLogin, user.hasAuthorization, platforms.insertPlatform);	
	
	app.route("/platforms/:platformId")
		.get(platforms.read)
		.put(user.requiresLogin, user.hasAuthorization, platforms.updatePlatform)
		.delete(user.requiresLogin, user.hasAuthorization, platforms.deletePlatform);

	app.param('platformId', platforms.getPlatformById);
	
};