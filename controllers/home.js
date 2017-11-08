// 首页

var models = require('../models/index.js');
var Article = models.Article;
var Category = models.Category;

// 渲染首页
exports.showHome = function (req, res, next) {
	res.redirect('/articles');
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

// 渲染文章页
exports.showArticles = function (req, res, next) {
	Article.find({published: true})
					.sort('created')
					.populate('author')
					.populate('category')
					.exec(function (err, articles) {
						if (err) {
							next(err);
						};
						// 接受前端传递的pageNum页数
						var pageNum = Math.abs(parseInt(req.query.page || 1, 10));
						// 每页10条
						var pageSize = 10
						// 总条目数
						var totalCount = articles.length;
						// 页数
						var pageCount = Math.ceil(totalCount / pageSize);
						// 边界处理
						if (pageNum > pageCount) {
							pageNum = pageCount;
						}

						res.render('blog/index', { 
							title: '首页',
							articles: articles.slice((pageNum - 1) * pageSize, pageNum * pageSize),
							pageNum: pageNum,
							pageCount: pageCount
						});
	});
};

// 渲染分类页面
exports.showCategories = function (req, res, next) {
	Category.findOne({name: req.params.name})
					.exec(function (err, category) {
						if (err) {
							return next(err);
						};
						Article.find({category: category, published: true})
									 .sort('created')
									 .populate('author')
									 .populate('category')
									 .exec(function (err, articles) {
									 		if (err) {
									 			return next(err);
									 		};
									 		res.render('blog/category', { 
												title: category.name,
												articles: articles,
												category:category
											});	
									 });
					});
};