/* @desc 文章
 * 文章表关联了分类表,用户表.
 *
 */
var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var articleModel = new Schema({
	title: {type: String, required: true},
	content: {type: String, required: true},
	slug: {type: String, required: true},
	category: {type: Schema.Types.ObjectId, ref: 'Category'},
	author: {type: Schema.Types.ObjectId, ref: 'User'},
	published: {type: Boolean, default: false},
	meta: {type: Schema.Types.Mixed},
	comments: [Schema.Types.Mixed],
	created: {type: Date}
});


mongoose.model('Article', articleModel);