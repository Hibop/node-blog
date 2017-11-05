// 首页

var models = require('../models/index.js');
var Article = models.Article;

// 渲染首页
exports.showHome = function (req, res, next) {
	Article.find(function (err, articles) {
		if (err) {
			next(err);
		};
		res.render('blog/index', { 
			title: '首页',
			articles: articles
		});
	});
};

// 渲染关于
exports.showContact = function (req, res, next) {
	res.render('blog/index', {
		title: '关于'
	});
};

// 渲染联系
exports.showLinks = function (req, res, next) {
	res.render('blog/index', {
		title: '联系'
	});
};

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


