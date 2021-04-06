const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');
const itemRouter = require('./routes/item-page');
const aboutRouter = require('./routes/about');
const addItemRouter = require('./routes/add-item');

//Test DB
const db = require('./config/dataBase.js')
db.authenticate()
  .then(() => console.log('Data base connected...###'))
  .catch(err => console.log('Error' + err))

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.use((req, res, next) => {
  const openPathes = ["/users/user-login", "/","/users/user-sign-in"];
  if (!openPathes.includes(req.path)) {
    try {
      console.log("req.headers.authorization");
      console.log(req.headers.authorization);

      req.user = parseBearer(req.headers.authorization, req.headers);
      console.log(req.user);
    } catch (err) {
      return res.status(401).json({ result: "Access Denied" });
    }
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/item-page', itemRouter);
app.use('/about', aboutRouter);
app.use('/add-item', addItemRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
