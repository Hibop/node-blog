/* @desc 分类表
 * 
 */
var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var categoryModel = new Schema({
	name: {type: String, required: true},
	slug: {type: String, required: true},
	created: {type: Date}
});


mongoose.model('Category', categoryModel);