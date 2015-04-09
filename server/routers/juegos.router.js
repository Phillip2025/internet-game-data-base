var juegos = require('../controladores/juegos.controlador');

module.exports = function(app) {

	app.route("/juego/:_id")
		.get(function() {
			juegos.mostrarJuegoPorId(req, res, next, req.params._id);
	});
};