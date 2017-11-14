var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin.js');

var editGetPost = require('../middlewares/editGetPost.js');
var editGetCategory = require('../middlewares/editGetCategory.js');

// 后台管理首页
router.get('/', adminController.showAdmin);


// 后台文章列表页
router.get('/articles', adminController.showAdminArticles);

// 后台文章编辑查看
router.get('/articles/edit/:id', editGetPost.getPost, adminController.viewAdminArticle);

// 后台文章编辑提交

router.post('/articles/edit/:id', editGetPost.getPost, adminController.editAdminArticle);

// 后台文章删除
router.get('/articles/delete/:id', adminController.deleteArticle);

// 后台文章列表添加
router.get('/articles/add', adminController.addAdminArticle);

router.post('/articles/add', adminController.postAddAdminArticle);

// 后台分类列表
router.get('/categories', adminController.showAdminCategories);

// 后台分类添加查看
router.get('/categories/add', adminController.addAdminCategory);

// 后台分类添加提交
router.post('/categories/add',  adminController.editAdminCategory);

// 后台分类删除
router.get('/categories/delete/:id', adminController.deleteAdminCategory);

// 后台分类编辑查看
router.get('/categories/edit/:id', editGetCategory.getCategory, adminController.viewAdminCategory);


// 后台分类编辑提交
router.post('/categories/edit/:id', editGetCategory.getCategory, adminController.postAdminCategory);


module.exports = router;