const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
const authenticate = require("./controllers/auth.controller")
const mongoose = require("mongoose");

// env
const config = require('./config');

// import routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user.routes');

// server
const url = config.mongoUrl;
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
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
// morgan dev logger
app.use(logger('dev'));

// parse json and store key prop values
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session
app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));

// start or check for existing session - req.user
app.use(passport.initialize());
app.use(passport.session());

// router routes
app.use('/', indexRouter);
app.use('/users', userRouter);

function auth(req, res, next) {
    console.log(req.user);

    if (!req.user) {
        const err = new Error('You do not have OAuth permission!');
        err.status = 401;
        return next(err);
    } else {
        return next();
    }
}

app.use(auth);

// serve static files in public folder
app.use(express.static(path.join(__dirname, 'public')));

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
