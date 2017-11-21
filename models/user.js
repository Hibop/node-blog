/* @desc 用户表
 * 
 */
var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		md5 = require('md5');

var userModel = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	created: {type: Date}
});

userModel.methods.verifyPassword = function (password) {
	console.log('password is: ', md5(password) === this.password)
	return md5(password) === this.password;
};

mongoose.model('User', userModel);