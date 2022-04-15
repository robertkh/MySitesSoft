var mongoose = require('mongoose');
var crypto = require('crypto');
//----------------------------------------------
var schema = mongoose.Schema({
	username: {
		type:String,
		unique:true,
		required:true
	},
	email: {
		type:String,
		required:true
	},
	hashedPassword: {
		type:String,
	},
	salt: {
		type:String,
		unique:true
	},
	created: {
		type:Date,
		default:Date.now
	}
});
schema.methods.encryptPassword = function(password) {
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}
schema.virtual('password')
	.set(function(password) {
		this._plainPassword = password;
		this.salt = Math.random() + '';
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(()=>{return this._plainPassword});
	schema.methods.checkPassword = function(password) {
		return this.encryptPassword(password) === this.hashedPassword;
	}

var usr = mongoose.model('User', schema );
module.exports = usr;