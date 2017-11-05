var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin.js');

// 后台管理首页
router.get('/admin', adminController.showAdmin);

module.exports = router;