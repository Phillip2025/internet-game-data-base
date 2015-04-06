var express = require('express');
var app = express();

app.get("/", function(req, res) {
	console.log("Peticion get a raiz");
	res.send("Oleis a culo de mono");
})

app.listen(8080);
console.log("Escuchando");