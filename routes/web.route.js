var express = require('express');
var router = express.Router();

var homeController = require('../controllers/home.js');
// 首页
router.get('/', homeController.showHome);

// 联系
router.get('/contact', homeController.showLinks);

// 关于
router.get('/about', homeController.showContact);

// 文章
router.get('/articles', homeController.showArticles);

// 视图
router.get('/articles/view', function (req, res, next) {

});

// 评论
router.get('/articles/comment', function (req, res, next) {

});

// 点赞
router.get('/articles/favorite', function (req, res, next) {

});

module.exports = router 