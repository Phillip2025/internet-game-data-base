chalk = require('chalk');
var fs = require('fs');
var size = require('image-size');

exports.uploadProfileImage = function(req, res) {
	console.log("Enrtando a uploads para un perfil");
	var picture = req.files.file;
	size(picture.path, function (err, dimensions) {
		if (err) {
			res.status(500).send({message: 'Error al guardar la imagen'});
		}
		var image = {};
		image.url = 'img/' + req.pathFolder + '/' + picture.name;
		image.width = dimensions.width;
		image.height = dimensions.height;
		res.json(image);
	});
};

exports.uploadGameImage = function(req, res) {
	console.log("Enrtando a uploads para un game");
	var picture = req.files.file;
	size(picture.path, function (err, dimensions) {
		if (err) {
			res.status(500).send({message: 'Error al guardar la imagen'});
		}
		var image = {};
		image.url = 'img/' + req.pathFolder + '/' + picture.name;
		image.width = dimensions.width;
		image.height = dimensions.height;
		res.json(image);
	});
};

exports.getPathFolder = function(req, res, next, pathFolder) {
	req.pathFolder = pathFolder;
	next();
};
