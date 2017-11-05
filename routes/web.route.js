var express = require('express');
var router = express.Router();

// 首页
router.get('/', function (req, res, next) {
	res.render('blog/index', { 
		title: 'blog' 
	});
});


// 联系
router.get('/contact', function (req, res, next) {
	res.render('blog/index', {
		title: '联系'
	});
});

// 关于
router.get('/about', function (req, res, next) {
	res.render('blog/index', {
		title: '关于'
	});
});

module.exports = router 