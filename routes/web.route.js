var express = require('express');
var router = express.Router();

var homeController = require('../controllers/home.js');
// 首页
router.get('/', homeController.showHome);

// 联系
router.get('/contact', homeController.showLinks);

// 关于
router.get('/about', homeController.showContact);

module.exports = router 