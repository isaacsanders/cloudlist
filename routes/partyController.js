var ph = ph || {};
ph.party_control = ph.party_control || {}


exports.get_party = function (req, res) {
	return res.render('party', {title: "Party" });
};

exports.get_make_party = function (req, res) {
	return res.render('makeParty', {title: "New Party"});
};

exports.post_make_party = function (req, res) {
	var streetAddr = req.body.streetAddr;
	var zipCode = req.body.zipCode;
	var location = ph.party_control.get_location({streetAddr: streetAddr, zipCode: zipCode});

};

ph.party_control.get_location = function (location) {

};