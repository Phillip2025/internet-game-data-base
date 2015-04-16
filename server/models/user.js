var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	_id: {
		type: String,
		required: 'Id no puede ser nulo'
	},
	password: {
		type: String,
		required: 'Password no puede ser nulo'
	}
});

mongoose.model('User', UserSchema);