var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ai = require('mongoose-auto-increment');

var GameSchema = new Schema({
	gameTitle: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	alternateTitles: [{
		type: String
	}],
	platformId: Number,
	platform: {
		type: String,
		trim: true,
		required: 'Falta plataforma'
	},
	releaseDate: Date,
	overview: String,
	esrb: {
		type: String,
		enum : ['T - Teen', 'M - Mature', 'E - Everyone', 'E10+ - Everyone 10+', 'RP - Rating Pending', 'EC - Early Childhood']
	},
	genres: [{
		type: String
	}],
	players: {
		type: String,
		enum: ['1', '2', '3', '4+']
	},
	coop: {
		type: String,
		enum: ['Yes', 'No']
	},
	similar: [{ 
		_id: Number,
	 	platformId: Number 
	}],
	youtube: String,
	publisher: String,

	rating: {
		type: Number,
		default: 5
	},
	ratings: [{ 
		_id: Number,
		user: String,
	 	rating: Number
	}],
	comments: [{ 
		_id: Number,
		user: String,
	 	picture: String,
	 	text: String 
	}],
	images: { 
		fanart: [{
			url: String,
			width: Number,
			height: Number,
			thumb: String
		}],
	 	boxart: [{
	 		url: String,
	 		side: String,
	 		width: Number,
			height: Number,
			thumb: String
	 	}],
	 	banner: [{
			url: String,
			width: Number,
			height: Number
		}],
		screenshot: [{
			url: String,
			width: Number,
			height: Number,
			thumb: String
		}],
		clearlogo: [{
			url: String,
			width: Number,
			height: Number
		}],
	}
});

GameSchema.plugin(ai.plugin, {model: 'Game', startAt: 27000});
mongoose.model('Game', GameSchema);