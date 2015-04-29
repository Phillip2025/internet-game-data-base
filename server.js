var express = require('express');
var session = require('express-session');
var app = express();
var config = require('./config/config');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var ai = require('mongoose-auto-increment');
var chalk = require('chalk');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db = mongoose.connect(config.db.uri, config.db.options, function(err) {
	if (err) {
		console.error(chalk.red("No se pudo establecer conexion con la base de datos"));
		console.log(chalk.red(err));
		process.exit(-1);
	}
});
var connection = mongoose.connection.on('error', function(err) {
	console.error(chalk.red("Error de conexion en base de datos: " + err));
	process.exit(-1);
	}
);

ai.initialize(connection);

require('./server/models/game');
require('./server/models/user');
require('./config/passport')(app);

app.use(session({secret: config.sessionSecret, 
	resave: true,
    saveUninitialized: true}
));
app.use(passport.initialize());
app.use(passport.session());

require('./server/routers/games.router')(app);
require('./server/routers/index.router')(app);
require('./server/routers/search.router')(app);
require('./server/routers/users.router')(app);

app.listen(config.port);

//exports = module.exports = app;

console.log(chalk.green("Escuchando en el puerto " + config.port));