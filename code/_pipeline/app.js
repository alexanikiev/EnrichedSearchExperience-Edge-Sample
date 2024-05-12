var createError = require('http-errors');
var express = require('express');
var fileUpload = require('express-fileupload');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

//cracking pipeline
var crackingRouter = require('./routes/cracking');

//syncing pipeline
var syncingRouter = require('./routes/syncing');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());//new:
app.use(fileUpload());//new:

app.use(logger('dev'));

//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/api/v1/cracking', crackingRouter);
app.use('/api/v1/syncing', syncingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
