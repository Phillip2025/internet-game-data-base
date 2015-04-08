var index = require('../controladores/index.controlador');

module.exports = function(app) {

	app.route("/")
		.get(index.mostrarIndex);
};