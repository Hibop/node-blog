var mongoose = require('mongoose');
var config = require('../config.js');
mongoose.Promise = global.Promise
mongoose.connect(config.db, {useMongoClient:true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接错误:'));

// require models
require('./user');
require('./category');
require('./article');

exports.User         = mongoose.model('User');
exports.Category        = mongoose.model('Category');
exports.Article        = mongoose.model('Article');
exports.db = db;