var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ai = require('mongoose-auto-increment');

var CommentSchema = new Schema({ 
	userId: Number,
	user: String,
 	picture: String,
 	text: String,
 });
var RatingSchema = new Schema({
	userId: Number,
	user: String,
	rate: Number,
});

var UserSchema = new Schema({
	user: {
		type: String,
		required: 'Nombre no puede ser nulo'
	},
	password: {
		type: String,
		required: 'Password no puede ser nulo'
	},
	role: {
		type: String,
		default: 'User'
	},
	name: {
		type: String
	},
	surname: {
		type: String
	},
	mail: {
		type: String,
		required: 'Email debe ser correcto'
	},
	picture: {
		url: {
			type: String,
			default: "img/default.gif"
		},
		width: Number,
		height: Number
	},
	ratings: [RatingSchema],
	comments: [CommentSchema]
});

UserSchema.plugin(ai.plugin, 'User');
module.exports = mongoose.model('User', UserSchema);