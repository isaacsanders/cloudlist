(function($){
  var clientId = "d215739bac728e0fe1a2c2342f83c3ad";
  streamable = function(track) { return track.streamable; };
  SC.initialize({
    client_id: clientId
  });
  $(document).ready(function(){
    var songTemplate = Handlebars.compile($(".songTemplate").text()),
    playerTemplate = Handlebars.compile($(".playerTemplate").text()),
    suggestionTemplate = Handlebars.compile($(".suggestionTemplate").text()),
    engine = new Bloodhound({
      datumTokenizer: function(datum) { return Bloodhound.tokenizers.whitespace(datum); },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      name: "soundcloud",
      remote: {
        url :"http://api.soundcloud.com/tracks?q=%QUERY&client_id="+clientId+"&format=json&_status_code_map[302]=200",
        filter: function(tracks) {
          streamableTracks = tracks.filter(streamable);
          return $.map(streamableTracks, function(track) {
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

    socket.on('hub:playlist', function(songlist){
      if (!window.song) {
        if (songlist.length > 0) {
          window.song = songlist.shift();
          socket.emit('hub:playlist:dequeue', null);
          var duration;
          SC.get("/tracks/"+window.song.trackId, function(sound) {
            duration = Math.floor(sound.duration / 1000);
          });
          $('#mainPlayer').html(playerTemplate(window.song));
          window.updatePlayerState(0, duration, true);
        } else {
          // Currently, do nothing if there are no songs
        }
      } else {
        if (window.progress > 0) {
        } else {
          $('.admin').on('click', '#playButton', function(){
            $('#playButton').toggle();
            $('#pauseButton').toggle();
            SC.stream("/tracks/"+window.song.trackId, function(sound) {
              console.log(sound);
              sound.play();
              socket.emit('hub:nowPlaying', window.song);
              $('.admin').on('click', '#playButton', function() {
                $('#playButton').toggle();
                window.updatePlayerState(window.songTime.progress, duration, true);
                $('#pauseButton').toggle();
                sound.play();
              });
              $('.admin').on('click', '#pauseButton', function() {
                $('#pauseButton').toggle();
                window.updatePlayerState(window.songTime.progress, duration, false);
                $('#playButton').toggle();
                sound.pause();
              });
            });
          });
        }
      }

      var playlistHtml = $.map(songlist, function(track) {
        return songTemplate(track);
      }).join('');
      $('#queueContainer').html(playlistHtml);
    });

    $(document).on('click', 'button.addSong', function(data){
      var trackId = $(data.target).data('track-id');
      SC.get('/tracks/'+trackId.toString(), null, function(track) {
        var song = {
          title: track.title,
          trackId: track.id,
          artist: track.user.username,
          albumArtworkUrl: track.artwork_url || "/resources/images/missing.png",
          upvoteCount: 0,
          downvoteCount: 0
        };
        socket.emit('hub:playlist:enqueue', song);
      });
    });

    socket.emit('hub:poll', { partyId: null });
  });
})(jQuery);
