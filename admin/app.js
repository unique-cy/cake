var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs=require('ejs');
var session = require("express-session");


var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var loginOutRouter = require('./routes/loginOut');

var newRouter = require('./routes/new');


var popularRouter = require('./routes/popular');


var birthdayRouter = require('./routes/birthday');


var cakeRouter = require('./routes/cake');


var iceCreamRouter = require('./routes/iceCream');


var afternoonTeaRouter = require('./routes/afternoonTea');


var breadRouter = require('./routes/bread');


var normalTemperatureCakeRouter = require('./routes/normalTemperatureCake');


var giftRouter = require('./routes/gift');


var detailRouter = require('./routes/detail');


var classifyRouter = require('./routes/classify');


var cors=require('cors');

var app = express();

// 配置cors跨域
app.use(cors({
  origin:"*",  //指定接收的地址    *表示接受所有请求
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",  //指定接收的请求类型
  alloweHeaders:['Content-Type','Authorization']  //指定header
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));


app.set('view engine', 'ejs');
app.engine('.html',ejs.__express) ; 
app.set('view engine', 'html');

// 保存用户信息
app.use(session(
  { 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
       maxAge:864000000000
      },
    rolling:true
  }
));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'img')));


//自定义中间件 判断登录状态
app.use((req,res,next)=>{
  console.log(req.session.userInfo);
  if(req.url=='/login'||req.url=='/register'){
    next();
  }else{
    if(req.session.userInfo && req.session.userInfo.username!=''){
      req.app.locals['userInfo']=req.session.userInfo;
      next();
    }else{
      res.redirect('/login');
    }
  }
})

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/register', registerRouter);
app.use('/loginOut', loginOutRouter);

app.use('/new', newRouter);


app.use('/popular', popularRouter);


app.use('/birthday', birthdayRouter);


app.use('/cake', cakeRouter);


app.use('/iceCream', iceCreamRouter);


app.use('/afternoonTea', afternoonTeaRouter);


app.use('/bread', breadRouter);


app.use('/normalTemperatureCake', normalTemperatureCakeRouter);


app.use('/gift', giftRouter);


app.use('/detail', detailRouter);


app.use('/classify', classifyRouter);


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
