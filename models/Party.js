var db = require('API_DB');

function Party(party){
	this.partyId = party.partyId,
	this.partyName = party.partyName,
	this.startDateTime = party.starteDateTime
	this.location = party.location,
	this.streetAddr = party.streetAddr,
	this.duration = party.duration,
	this.queueId = party.queueId
}

module.exports = Party;

Party.save = function(party, callback){
	db.createEntity(party, function(err, party){
		if(!err){
			party.save(function(err){
				if(err){
					return callback(err);
				}else{
					return callback(err, party);
				}
			});
		}
	});
};

Party.get_party_with_location = function(location, callback){

};
