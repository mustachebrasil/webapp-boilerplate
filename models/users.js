var mongoose = require('mongoose')
	,	Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	password: String,
	token: String
}); 



module.exports = mongoose.model('users', UserSchema);