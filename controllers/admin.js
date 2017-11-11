// 后台

var models = require('../models/index.js');
var Article = models.Article;

// 后台管理首页
exports.showAdmin = function (req, res, next) {
	res.redirect('/admin/articles');
};

// 后台管理列表页面
exports.showAdminArticles = function (req, res, next) {
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

						res.render('admin/articles', { 
							title: '后台文章列表页',
							articles: articles.slice((pageNum - 1) * pageSize, pageNum * pageSize),
							pageNum: pageNum,
							pageCount: pageCount
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
}