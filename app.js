require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const logoutRouter = require('./routes/logout');
const app = express();
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
// confuing passport
require('./controllers/passport-config')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'wowhack',
  resave: false,
  saveUninitialized: false
}));
//passport middle ware
app.use(passport.initialize());
app.use(passport.session());
//flash
app.use(flash());
//global var
app.use((req, res, next) => {
  res.locals.sucess_msg = req.flash('sucess_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

app.use(methodOverride('_method'));


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/logout', logoutRouter);




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
