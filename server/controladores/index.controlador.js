var mongoose = require('mongoose');
var Juego = mongoose.model('Juego');
var path = require('path');

exports.mostrarIndex = function(req, res) {
	res.sendFile(path.join(__dirname, '../vistas', 'index.html'));
	/*res.render('index', {
		user: req.user || null,
		request: req
	});*/
};