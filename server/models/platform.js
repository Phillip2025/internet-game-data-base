var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ai = require('mongoose-auto-increment');

var PlatformSchema = new Schema({
	platform: {
		type: String,
		trim: true,
		defaule: '',
		required: 'Platform can not be empty'
	},
	console:{
		type: String,
		required: 'Name console is necesary'
	},
	controller:{
		type: String,
		required: 'Video controller is necesary'
	},
	overview: String,
	developer: String,
	manufacturer: String,
	cpu: String,
	memory: String,
	graphics: String,
	sound: String,
	display: String,
	media: String,
	maxControllers:{
		type: Number,
		enum: ["1", "2", "3", "4+"]
	},
	rating:[{
		_id: Number,
		user: String,
		rating: Number 	
	}],
	images:{
		fanart: [{
			url: String,
			width: Number,
			height: Number,
			thumb: String
		}],
		boxart:{
			front: {
				url: String,
				width: Number,
				height: Number
			},
			back: {
				url: String,
				width: Number,
				height: Number
			}
		},
		banner: [{
			url: String,
			width: Number,
			height: Number
		}],
		consoleart: {
			type: String
		},
		controllerart:{
			type: String
		}
	}
	
});

PlatformSchema.plugin(ai.plugin, 'Platform');
module.exports = mongoose.model('Platform', PlatformSchema);