var express = require('express');
var app = express();
var config = require('./config/config');
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
	process.exit(-1);
	}
);

require('./server/routers/index.router')(app);
require('./server/routers/juegos.router')(app);

app.listen(config.port);
console.log("Escuchando en el puerto " + config.port);