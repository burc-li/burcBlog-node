// 处理404 Not Found
var createError = require('http-errors');
// express工具
var express = require('express');
// 路径工具
var path = require('path');
// 解析cookie
var cookieParser = require('cookie-parser');
// 记录生成日志
var logger = require('morgan');
// session处理
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const bodyParser = require('body-parser');

// 引入两个路由
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');
const commentRouter = require('./routes/comment');

// 本次http请求的实例，每次请求都会产生一个新的app实例
var app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// view engine setup 视图引擎设置 若前后端分离，可删掉
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 使用日志
app.use(logger('dev'));
// post请求传递的数据postData，赋值给req.body，可以通过req.body获得
app.use(express.json());
// 和 app.use(express.json())类似 ，处理除application/json格式意外的格式，可以通过req.body获得post传递的数据
app.use(express.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());
// 引入redis.js中的redisClient对象
const redisClient = require('./db/redis');
const sessionStore = new RedisStore({ 
  client: redisClient
});
// 解析session
app.use(session({
    secret:"BurC@#123",  //秘钥
    cookie:{
      // path:"/",  // 默认配置
      // httpOnly:true,  // 默认配置
      maxAge:24*60*60*1000  //一天过期时间 1000毫秒
    },
    store: sessionStore
}));


// 访问静态文件  若前后端分离，可删掉
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);  
app.use('/api/user', userRouter);
app.use('/api/comment', commentRouter);

// catch 404 and forward to error handler 路由范围之外 404页面 
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler 程序发生错误
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
   // 本地开发环境出现问题抛出err ； 上线环境出现问题抛出{}  'development'改为'dev'
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
