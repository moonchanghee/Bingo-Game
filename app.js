var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
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

var count = 1;
var usercount = 1;

io.on('connection' , function(socket){
socket.emit('usercnt' , usercount);
io.emit('alluser' , usercount)
usercount++;
socket.on('alluser' , function(alluser){
  console.log(count);
  // socket.emit('alluser' , count)
  
socket.on('checknum' , function(data){
    var ch = data + "선택";
    socket.broadcast.emit('msg' , ch );
    io.emit('send' ,  data , count);
  });

  socket.on('bingo' , function(go){
    socket.broadcast.emit('bingo' , go);  
  });
  count++;
});
});

http.listen(3000, function(){ 
	console.log('server on..');
});          