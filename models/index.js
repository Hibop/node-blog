var mongoose = require('mongoose');
var config = require('../config.js');

let db = mongoose.connect(config.db, {useMongoClient:true});
db.on('error', console.error.bind(console, '连接错误:'));

// require models
require('./user');
require('./category');
require('./article');


exports.User         = mongoose.model('User');
exports.Category        = mongoose.model('Category');
exports.Article        = mongoose.model('Article');