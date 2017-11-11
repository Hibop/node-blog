var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin.js');

// 后台管理首页
router.get('/', adminController.showAdmin);


// 后台文章列表页
router.get('/articles', adminController.showAdminArticles);

// 编辑
router.get('/articles/edit/:id', function (req, res, next) {

});

// 编辑提交

router.post('/articles/edit/:id', function (req, res, next) {

});

// 删除

router.get('/articles/delete/:id', adminController.deleteArticle);

module.exports = router;