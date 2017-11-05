// 首页

// 渲染首页
exports.showHome = function (req, res, next) {
	res.render('blog/index', { 
		title: '首页' 
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


