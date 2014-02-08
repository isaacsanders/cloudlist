(function($){
//  var metadata = Spotify.Metadata(),
//  engine = new Bloodhound({
//    name: 'spotify'
//  }),
//  spotifySource = function(query, cb) {
//    var searchTerm = args.delegateTarget.value;
//    metadata.search({ method: 'track', q: searchTerm }, function(res) {
//      var results = JSON.parse(res);
//      console.log(results);
//    });
//  };
//
//  engine.initialize();
//
//  $('input.newSong').typeahead({
//    minLength: 3,
//    highlight: true
//  },{
//    source: engine.ttAdapter()
//  });

  var socket = io.connect('http://localhost:5000');
  socket.on('hub:playlist', function(data){
    console.log(data);
  });
  socket.emit('hub:poll', { partyId: null });
})(jQuery);
