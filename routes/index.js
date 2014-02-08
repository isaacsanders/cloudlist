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
	app.get('/contentCollapser', ph.route.get_content_collapser);
	app.get('/makeParty', ph.route.get_make_party);
};

exports.io = function (socket, io) {
	ph.socket.hubIO(socket, io);
	ph.socket.clientIO(socket,io);
};


ph.route.get_index = function (req, res) {
	return res.render('index', {title: "index"});
};

ph.route.get_hub = function (req, res) {
	return res.render('hub', {title: "Party" });
};

ph.route.get_make_party = function(req, res){
	return res.render('makeParty', {title: "New Party"})
};

ph.route.get_party = function (req, res) {
	return res.render('party', {title: "Party" });
};

ph.route.get_song_test = function(req, res){
	return res.render('addSongTest', {title:"songTEST"});
};

ph.route.get_content_collapser = function(req, res) {
	return res.render('contentCollapser', {title:"contentCollapser"});
}