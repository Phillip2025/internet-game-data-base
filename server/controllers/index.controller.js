var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var path = require('path');

exports.getIndex = function(req, res) {
	res.sendFile(path.join(__dirname, '../../public', 'index.html'));
	/*res.render('index', {
		user: req.user || null,
		request: req
	});*/
};