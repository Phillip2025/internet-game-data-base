var mongoose = require('mongoose');
var Juego = mongoose.model('Juego');

exports.mostrarJuegoPorId = function(req, res, next, id) {
	console.log("Peticion de juego con id " + id);
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Id invalido'
		});
	}

	Article.findById(id).exec(function(err, juego) {
		if (err) return next(err);
		if (!juego) {
			return res.status(404).send({
				message: 'Juego no encontrado'
			});
		}
		req.juego = juego;
		next();
	});
};