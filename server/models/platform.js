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
	}
	controller:{
		type: String,
		required: 'Video controller is necesary'
	},
	overview: {
		type: String
	},
	developer: {
		type: String
	},
	manufacture:{
		type: String
	},
	cpu:{
		type: String
	},
	memory:{
		type: String
	},
	graphics:{
		type: String
	},
	sound:{
		type: String
	},
	display:{
		type: String
	},
	media:{
		type: String
	},
	maxControllers:{
		type: Number,
		default: 1
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