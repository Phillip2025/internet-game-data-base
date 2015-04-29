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
	alternateTitles: [{
		type: String
	}],
	platformId: {
		type: Number,
	},
	platform: {
		type: String,
		trim: true,
		required: 'Falta plataforma'
	},
	releaseDate: {
		type: Date
	},
	overview: {
		type: String
	},
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
	youtube: {
		type: String
	},
	publisher: {
		type: String
	},

	rating: {
		type: Number
	},
	ratings: [{ 
		_id: String,
	 	rating: Number
	}],
	comments: [{ 
		_id: String,
	 	picture: String,
	 	text: String 
	}],
	images: { 
		fanart: [{
			original: [{
				url: String,
				width: [{
					type: Number
				}],
				height: [{
					type: Number
				}]
			}],
			thumb: [{
				type: String
			}]
		}],
	 	boxart: [{
	 		url: String,
	 		side: [{
	 			type: String
	 		}],
	 		width: [{
				type: Number
			}],
			height: [{
				type: Number
			}],
			thumb: [{
				type: String
			}]
	 	}],
	 	banner: [{
			url: String,
			width: [{
				type: Number
			}],
			height: [{
				type: Number
			}]
		}],
		screenshot: [{
			original: [{
				url: String,
				width: [{
					type: Number
				}],
				height: [{
					type: Number
				}]
			}],
			thumb: [{
				type: String
			}]
		}],
		clearlogo: [{
			url: String,
			width: [{
				type: Number
			}],
			height: [{
				type: Number
			}]
		}],
	}
});

mongoose.model('Game', GameSchema);