/*
 * GET home page.
 */
var WebSocketServer = require('ws').Server
var server = require('../app').server;
var ph = ph || {};
ph.route = ph.route || {};


exports.route = function (app) {
	app.get('/', ph.route.get_index);
	app.get('/playground', ph.route.get_playground);
};

ph.route.get_index = function (req, res) {
	return res.render('index', {title: "index"});
};

ph.route.get_playground = function (req, res) {
	var wss = new WebSocketServer({server: server});
	console.log('websocket server created');
	wss.on('connection', function(ws) {
		var id = setInterval(function() {
			return res.render('playground', {title: "Play Ground"});
			ws.send(JSON.stringify(new Date()), function() {  });
		}, 1000);

		console.log('websocket connection open');

		ws.on('close', function() {
			console.log('websocket connection close');
			clearInterval(id);
		});
	});



};

