var db = require('./API_DB');
var geolib = require('geolib');

function Party(party){
	this.partyId = party.partyId,
	this.partyName = party.partyName,
	this.startDate = party.startDate,
	this.startTime = party.startTime,
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
	var partyWithMinDis = null;
	var minDis = 2000;
	var options = {
		endpoint:'parties'
	}
	db.request(options,function(err, parties){
		if(err){
			console.log('Get etitiies error: '+err);
		}else{
			parties = parties.entities;
			for(var i = 0;i<parties.length;i++){
				var distance = geolib.getDistance(location,parties[i].location);
				if(distance <=  minDis){
					minDis = distance;
					partyWithMinDis = parties[i];
				}
			}

			if(geolib.convertUnit('mi',minDis,2) < 0.5){
				console.log('closest party is ' + geolib.convertUnit('mi',minDis,2));
				console.log(partyWithMinDis);
				callback(partyWithMinDis);
			}else{
				callback(null);
			}

		}
	})
};
