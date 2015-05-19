var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ai = require('mongoose-auto-increment');

var CommentSchema = new Schema({ 
	userId: Number,
	user: String,
 	picture: String,
 	text: String  
 });
var RatingSchema = new Schema({
	userId: Number,
	user: String,
	rate: Number
});
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
	created: {
		type: Date,
		default: Date.now
	},
	overview: String,
	esrb: {
		type: String,
		enum : ['T - Teen', 'M - Mature', 'E - Everyone', 'E10+ - Everyone 10+', 'RP - Rating Pending', 'EC - Early Childhood']
	},
	genres: [{
		type: String,
		enum: ['Shooter','Action','Flight Simulator','Role-Playing','Adventure',
			'Sandbox','Fighting','Racing','Horror','MMO','Platform',
			'Puzzle','Strategy','Stealth','Sports','Construction and Management Simulation',
			'Vehicle Simulation','Life Simulation','Music']
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
	developer: String,
	rating: {
		type: Number,
		default: 5
	},
	ratings: [RatingSchema],
	comments: [CommentSchema],
	images: { 
		fanart: [{
			url: {
					type: String,
					default: 'img/image.gif',
				},
		 		width: {
		 			type: Number,
		 			default: 800,
		 		},
		 		height: {
		 			type: Number,
		 			default: 600,
		 		},
		 		thumb: {
		 			type: String,
		 			default: '',
		 		},
		}],
	 	boxart: {
	 		front: {
				url: {
					type: String,
					default: 'img/front.gif',
				},
		 		width: {
		 			type: Number,
		 			default: 600,
		 		},
		 		height: {
		 			type: Number,
		 			default: 800,
		 		},
		 		thumb: {
		 			type: String,
		 			default: '',
		 		},
	 		},
	 		back: {
				url: {
					type: String,
					default: 'img/back.gif',
				},
		 		width: {
		 			type: Number,
		 			default: 600,
		 		},
		 		height: {
		 			type: Number,
		 			default: 800,
		 		},
		 		thumb: {
		 			type: String,
		 			default: '',
		 		},
	 		},
	 	},
	 	banner: [{
			url: {
					type: String,
					default: 'img/banner.gif',
				},
		 		width: {
		 			type: Number,
		 			default: 760,
		 		},
		 		height: {
		 			type: Number,
		 			default: 140,
		 		}
		}],
		screenshot: [{
			url: {
					type: String,
					default: 'img/image.gif',
				},
		 		width: {
		 			type: Number,
		 			default: 800,
		 		},
		 		height: {
		 			type: Number,
		 			default: 600,
		 		}
		}],
		clearlogo: {
				url: {
					type: String,
					default: 'img/logo.gif',
				},
		 		width: {
		 			type: Number,
		 			default: 400,
		 		},
		 		height: {
		 			type: Number,
		 			default: 200,
		 		}
	 		},
	}
});

GameSchema.plugin(ai.plugin, {model: 'Game', startAt: 27000});
CommentSchema.plugin(ai.plugin, {model: 'Comment'});
RatingSchema.plugin(ai.plugin, {model: 'Rating'});
mongoose.model('Game', GameSchema);