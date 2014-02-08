/*
 * GET home page.
 */
var ph = ph || {};
ph.route = ph.route || {};



exports.route = function(app){
	app.get('/', ph.route.get_index);
  app.get('/hub', ph.route.get_hub);
};

ph.route.get_index = function(req, res){
	return res.render('index', {title:"index"});
};

ph.route.get_hub = function(req, res) {
  return res.render('hub', {title: "PartyHub Party" });
};
