var express = require('express');
var session = require('express-session');
var app = express();
var config = require('./config/config');
var mongoose = require('mongoose');
require('./server/models/game');
var chalk = require('chalk');

app.use(express.static('./public'));
app.use(session({secret: config.sessionSecret, 
	resave: true,
    saveUninitialized: true}
));

var db = mongoose.connect(config.db.uri, config.db.options, function(err) {
	if (err) {
		console.error(chalk.red("No se pudo establecer conexion con la base de datos"));
		console.log(chalk.red(err));
		process.exit(-1);
	}
});
mongoose.connection.on('error', function(err) {
	console.error(chalk.red("Error de conexion en base de datos: " + err));
	process.exit(-1);
	}
);

require('./server/routers/games.router')(app);
require('./server/routers/index.router')(app);

app.listen(config.port);

//exports = module.exports = app;

console.log(chalk.green("Escuchando en el puerto " + config.port));