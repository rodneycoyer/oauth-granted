const createError = require('http-errors');
const express = require('express');
const path = require('path');
const morgan = require('morgan');

// import routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user.routes');

// server info
const hostname = "localhost";
const port = 3000;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
// parse json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// serve static files in public folder
app.use(express.static(path.join(__dirname, 'public')));

// router routes
app.use('/', indexRouter);
app.use('/users', userRouter);

// listen for sever connection
app.listen(port, hostname, () => {
  console.log(`server correctly running on http://${hostname}:${port}/`);
});

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
