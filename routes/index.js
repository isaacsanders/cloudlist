/*
 * GET home page.
 */
var ph = ph || {};
ph.route = ph.route || {};
ph.file_import = ph.file_import || {};
ph.socket = require('./socket');

ph.file_import.party_control = require('./partyController');

exports.route = function (app) {
	app.get('/', ph.route.get_landing);
	app.get('/hub', ph.route.get_hub);
	app.get('/party', ph.route.get_party);
	app.get('/addSongTest', ph.route.get_song_test);
	app.get('/joinParty', ph.route.get_join_party);
	app.get('/contentCollapser', ph.route.get_content_collapser);
	app.get('/makeParty', ph.route.get_make_party);
	app.get('/landing', ph.route.get_landing);
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
	return ph.file_import.party_control.get_make_party(req, res);
};

ph.route.get_landing = function(req, res){
	return res.render('landing', {title:"PartyHub"});
};

ph.route.get_party = function (req, res) {
	return ph.file_import.party_control.get_party(req, res);
};

ph.route.get_song_test = function(req, res){
	return res.render('addSongTest', {title:"songTEST"});
};

ph.route.get_content_collapser = function(req, res) {
	return res.render('contentCollapser', {title:"contentCollapser"});
}

ph.route.get_join_party = function(req, res) {
	return res.render('joinParty', {title:"Join A Party"});
}