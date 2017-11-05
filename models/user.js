/* @desc 用户表
 * 
 */
var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var userModel = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	created: {type: Date}
});

mongoose.model('User', userModel);