var users = require('../controllers/users.controller');

module.exports = function(app) {

	app.post('/login', users.logIn);
	app.post('/signup', users.signUp);
	app.get('/logout', users.logout);
	app.get('/users/:userId', users.getUserById);
	app.put('/users/:userid', users.updateUser);
	app.get('/confirmlogin', users.confirmLogin);
	app.post('/users/:userid/ratings', users.requiresLogin, users.addRatingUser);
	app.post('/users/:userid/comments', users.requiresLogin, users.addCommentUser);
};