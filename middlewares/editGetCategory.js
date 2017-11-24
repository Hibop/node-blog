var models = require('../models/index.js');
var Category = models.Category;
var Article = models.Article;


exports.getCategory = function (req, res, next) {
	if (!req.params.id) {
		return next(new Error('no post id param!'));
	};

	Category.findOne({_id: req.params.id})
				  .exec(function (err, category) {
					 	if (err) {
					 			return next(err);
					 	};
					 	if (!category) {
					 		return next(new Error('fail not found:', req.params.id))
					 	}
					 	// 删除分类下文章
					 	Article.remove({category: category}, function (err, rowsRemoved) {
					 		if (err) {
								return next(err)
							};
							if (rowsRemoved) {
								console.log('分类下文章删除成功')
							}
					 	})
					 
					 	req.category = category;
					 	next();
					});	
};