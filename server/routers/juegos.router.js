var juegos = require('../controladores/juegos.controlador');

module.exports = function(app) {

	app.route("/juego/:id")
		.get(juegos.mostrarJuegoPorId);
};