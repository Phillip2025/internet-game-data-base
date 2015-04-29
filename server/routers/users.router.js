var users = require('../controllers/users.controller');

module.exports = function(app) {

	app.post('/login', users.logIn);
	app.post('/signup', users.signUp);
	//app.param('id', games.getGameById);
};