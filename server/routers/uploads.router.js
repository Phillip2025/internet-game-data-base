var uploads = require('../controllers/uploads.controller');
var user = require('../controllers/users.controller');
var games = require('../controllers/games.controller');
var multer = require('multer');

module.exports = function(app) {

	var middleMulter = multer({ 
		dest: './public/img/',
		changeDest: function(dest, req, res) {
			console.log(req.params);
	    	return dest + req.pathFolder;
			}
		}

	);

	app.route('/uploads/:gameId/:pathFolder')
	.post(middleMulter, uploads.uploadGameImage);

	app.route('/uploads/:pathFolder')
	.post(/*user.requiresLogin, */middleMulter, uploads.uploadProfileImage);

	app.param('gameId', games.getGameById);
	app.param('pathFolder', uploads.getPathFolder);

};