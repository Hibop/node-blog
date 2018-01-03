// 首页

var models = require('../models/index.js');
var Article = models.Article;
var Category = models.Category;
var mongoose = require('mongoose');
// 渲染首页
exports.showHome = function (req, res, next) {
	res.redirect('/articles');
};

// 渲染关于
exports.showContact = function (req, res, next) {
	res.render('blog/about', {
		title: '关于'
	});
};

// 渲染联系
exports.showLinks = function (req, res, next) {
	res.render('blog/contact', {
		title: '联系'
	});
};

// 渲染文章页
exports.showArticles = function (req, res, next) {
	// 查询条件
  var queryOption = {published: true};
  if (req.query.keyword) {
  	queryOption.title = new RegExp(req.query.keyword.trim(), 'i');
  	// queryOption.content = new RegExp(req.query.keyword.trim(), 'i');
  };

	Article.find(queryOption)
					.sort('-created')
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
							pageCount: pageCount,
							keyword: req.query.keyword || ''
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

// 渲染文章详情页
exports.showArticleDetail = function (req, res, next) {
	// (slug/_id)容错处理
	if (!req.params.id) {
		return next(new Error('no post id param!'));
	};

	var conditions = {};
	try {
		conditions._id = mongoose.Types.ObjectId(req.params.id);
	} catch (err) {
		conditions.slug = req.params.id;
	};

	Article.findOne(conditions)
				 .sort('created')
				 .populate('author')
				 .populate('category')
				 .exec(function (err, article) {
				 		if (err) {
				 			return next(err);
				 		};
				 		res.render('blog/view', {
				 			title: article.title,
				 			article: article
				 		});
				 });
};

// 文章点赞
exports.doLike = function (req, res, next) {
	// (slug/_id)容错处理
	if (!req.params.id) {
		return next(new Error('no post id param!'));
	};

	var conditions = {};
	try {
		conditions._id = mongoose.Types.ObjectId(req.params.id);
	} catch (err) {
		conditions.slug = req.params.id;
	};

	Article.findOne(conditions)
				 .sort('created')
				 .populate('author')
				 .populate('category')
				 .exec(function (err, article) {
				 		if (err) {
				 			return next(err);
				 		};
				 		var newFa = article.meta.favorites + 1
				 		// article.meta.favorites = article.meta.favorites ? article.meta.favorites +1 : 1;
				 		article.meta.favorites = newFa || 1
				 		console.log(newFa)
				 		article.save(function (err, article) {
				 			if (err) { return next(err)};
				 			// TODO ajax点赞
				 			console.log(article)
				 			res.render('blog/view', {
				 				title: article.title,
				 				article: article
				 			})
				 		});
				 		
				 });
};

// 添加评论
exports.addComment = function (req, res, next) {
	// (slug/_id)容错处理
	if (!req.body.email) {
		return next(new Error('no email param!'));
	};

	if (!req.body.content) {
		return next(new Error('no content param!'));
	};

	var conditions = {};
	try {
		conditions._id = mongoose.Types.ObjectId(req.params.id);
	} catch (err) {
		conditions.slug = req.params.id;
	};

	Article.findOne(conditions)
				 .exec(function (err, article) {
				 		if (err) {
				 			return next(err);
				 		};
				 		var comment = {
				 			email: req.body.email,
				 			content: req.body.content,
				 			created: new Date()
				 		};
				 		article.comments.unshift(comment);
				 		article.save(function (err, article) {
				 			req.flash('info', '评论添加成功!');
				 			res.redirect('/articles/view/' + article.slug);
				 		});
				 });
};