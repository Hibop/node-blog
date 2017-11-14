var models = require('../models/index.js');
var Category = models.Category;

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
					 	// console.log(category); 
					 	req.category = category;
					 	next();
					});	
};