var mongoose = require('mongoose');
var Platform = mongoose.model('Platform');
chalk = require('chalk');

exports.getPlatformById = function(req, res, next, id) {
	console.log("Peticion de plataforma con id " + id);
	var pattern = new RegExp("^[0-9]+$");
	if (!pattern.test(id)) {
		return res.status(400).send({
			message: 'Id invalido'
		});
	}
	Platform.findById(id, function(err, platform) {
		if (err) return next(err);
		if (!platform) {
			console.log(chalk.red("Plataforma con id " + id + " no encontrado"));
			return res.status(404).send({
				message: 'Plataforma no encontrado'
			});
		}
		req.platform = platform;
		next();
	});
};

exports.getCount = function(req, res) {
	Platform.count(function (err, count) {
		if (err) {
			return res.status(500).send({
				message: 'Error interno de servidor'
			});
		}
		res.json({'count': count});
	});
};

exports.read = function(req, res) {
	console.log("Peticion de visualizacion");
	res.json(req.platform);
};

exports.insertPlatform = function(req, res) {
	console.log("Peticion de insercion");
	var platform = new Platform(req.body);
	console.log(platform);
	platform.save(function(err) {
		if (err) {
			console.log(err);
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		res.json(platform);
	});
};

exports.updatePlatform = function(req, res) {
	console.log("Peticion de update de plataforma");
	var platform = new Platform(req.body);
	Platform.findOneAndUpdate({_id: platform._id}, platform, {upsert:true}, function (err) {
		if (err) {
			return res.status(500).send({
				message: 'Error interno de servidor'
			});
		}
		res.json(platform);
	});
};

exports.deletePlatform = function(req, res) {
	console.log("Peticion de borrado");
	var platform = req.platform;
	platform.remove(function(err) {
		if (err) {
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		res.json(platform);
	});
};

exports.getAllPlatforms = function(req, res) {
	console.log("Peticion de todas las plataformas");
	Platform.find().sort('-created').limit(12).exec(function (err, platforms) {
		if(err){
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		else{
			res.json(platforms);
		}
	});
};

exports.insertComment = function (req, res) {
	console.log("Añadiendo comentario de " + req.user._id + " para la plataforma " + req.platform._id);
	var platform = req.platform;
	console.log(req.body);
	platform.comments.push(req.body);
	platform.save(function(err) {
		if (err) {
			console.log(err);
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		res.json(platform);
	});
};

exports.updateComment = function (req, res) {
	console.log("Editando comentario de " + req.user._id + " para la plataforma " + req.platform._id);
	var platform = req.platform;
	console.log(req.body);
	platform.comments.push(req.body);
	platform.save(function(err) {
		if (err) {
			console.log(err);
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		res.json(platform);
	});
};

exports.deleteComment = function (req, res) {
	console.log("Borrando comentario de " + req.user._id + " para la plataforma " + req.platform._id);
	console.log("Id de comentario: " + req.params.com);
	var platform = req.platform;
	platform.comments.pull(req.params.com);
	platform.save(function(err) {
		if (err) {
			console.log(err);
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		res.json(platform);
	});
};

exports.addRating = function (req, res) {
	console.log("Añadiendo rating de " + req.user.name + " para la plataforma " + req.platform._id);
	var platform = req.platform;
	platform.ratings.push(req.body);
	platform.save(function(err) {
		if (err) {
			return res.status(500).send({
				message: 'Error interno del servidor'
			});
		}
		res.json(platform);
	});
}
exports.getPlatform = function (req, res){
	console.log("ver plataformas")	
};