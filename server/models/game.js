var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
	_id: {
		type: Number
	},
	gameTitle: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	platformId: {
		type: Number,
	},
	platform: {
		type: String,
		trim: true,
		required: "Falta plataforma"
	},
	releaseDate: {
		type: Date
	},
	overview: {
		type: String
	}
});

mongoose.model('Game', GameSchema);