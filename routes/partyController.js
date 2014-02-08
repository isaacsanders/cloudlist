ph = ph||{};
ph = ph


exports.get_party = function(req, res){
	return res.render('party', {title: "Party" });
};

exports.get_make_party = function(req, res){
	return res.render('makeParty', {title: "New Party"});
};

exports.post_make_party = function(req, res){
	req.body
};

var get_location = function(location){

}