var passport = require('passport'),
	User = require('mongoose').model('User'),
	path = require('path'),
	config = require('./config'),
	LocalStrategy = require('passport-local').Strategy;

module.exports = function(app) {

	// Use local strategy
	passport.use(new LocalStrategy({
			usernameField: 'id',
			passwordField: 'password'
		},
		function(id, password, done) {
			console.log("Entrando en la estrategia local");
			console.log("Buscando al user" + id);
			User.findById(id, function(err, user) {
				if (err) {
					console.log("Error en la estrategia");
					return done(err);
				}
				if (!user) {
					console.log("usuario no encontrado en estrategia");
					return done(null, false, {
						message: 'Nombre o contraseña invalidos'
					});
				}
				if (user.password !== password) {
					console.log("Contraseña invalida en estrategia");
					return done(null, false, {
						message: 'Nombre o contraseña invalidos'
					});
				}

				return done(null, user);
			});
		}
	));
	// Serialize sessions
	passport.serializeUser(function(user, done) {
		console.log("Serializando usuario" + user._id);
		done(null, user._id);
	});

	// Deserialize sessions
	passport.deserializeUser(function(id, done) {
		console.log("Desserializando id " + id);
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

};