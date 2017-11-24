var express = require('express');
var router = express.Router();

var homeController = require('../controllers/home.js');
var loginAuth = require('../middlewares/auth.js');

// 首页
router.get('/', loginAuth.auth, homeController.showHome);

// 联系
router.get('/contact', loginAuth.auth, homeController.showLinks);

// 关于
router.get('/about', loginAuth.auth, homeController.showContact);

// 文章汇总
router.get('/articles', loginAuth.auth, homeController.showArticles);

// 每篇文章视图
router.get('/articles/view/:id', loginAuth.auth, homeController.showArticleDetail);

// 分类汇总

router.get('/articles/category/:name', loginAuth.auth, homeController.showCategories);

// 评论
router.post('/articles/comment/:id', loginAuth.auth, homeController.addComment);

// 点赞
router.get('/articles/favorite/:id', loginAuth.auth, homeController.doLike);

module.exports = router 