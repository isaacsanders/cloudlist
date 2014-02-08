/*
 * GET home page.
 */
var ph = ph || {};
ph.route = ph.route || {};
ph.socket = require('./socket');


exports.route = function (app) {
	app.get('/', ph.route.get_index);
	app.get('/hub', ph.route.get_hub);
	app.get('/party', ph.route.get_party);
	app.get('/addSongTest', ph.route.get_song_test);
};

exports.io = function (socket, io) {
	ph.socket.hubIO(socket, io);
	ph.socket.clientIO(socket,io);
};


ph.route.get_index = function (req, res) {
	return res.render('index', {title: "index"});
};

ph.route.get_hub = function (req, res) {
	return res.render('hub', {title: "PartyHub Party" });
};

ph.route.get_party = function (req, res) {
	return res.render('party', {title: "PartyHub Party" });
};

ph.route.get_song_test = function(req, res){
	return res.render('addSongTest', {title:"PartyHub songTEST"});
};