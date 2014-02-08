
/**
 * Module dependencies.
 */

var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib())
}

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('keyboard cat'));
app.use(express.session({
	cookie: {
		maxAge: 600000000
	}
}));

app.use(stylus.middleware(
	{ src: __dirname + '/public'
	, compile: compile
	}
));

app.use(app.router);
app.use(express['static'](path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes.route(app);

var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', routes.io);

