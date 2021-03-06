var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// var logger = require('morgan');
var log4js = require('log4js')
var logger = require('./common/logger')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');
var truncate = require('truncate');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var messages = require('express-messages');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);

var webRoute = require('./routes/web.route.js');
var admin = require('./routes/admin.js');


var models = require('./models/index.js');
var Category = models.Category;
var User = models.User;
var connection = models.db;
var app = express();

// 添加全局中间件,首页tab切换
app.use(function(req, res, next){
	app.locals.pageName = req.path;
  app.locals.moment = moment;
  app.locals.truncate = truncate;
  Category.find({}).sort('-created').exec(function (err, categories) {
    if (err) {
      return next(err);
    }
    app.locals.categories = categories
    next();
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(validator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.');
    var root = namespace.shift();
    var formParam = root;
    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    };

    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}));

app.use(cookieParser());

app.use(session({
  secret: 'blog',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false},
  store: new MongoStore({ mongooseConnection: connection })
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use(function (req, res, next) {
//   req.user = null;
//   if (req.session.passport && req.session.passport.user) {
//     User.find({_id: req.session.passport.user}, function (err, user) {
//       if (err) { return next(err)};
//       user.password = null;
//       req.user = user;
//       next();

//     })
//   }
//   next()
// });

app.use(flash());

app.use(function (req, res, next) {
  res.locals.messages = messages(req, res);
  res.locals.user = req.user;
  // console.log(req.user)
  // console.log(req.session); // test session
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', webRoute);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  logger.info(err.stack);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

require('./config/passport.js').init();

module.exports = app;
