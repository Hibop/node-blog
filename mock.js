// mock data

var loremipsum = require('lorem-ipsum'),
		slug = require('slug'),
		config = require('./config.js'),
		mongoose = require('mongoose');

mongoose.Promise = global.Promise

mongoose.set('debug',true);


let db = mongoose.connect(config.db, {useMongoClient:true});

db.on('error', function () {
	console.error('连接错误!')
});

db.on("open",function(){
    console.log("数据库连接成功");
});


var models = require('./models/index.js');
var Article = models.Article;
var User = models.User;
var Category = models.Category;



// let user = new User({name: 'admin', email: 'admin@qq.com', password: '111111', created: new Date()});
// user.save(function (req, res, next) {
// 	console.log('user insert ok');
// });

// Category.collection.insert(
// 	[
// 		{name: 'Node', slug: 'node', created: new Date()}, 
// 		{name: 'JavaScript', slug: 'javascript', created: new Date()},
// 		{name: 'HTML5', slug: 'html5', created: new Date()},
// 		{name: 'CSS3', slug: 'css3', created: new Date()}
// 	], function (err, categorys) {
// 		if (!err) {
// 			console.log('category insert ok');
// 		};
// 	});


User.findOne(function (err, user) {
	if (err) {
		console.error('can not find user');
	};
	// console.log(user);
	Category.find(function (err, categorys) {
		if (err) {
			console.error('can not find category');
		};
		console.log(categorys);
		categorys.forEach(function (category) {
			// 默认插入35条数据

			for (var i = 0; i <= 34; i++) {
				var title = loremipsum({count: 1, units: 'sentence'});
				var article = new Article({
					title: title,
					slug: slug(title),
					content: loremipsum({count: 34, units: 'sentence'}),
					category: category,
					author: user,
					published: true,
					meta: {favorites: 0},
					comments: [],
					created: new Date
				});

				article.save(function (err, art) {
					if (err) {
						console.error('save erroe');
						return
					};
					console.log('saved article:');
				});		
			};

		});

	});
});
