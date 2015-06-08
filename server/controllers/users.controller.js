var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
chalk = require('chalk');

exports.getUserById = function(req, res) {
	var id = req.params.userId;
	console.log("Peticion de user con id " + id);
	var pattern = new RegExp("^[0-9]+$");
	if (!pattern.test(id)) {
		return res.status(400).send({
			message: 'Id invalido'
		});
	}
	User.findById(id, function(err, user) {
		if (err) return next(err);
		if (!user) {
			console.log(chalk.red("User con id " + id + " no encontrado"));
			return res.status(404).send({
				message: 'User no enconrtado'
			});
		}
		res.json(user);
	});
};

exports.logIn = function(req, res, next) {
	console.log("Usuario logeando");
	console.log("body: " + JSON.stringify(req.body));
	console.log("id: " + req.body.user);
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
				console.log("ID: " + user._id);
				console.log("Nombre: " + user.user);
				if (err) {
					res.status(500).send(err);
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
	console.log(user.user);
	console.log(user.password);
	console.log(user.confirm);
	console.log(user.mail);
	if (user.password === req.body.confirm){
		console.log(user);
		User.findOne({'user': user.user}, function (err, user) {
			if (err) {
				return res.status(500).send({
					message: "Error interno"
				});
			}
			else if (user) {
				return res.status(400).send({
					message: "Ya existe el usuario"
				});
			}
		});
		// Then save the user
		user.save(function(err, user) {
			if (err) {
				return res.status(500).send({
					message: "Error interno"
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
	}
	else {
		return res.status(400).send({
			message: "Las contraseñas deben coincidir"});
	}
};

exports.logout = function(req, res) {
	console.log("Deslogueando en el server");
	req.logout();
	res.json({message: "Deslogeado"});
};

exports.updateUser = function(req, res) {
	console.log("Peticion de update");
	console.log(req.body);
	var user = new User(req.body);
	console.log(user);
	if (user.password === req.body.confirm){
		User.findOneAndUpdate({_id: user._id}, user, function (err) {
			if (err) {
				return res.status(500).send({
					message: 'Error interno de servidor'
				});
			}
			res.json(user);
		});
	}
	else {
		return res.status(400).send({
			message: "Las contraseñas deben coincidir"});
	}
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

exports.confirmLogin = function(req, res) {
	res.json(req.user);
};

exports.addRatingUser = function (req, res){
	console.log("Añadiendo rating en usuario " +req.user._id);
	var user = req.user;
	var encontrado = false;
	var rating = req.body
	console.log(rating.gameId);
	if ( user.ratings.length != 0){
		for ( var i = 0; i < user.ratings.length; i++){
			if (user.ratings[i].gameId == rating.gameId){
				encontrado = true;
			}		
		}
		if (!encontrado){
			user.ratings.push(req.body);	
		}
	} else{
		user.ratings.push(req.body);	
	}
	user.save(function(err){
		if (err){
			console.log(err);
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		res.json(user);	
	});
	
}
