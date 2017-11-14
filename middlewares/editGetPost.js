var models = require('../models/index.js');
var Article = models.Article;

exports.getPost = function (req, res, next) {
	if (!req.params.id) {
		return next(new Error('no post id param!'));
	};

	Article.findOne({_id: req.params.id})
				 .populate('author')
				 .populate('category')
				 .exec(function (err, article) {
					 	if (err) {
					 			return next(err);
					 	};
					 	if (!article) {
					 		return next(new Error('fail not found:', req.params.id))
					 	}
					 	// console.log(article); 
					 	req.article = article;
					 	next();
					});	
};