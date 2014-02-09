var db = require('./API_DB');

function Party(party){
	this.partyId = party.partyId,
	this.partyName = party.partyName,
	this.startDate = party.startDate,
	this.startTime = party.starteTime,
	this.endTime = party.endTime,
	this.location = party.location,
	this.streetAddr = party.streetAddr,
	this.queueId = party.queueId
}

module.exports = Party;

Party.prototype.save = function(callback){
	var party = {
		type:"parties",
		name:this.partyName,
		startDate:this.startDate,
		startTime: this.startTime,
		endTime: this.endTime,
		location:this.location,
		streetAddr:this.streetAddr
	};
	console.log("party Info" + JSON.stringify(party));
	console.log(db);
	db.createEntity(party, function(err, party){
		if(!err){
			party.save(function(err){
				if(err){
					return callback(err);
				}else{
					return callback(err, party);
				}
			});
		}else{
			console.log("etitiy creation error: " + err);
		}
	});
};

Party.get_party_with_location = function(location, callback){

};
