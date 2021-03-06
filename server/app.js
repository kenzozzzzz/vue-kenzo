var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var {Mongoose} = require('./untils/config.js');
var session =require('express-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var commentRouter = require('./routes/comment');
var dianzanRouter = require('./routes/dianzan');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
	secret : 'zzzzz', //加密
	name : 'sessionId',
	resave : false,
	saveUninitialized : false, //初始的
	cookie : { 
		maxAge : 1000 * 60 * 60 //过期时间 1s * 60 * 60 =1h
	}
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api2/users', usersRouter);
app.use('/api2/admin', adminRouter);
app.use('/api2/comment', commentRouter);
app.use('/api2/dianzan', dianzanRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

Mongoose.connect();

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
