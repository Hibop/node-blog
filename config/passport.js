/*
 * Passport.js 是 Node.js 的身份验证中间件，我们可以用它来进行会话管理。
 * 加入了 ’ passport-local ‘模块，实现了利用用户名和密码的本地身份验证策略更加简单的集成。
 * 	
 * @address https://www.npmjs.com/package/passport
 */ 


var passport = require('passport'),
		LocalStrategy = require('passport-local').Strategy,
		models = require('../models/index.js'),
		User = models.User,
    mongoose = require('mongoose');

module.exports.init = function () {
	// 在认证请求之前，必须配置应用程序使用的策略（或策略）
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},function(email, password, done) {
	    User.findOne({ email: email }, function (err, user) {
				if (err) { return done(err); }
	      if (!user) { return done(null, false); }
				if (!user.verifyPassword(password)) { return done(null, false); }
	      return done(null, user);
	    });
	  }
	));

	// Sessions 序列化
	passport.serializeUser(function(user, done) {
	  done(null, user._id);
	});
	 
	passport.deserializeUser(function(id, done) {
	  User.findById(id, function (err, user) {
	    done(err, user);
	  });
	});
};
