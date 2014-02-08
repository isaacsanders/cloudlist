(function($){
  var clientId = "d215739bac728e0fe1a2c2342f83c3ad";
  SC.initialize({
    client_id: clientId
  });
  $(document).ready(function(){
    var songTemplate = Handlebars.compile($(".songTemplate").text()),
    suggestionTemplate = Handlebars.compile($(".suggestionTemplate").text()),
    engine = new Bloodhound({
      datumTokenizer: function(datum) { return Bloodhound.tokenizers.whitespace(datum); },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      name: "soundcloud",
      remote: {
        url :"http://api.soundcloud.com/tracks?q=%QUERY&client_id="+clientId+"&format=json&_status_code_map[302]=200",
        filter: function(tracks) {
          return $.map(tracks, function(track) {
            return {
              title: track.title,
              trackId: track.id,
              artist: track.user.username,
              albumArtworkUrl: track.artwork_url || "/resources/images/missing.png"
            };
          });
        }
      }
    });

    engine.initialize();

    var templates = {
      suggestion: suggestionTemplate
    };

    $('input.newSong').typeahead({
      minLength: 3,
      highlight: true
    },{
      source: engine.ttAdapter(),
      templates: templates
    });


    var socket = io.connect('http://localhost:5000');
    socket.on('hub:playlist', function(data){
      var playlistHtml = $.map(data, function(track) {
        return songTemplate(track);
      }).join('');
      $('#queueContainer').html(playlistHtml);
    });

    // socket.on('hub:player', function(data){
    // });

    $(document).on('click', 'button.addSong', function(data){
      var trackId = $(data.target).data('track-id');
      SC.get('/tracks/'+trackId.toString(), null, function(track) {
        var song = {
          title: track.title,
          trackId: track.id,
          artist: track.user.username,
          albumArtworkUrl: track.artwork_url,
          upvoteCount: 0,
          downvoteCount: 0
        };
        socket.emit('hub:playlist:update', song);
      });
    });

    socket.emit('hub:poll', { partyId: null });
  });
})(jQuery);
