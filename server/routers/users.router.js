var users = require('../controllers/users.controller');

module.exports = function(app) {

	app.post('/login', users.logIn);
	app.post('/signup', users.signUp);
	app.get('/logout', users.logout);
	app.put('/updateuser/user', users.updateUser);
	//app.param('id', games.getGameById);
};