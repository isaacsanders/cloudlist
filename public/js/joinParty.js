
$(document).ready(function() {
    checkLocationForClosestParty();
});


function checkLocationForClosestParty() {
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(coords) {
            // make ajax post request with lat and long
            $.ajax({
                type: "POST",
                url: "/joinParty",
                data: {"latitude": coords.latitude, "longitude":coords.longitude},
                success: successfullyFoundLocation,
                dataType: "script",
                error: errorFindingLocation
            });
        }, errorFindingLocation);
    }
    else{
       errorFindingLocation(); // browser does not support geolocation
    }
}


function successfullyFoundLocation(data) {
    if (data.streetName && data.partyName && data.partyId) {
        // then load that data into first option
    }
    else {
        errorFindingLocation(); // could not match your location with close enough party
    }

}


function errorFindingLocation() {
    // then load join party page with the enter an ID option already open
    
}