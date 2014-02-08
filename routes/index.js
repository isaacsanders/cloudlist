/*
 * GET home page.
 */
var ph = ph || {};
ph.route = ph.route || {};



exports.route = function(app){
	app.get('/', ph.route.get_index);
}

ph.route.get_index = function(req, res){
	return res.render('index', {title:"index"});
}