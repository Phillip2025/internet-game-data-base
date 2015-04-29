var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
chalk = require('chalk');

exports.logIn = function(req, res, next) {
	console.log("Usuario logeando");
	console.log("body: " + JSON.stringify(req.body));
	console.log("id: " + req.body.id);
	console.log("pass: " + req.body.password);
	passport.authenticate('local', function(err, user, info) {
		console.log("Entrando en autenticacion");
		if (err || !user) {
			console.log("Hay error o no hay user");
			res.status(400).send({message: info.message});
		} else {
			console.log("El usuario existe");
			user.password = undefined;

			req.login(user, function(err) {
				//req.session = user._id;
				console.log("Usuario en la request");
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(user);
				}
			});
		}
	})(req, res, next);
};

exports.signUp = function(req, res) {
	console.log("Usuario registrandose");
	var user = new User(req.body);
	console.log(user._id);
	console.log(user.password);
	// Then save the user
	user.save(function(err, user) {
		if (err) {
			return res.status(400).send({
				message: "Error al crear el usuario"
			});
		} else {
			user.password = undefined;
			req.login(user, function(err) {
				console.log("Usuario en la request");
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(user);
				}
			});
		}
	});
};

exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'El usuario no esta logeado'
		});
	}
	else {
		next();
	}
};

exports.hasAuthorization = function(req, res, next) {
	if (req.user.role === 'Admin') {
		next();
	}
	 else {
		return res.status(403).send({
			message: 'El usuario no esta autorizado'
		});
	}
};