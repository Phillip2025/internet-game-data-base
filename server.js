var express = require('express');
var app = express();
var config = require('./config/config');
<<<<<<< HEAD
var mongoose = require('mongoose');
require('./server/modelos/juego');
var chalk = require('chalk');

var db = mongoose.connect(config.db.uri, config.db.options, function(err) {
	if (err) {
		console.error(chalk.red("No se pudo establecer conexion con la base de datos"));
		console.log(chalk.red(err));
		process.exit(-1);
	}
});
mongoose.connection.on('error', function(err) {
	console.error(chalk.red("Error de conexion en base de datos: " + err));
=======
var chalk = require('chalk');
var mongoose = require('mongoose');
var Juego = require('./server/modelos/juego');

var db = mongoose.connect(config.db.uri, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});
mongoose.connection.on('error', function(err) {
	console.error(chalk.red('MongoDB connection error: ' + err));
>>>>>>> de87337d133642016ee23c91c4e5a9a99d480a94
	process.exit(-1);
	}
);

<<<<<<< HEAD
require('./server/routers/juegos.router')(app);
require('./server/routers/index.router')(app);

app.listen(config.port);
console.log(chalk.green("Escuchando en el puerto " + config.port));
=======
require('./server/routers/index.router')(app);
require('./server/routers/juegos.router')(app);

app.listen(config.port);
console.log("Escuchando en el puerto " + config.port);
>>>>>>> de87337d133642016ee23c91c4e5a9a99d480a94
