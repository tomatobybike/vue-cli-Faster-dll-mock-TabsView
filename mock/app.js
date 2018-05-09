var express = require('express');
var path = require('path');
var $config = require('./conf/config');
var logger = require('morgan');
var bodyParser = require('body-parser');
var opn = require('opn');
var  Mock = require('mockjs');
var $static=$config.config.static;

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({strict: false}));
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/',express.static(path.join(__dirname, $static)));

var root=''
app.use(root+'/user',require('./routes/user'));
app.use(root+'/api/data',require('./routes/data'));

app.use(root+'/table',require('./routes/table'));

app.use(root+'/hotnews',require('./routes/hotnews'));


//文件上传
app.use('/upload', require('./routes/data/server'));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;

var port=3001;
app.listen(port,function(){
  console.log('**************************************');
  console.log('    weather 分支');
  console.log('**************************************');
  console.log('port='+port);
  console.log("Server Start!");
  var url = 'http://127.0.0.1:' + port;
  // opn(url); 不用打开浏览器
});
