$(document).ready(function() {
    checkLocationForClosestParty();
	$("h1, h2, h2 p, input").fadeIn(2000);
});


function checkLocationForClosestParty() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (coords) {
			// make ajax post request with lat and long
			console.log(coords);
			$.ajax({
				type: "POST",
				url: "/joinParty",
				data: JSON.stringify({latitude: coords.coords.latitude, longitude: coords.coords.longitude}),
				dataType: "json",
				contentType: 'application/json',
				success: successfullyFoundLocation,
				error: errorFindingLocation
			});
		}, errorFindingLocation);
	}
	else {
		errorFindingLocation(); // browser does not support geolocation
	}
}


function successfullyFoundLocation(data) {
	console.log(data);
	if (data.party.streetAddr && data.party.name && data.party.uuid) {
		// then load that data into first option
		$("h1").text("Is This Your Party?");
		$("h2").html("OR</br>Ask the host for the ID");

		$('#foundParty').append('<ul><a href="/party"><li id = "partyName"><button id="submitBtn1" class="flat-button flat-button-2" type="button">'+data.party.name+'<br/><p class="little">'+data.party.streetAddr+'</p></button></li>');
		$("#foundParty").fadeIn(1000);
	}
	else {
		errorFindingLocation(); // could not match your location with close enough party
	}

}


function errorFindingLocation() {
    // then load join party page with the enter an ID option already open
    $("h1").text("Sorry...We Could Not Find Your Nearby Party");
	$("h2").text("Ask the host for the ID");
}