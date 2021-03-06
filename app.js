var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session); // connect-mongo will access our sessions
var index = require('./routes/index');
var clients = require('./routes/clients');
var cards = require('./routes/cards');
var visits = require('./routes/visits');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// serve static files
app.use('/static',express.static('public'));

// database
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rewwwards';
mongoose.connect( mongoUri, {useMongoClient:true} );
var db = mongoose.connection;

// session
app.use(session({
	secret: 'Ohana means family',
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: db // mongoose.connection
	})
}));

// open db connection
db.on('open',function(){
	console.log('connection opened');
});

db.on('error',function(e){
	console.log('\n\n\n\nERROR'+e.message);
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/clients', clients);
app.use('/cards', cards);
app.use('/visits', visits);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  return res.status(500).json({message:err.message});
});

module.exports = app;
