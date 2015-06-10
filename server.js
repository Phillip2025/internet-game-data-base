//modulos a cargar
var express = require('express');
var session = require('express-session');
var app = express();
var config = require('./config/config');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var ai = require('mongoose-auto-increment');
var chalk = require('chalk');

//directorio de archivos estaticos publicos
app.use(express.static('./public'));
//configuracion parseo del body de la request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//identado de jsons de respuesta
app.set('json spaces', 2);

//conexion bbdd
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

//inicializacion del modulo autoincremental de mongo
ai.initialize(connection);

//modelos
require('./server/models/game');
require('./server/models/user');
require('./server/models/platform');
require('./config/passport')(app);

//configuracion de sesiones en express y passport
app.use(session({secret: config.sessionSecret, 
	resave: true,
    saveUninitialized: true}
));
app.use(passport.initialize());
app.use(passport.session());

//rutas
require('./server/routers/games.router')(app);
require('./server/routers/index.router')(app);
require('./server/routers/search.router')(app);
require('./server/routers/users.router')(app);
require('./server/routers/platforms.router')(app);
require('./server/routers/uploads.router')(app);
require('./server/routers/soulmates.router')(app);

app.listen(config.port);
console.log(chalk.green("Escuchando en el puerto " + config.port));