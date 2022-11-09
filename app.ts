const  createError = require('http-errors');
import express, { Express, Request, Response, NextFunction} from 'express';
import { HttpError } from 'http-errors';
import dotenv from 'dotenv';
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
import methodOverride from 'method-override';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
const productRouter = require('./routes/product');

const dotENV = dotenv.config()

const app = express();

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');
app.disable('etag')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"..", path.sep, 'public')));
app.use(methodOverride('_method'));
app.use(express.static("public")); ///on js/server file

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// app.post('/register', registerUser)
// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  const errorStatusCode = err.status ? err.status : 500
  res.status(errorStatusCode)
  res.status(err.status || 500);
});

export default app;
