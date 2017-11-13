// 后台

var models = require('../models/index.js');
var Article = models.Article;
var User = models.User;
var slug = require('slug');

// 后台管理首页
exports.showAdmin = function (req, res, next) {
	res.redirect('/admin/articles');
};

// 后台管理列表页面
exports.showAdminArticles = function (req, res, next) {
	// 排序字段
	var sortby = req.query.sortby || 'created';
	// 排序顺序
	var sortdir = req.query.sortdir || 'desc'

	// 容错
	// sort field list
	var sortFieldList = ['title', 'category', 'author', 'created', 'published'];
	var sortDirList = ['desc', 'asc'];
	if (sortFieldList.indexOf(sortby) === -1) {
		sortby = 'created';
	};
	if (sortDirList.indexOf(sortdir) === -1) {
		sortdir = 'desc'
	};

	// 排序对象
	var sortOption = {};
	sortOption[sortby] = sortdir;

  // 查询条件
  var queryOption = {};
  if (req.query.category) {
  	queryOption.category = req.query.category.trim();
  };
  if (req.query.author) {
  	queryOption.author = req.query.author.trim();
  };

	User.find({}, function (err, authors) {
		if (err) {next(err)};
		Article.find(queryOption)
					.sort(sortOption)
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

						res.render('admin/articles', { 
							title: '后台文章列表页',
							articles: articles.slice((pageNum - 1) * pageSize, pageNum * pageSize),
							pageNum: pageNum,
							pageCount: pageCount,
							sortdir: sortdir,
							sortby: sortby,
							authors: authors,
							pretty: true,
							filter: {
								category: req.query.category || '',
								author: req.query.author || ''
							}
						});
		});
	});
	
};

// 后台文章删除
exports.deleteArticle = function (req, res, next) {
	if (!req.params.id) {
		return next(new Erro('no post id from FE'));
	};
	Article.remove({_id: req.params.id}).exec(function (err, rowsRemoved) {
		if (err) {
			return next(err)
		};
		if (rowsRemoved) {
			req.flash('success', '文章删除成功!');
		} else {
			req.flash('success', '文章删除失败!');
		}
		res.redirect('/admin/articles')
	});
};

// 后台文章添加
exports.addAdminArticle = function (req, res, next) {
	res.render('admin/addArticles', {
		pretty: true
	});
};

// 后台文章编辑添加
exports.postAddAdminArticle = function (req, res, next) {
	var title = req.body.title.trim();
	var category = req.body.category.trim();
	var content = req.body.content.trim();

	User.findOne({}, function (err, author) {
		if (err) {
			return next(err);
		};

		var article = new Article({
			title: title,
			slug: slug(title),
			category: category,
			content: content,
			author: author,
			published: true,
			meta: {favorites: 0},
			comments: [],
			created: new Date()

		});

		article.save(function (err, article) {
			if (err) {
				req.flash('error', '文章保存失败!');
				res.redirect('/admin/articles/add');
			};
			req.flash('info', '文章保存成功!');
			res.redirect('/admin/articles');
		})

	});
	
}

// 后台文章分类
exports.showAdminCategories = function (req, res, next) {
	res.render('admin/categories', {
		pretty: true
	});
};

// 后台分类添加
exports.addAdminCategory = function (req, res, next) {
	res.render('admin/addCategories', {
		pretty: true
	});
};