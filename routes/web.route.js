var express = require('express');
var router = express.Router();

var homeController = require('../controllers/home.js');
// 首页
router.get('/', homeController.showHome);

// 联系
router.get('/contact', homeController.showLinks);

// 关于
router.get('/about', homeController.showContact);

// 文章汇总
router.get('/articles', homeController.showArticles);

// 每篇文章视图
router.get('/articles/view/:id', homeController.showArticleDetail);

// 分类汇总

router.get('/articles/category/:name', homeController.showCategories);

// 评论
router.get('/articles/comment', function (req, res, next) {

});

// 点赞
router.get('/articles/favorite/:id', homeController.doLike);

module.exports = router 