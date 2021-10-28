const createError = require('http-errors');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require("mongoose");
const passport = require("passport");

// import routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user.routes');

// server
const url = "mongodb://localhost:27017/oauth-server";
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
connect.then(() => console.log(`Connected Correctly to: ${url}`),
  err => console.log(err)
);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(morgan('dev'));

// parse json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// passport session
app.use(passport.initialize());

// serve static files in public folder
app.use(express.static(path.join(__dirname, 'public')));

// router routes
app.use('/', indexRouter);
app.use('/users', userRouter);

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
