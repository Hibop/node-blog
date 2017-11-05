var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home.js');

// 后台管理首页
router.get('/admin', homeController.showAdmin);

module.exports = router;