chalk = require('chalk');
var fs = require('fs');

exports.uploadProfileImage = function(req, res) {
	console.log("Enrtando a uploads para un perfil");
	var picture = req.files.file;
	console.log(picture);
};

exports.uploadGameImage = function(req, res) {
	console.log("Enrtando a uploads para un game");
	var picture = req.files.file;
	console.log(picture);
};

exports.getPathFolder = function(req, res, next, pathFolder) {
	console.log(req.pathFolder);
	req.pathFolder = pathFolder;
	next();
};
