function Party(party){
	this.partyId = party.partyId,
	this.partyName = party.partyName,
	this.startDateTime = party.starteDateTime
	this.location = party.location,
	this.duration = party.duration,
	this.queueId = party.queueId
}

module.exports = Party;

