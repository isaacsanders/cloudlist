function Party(party){
	this.partyId = party.partyId,
	this.partyName = party.partyName,
	this.startDateTime = party.starteDateTime
	this.location = party.location,
	this.duration = party.duration,
	this.queueId = party.queueId
}

module.exports = Party;

Party.save = function(party, callback){

};

Party.get_party_with_location = function(location, callback){

}
