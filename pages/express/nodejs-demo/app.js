var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var http=require('http');

var routes = require('./routes');
var users = require('./routes/users');
var ejs=require('ejs');
var app = express();
//test mongodb
//install mongodb
var  mongodb = require('mongodb');
//install session-mongoose
var session=require('express-session');

var MongoStore = require('connect-mongo')(session);

var store=new MongoStore({
    url:"mongodb://localhost/session",
    interval:120000
});

// view engine setup
//html engine
app.engine(".html", require('ejs').renderFile);
//app.set('.html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
//app.set('view engine', 'ejs');

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/doLogin', routes.doLogin);
//app.get('/logout', routes.logout);
//app.get('/home', routes.home);


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//4.0 未安装
//app.use(express.favicon());
app.use(logger('dev'));
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: false }));

//4.0 未安装
//app.use(express.methodOverride());

//4.0 未安装
//app.use(express.cookieParser());
//4.0 未安装
//app.use(express.cookieSession({secret : 'fens.me'}));
app.use(session({
    secret : 'fens.me',
    store: store,
    cookie: { maxAge: 900000 }
}));
app.use(function(req, res, next){
    res.locals.user = req.session.user;
    next();
});
app.use('/', routes);
app.use('/users', users);
//??
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(3000);

module.exports = app;
