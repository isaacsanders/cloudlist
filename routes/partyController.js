var geocoder = require('geocoder');
var Party = require('../models/Party');

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
	geocoder.geocode(streetAddr, function ( err, data ) {
		console.log(data.results[0].geometry.location);
		var location =  data.results[0].geometry.location;

	var partyName = req.body.partyName;
	var startDate = req.body.date.replace(/-/g,"/");
	var startTime = req.body.startTime;
	var endTime = req.body.endTime;
	var partyInfo = {
		partyName:partyName,
		startDate:startDate,
		startTime: startTime,
		endTime: endTime,
		location:location,
		streetAddr:streetAddr
	};
	console.log(partyInfo);
	var newParty = new Party(partyInfo);
	newParty.save(function(err, party){
		if(err){
			console.log(err);
		}else{
			console.log(party);
		}
	});
	});
};

ph.party_control.get_location = function (location) {

};