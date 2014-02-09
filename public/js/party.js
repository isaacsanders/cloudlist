(function($){
  $(document).ready(function(){
    var clientId = "d215739bac728e0fe1a2c2342f83c3ad";
    SC.initialize({
      client_id: clientId
    });
    var socket = io.connect('http://trackwav.com'),
    songTemplate = Handlebars.compile($(".songTemplate").text()),
    suggestionTemplate = Handlebars.compile($(".suggestionTemplate").text());

    socket.on('client:playlist', function(data){
      var musicList = [];
      for(var i = 0; i<data.length;i++){
        musicList.push(data[i].song);
      }

      var playlistHtml = $.map(musicList, function(track) {
        return songTemplate(track);
      }).join('');
      $('#queueContainer').html(playlistHtml);
    });

    socket.on('client:nowPlaying', function(song) {
      SC.get("/tracks/"+song.trackId, function(sound) {
        duration = Math.floor(sound.duration / 1000);
      });
      $('#mainPlayer .playerAlbum').attr('src', song.albumArtworkUrl);
      $('#mainPlayer .songInfo').text(song.title+" - "+song.artist);
      window.updatePlayerState(0, duration, true);
    });

	  $(document).on('touchstart click', 'button.addSong', function(data){
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
    socket.emit('client:poll', { partyId: null });
  });
})(jQuery);
