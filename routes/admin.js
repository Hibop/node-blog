var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin.js');

// 后台管理首页
router.get('/', adminController.showAdmin);


// 后台文章列表页
router.get('/articles', adminController.showAdminArticles);

// 后台文章编辑
router.get('/articles/edit/:id', function (req, res, next) {

});

// 后台文章编辑提交

router.post('/articles/edit/:id', function (req, res, next) {

});

// 后台文章删除
router.get('/articles/delete/:id', adminController.deleteArticle);

// 后台文章列表添加
router.get('/articles/add', adminController.addAdminArticle);

router.post('/articles/add', adminController.postAddAdminArticle);

// 后台文章分类
router.get('/categories', adminController.showAdminCategories);

// 后台文章分类添加
router.get('/categories/add', adminController.addAdminCategory);

router.post('/categories/add', function (req, res, next) {
	//
});


module.exports = router;