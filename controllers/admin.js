// 后台

var models = require('../models/index.js');
var Article = models.Article;

// 后台管理首页
exports.showAdmin = function (req, res, next) {
	Article.find(function (err, articles) {
		if (err) {
			next(err);
		};
		res.render('admin/index', { 
			title: 'admin',
			articles: articles
		});
	});
};
