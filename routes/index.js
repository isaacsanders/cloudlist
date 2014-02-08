/*
 * GET home page.
 */
var ph = ph || {};
ph.route = ph.route || {};



exports.route = function(app){
	app.get('/', ph.route.get_index);
    app.get('/hub', ph.route.get_hub);
	app.get('/party', ph.route.get_party);
};

exports.io = function(socket){
  socket.on('hub:poll', function(data) {
    socket.emit('hub:playlist', [{name: 'foo'}, {name: 'bar'}]);
  });

  socket.on('hub:playlist:update', function(data) {
    socket.emit('client:playlist', data);
  });

  socket.on('client:poll', function(data) {
    socket.emit('client:playlist', [{name: 'foo'}, {name: 'bar'}]);
  });
};


ph.route.get_index = function(req, res){
	return res.render('index', {title:"index"});
};

ph.route.get_hub = function(req, res) {
  return res.render('hub', {title: "PartyHub Party" });
};

ph.route.get_party = function(req, res) {
	return res.render('party', {title: "PartyHub Party" });
}
