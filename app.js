var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');


var app = express();
// Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://admin:1234@petfinder.xwxdrcq.mongodb.net/PetFinder?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once('open', function(){
//   const DogSchema = new mongoose.Schema({
//     name: {type: String, required: true, maxLength: 25},
//     age: {type: Number},
//     breed: {type: String},
//     gender: {type: String, required: true},
//     size: {type: String},
//     entry_date: {type: Date},
//   });
//   let Dog = mongoose.model('Dog', DogSchema, 'Pet');
//   let dog1 = new Dog({name: 'Luna',
//                     age: 3,
//                     breed: 'Boxer',
//                     gender: 'Female',
//                     size: 'Medium',
//                     entry_date: Date.now()})
//   dog1.save(function(err, dog) {
//     if(err) return console.error(err);
//     console.log(dog.name + "saved to pet collection")
//   })
// })


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

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
