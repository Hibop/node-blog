// 后台

var models = require('../models/index.js');
var Article = models.Article;
var User = models.User;
var Category = models.Category;
var slug = require('slug');
var pinyin = require('pinyin');


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

  if (req.query.keyword) {
  	queryOption.title = new RegExp(req.query.keyword.trim(), 'i');
  	queryOption.content = new RegExp(req.query.keyword.trim(), 'i');
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
								author: req.query.author || '',
								keyword: req.query.keyword || ''
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
		pretty: true,
		action: '/admin/articles/add',
		article: {
			category: {
				_id: ''
			},
			content: ''
		}
	});
};

// 后台文章编辑添加
exports.postAddAdminArticle = function (req, res, next) {

	req.checkBody('title', '文章标题不能为空。').notEmpty();
	req.checkBody('category', '请选择文章分类。').notEmpty();
	req.checkBody('content', '文章内容不能为空。').notEmpty();

	var errors = req.validationErrors();
	// console.log(errors)
	if (errors) {
		return res.render('admin/addArticles', {
			errors: errors,
			title: req.body.title,
			content: req.body.content,
			article: {
				category: {
					_id: ''
				}
			}
		});
	}

	var title = req.body.title.trim();
	var category = req.body.category.trim();
	var content = req.body.content.trim();

	User.findOne({}, function (err, author) {
		if (err) {
			return next(err);
		};

		// fix中文标题
		var py = pinyin(title, {
			style: pinyin.STYLE_NORAML,
			heteronym: false
		}).map(function (item) {
			return item[0];
		}).join(' ');

		var article = new Article({
			title: title,
			slug: slug(py),
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
				req.flash('error', '文章发布失败!');
				res.redirect('/admin/articles/add');
			};
			req.flash('info', '文章发布成功!');
			res.redirect('/admin/articles');
		})

	});
	
}

// 后台文章分类列表
exports.showAdminCategories = function (req, res, next) {
	res.render('admin/categories', {
		pretty: true
	});
};

// 后台分类添加查看
exports.addAdminCategory = function (req, res, next) {
	res.render('admin/addCategories', {
		action: '/admin/categories/add',
		category: {
			_id: '',
			name: ''
		},
		pretty: true
	});
};

// 后台分类添加提交
exports.editAdminCategory = function (req, res, next) {
	//
	req.checkBody('name', '分类名字不能为空。').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		return res.render('admin/addCategories', {
			errors: errors,
			name: req.body.name,
			category: {
				name: ''
			}
		});
	}

	var name = req.body.name.trim();

	// fix中文标题
	var py = pinyin(name, {
		style: pinyin.STYLE_NORAML,
		heteronym: false
	}).map(function (item) {
		return item[0];
	}).join(' ');

	var category = new Category({
		name: name,
		slug: slug(py),
		created: new Date()

	});

	category.save(function (err, category) {
		if (err) {
			req.flash('error', '分类添加失败!');
			res.redirect('/admin/categories/add');
		};
		req.flash('info', '分类添加成功!');
		res.redirect('/admin/categories');
	});

};

// 后台分类删除
exports.deleteAdminCategory = function (req, res, next) {

	req.category.remove(function (err, rowsRemoved) {
		if (err) {
			return next(err)
		};
		if (rowsRemoved) {
			req.flash('success', '分类删除成功!');
		} else {
			req.flash('success', '分类删除失败!');
		}
		res.redirect('/admin/categories')
	});
};

// 后台分类编辑查看
exports.viewAdminCategory = function (req, res, next) {
	res.render('admin/addCategories', {
		action: '/admin/categories/edit/' + req.category._id,
		category: req.category,
		pretty: true
	});

};

// 后台分类编辑提交
exports.postAdminCategory = function (req, res, next) {
	var category = req.category;

	var name = req.body.name.trim();
	// fix中文标题
	var py = pinyin(name, {
		style: pinyin.STYLE_NORAML,
		heteronym: false
	}).map(function (item) {
		return item[0];
	}).join(' ');

	// 存值
	category.name = name;
	category.slug = slug(py);

	category.save(function (err, category) {
		if (err) {
			req.flash('error', '分类名保存失败!');
			res.redirect('/admin/categories/edit/' + article._id);
		};
		req.flash('info', '分类名保存成功!');
		res.redirect('/admin/categories');
	})
};

// 后台文章编辑提交
exports.editAdminArticle = function (req, res, next) {
	
  var article = req.article;

	var title = req.body.title.trim();
	var category = req.body.category.trim();
	var content = req.body.content.trim();

	// fix中文标题
	var py = pinyin(title, {
		style: pinyin.STYLE_NORAML,
		heteronym: false
	}).map(function (item) {
		return item[0];
	}).join(' ');

	// 存值
	article.title = title;
	article.category = category;
	article.content = content;
	article.slug = slug(py);

	article.save(function (err, article) {
		if (err) {
			req.flash('error', '文章保存失败!');
			res.redirect('/admin/articles/edit/' + article._id);
		};
		req.flash('info', '文章保存成功!');
		res.redirect('/admin/articles');
	})
}

// 后台文章编辑查看
exports.viewAdminArticle = function (req, res, next) {

		var article = req.article  		 	
		res.render('admin/addArticles', {
			title: article.title,
			article: article,
			action: '/admin/articles/edit/' + req.article._id
		});
		
}