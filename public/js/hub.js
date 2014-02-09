(function($){
  var clientId = "d215739bac728e0fe1a2c2342f83c3ad";
  streamable = function(track) { return track.streamable; };
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
      var duration;
      if (!window.song) {
        if (songlist.length > 0) {
         var singleSong = songlist.shift();
         window.song = singleSong.song;
          socket.emit('hub:playlist:dequeue', null);
          SC.get("/tracks/"+window.song.trackId, function(sound) {
            duration = Math.floor(sound.duration / 1000);
          });
          $('#mainPlayer .playerAlbum').attr('src', window.song.albumArtworkUrl);
          $('#mainPlayer .songInfo').text(window.song.title+" - "+window.song.artist);
          window.updatePlayerState(0, duration, true);
        } else {
          // Currently, do nothing if there are no songs
        }
      } else {
        if (!window.isPlaying) {
          SC.get("/tracks/"+window.song.trackId, function(sound) {
            duration = Math.floor(sound.duration / 1000);
          });
          var playSong, pauseSong;
          SC.stream("/tracks/"+window.song.trackId, {
            autoPlay: true,
            onfinish: function() {
              $('.playButton').toggleClass('playButton pauseButton');
              window.song = null;
              window.isPlaying = false;
              $('#mainPlayer .playerAlbum').attr('src', '/resources/images/missing.png');
              $('#mainPlayer .songInfo').text('no songs in queue');
              $('.admin').unbind('click', pauseSong);
              $('.admin').unbind('click', playSong);
              socket.emit('hub:poll');
            }
          }, function(sound) {
            window.isPlaying = true;
            playSong = function playSong() {
              $('.playButton').toggleClass('pauseButton playButton');
              window.updatePlayerState(window.songTime.position, duration, true);
              if (sound.paused) {
                sound.resume();
              } else {
                sound.play();
              }
              window.isPlaying = true;
            },
            pauseSong = function pauseSong() {
              $('.pauseButton').toggleClass('playButton pauseButton');
              window.updatePlayerState(window.songTime.position, duration, false);
              sound.pause();
              window.isPlaying = false;
            };
            window.updatePlayerState(0, duration, true);
            socket.emit('hub:nowPlaying', window.song);
            $('.admin').on('click', '.playButton', playSong);
            $('.admin').on('click', '.pauseButton', pauseSong);
            $('.admin').on('click', '.skipButton', function() {
              $('.playButton').toggleClass('playButton pauseButton');
              sound.stop();
              window.song = null;
              window.isPlaying = false;
              $('#mainPlayer .playerAlbum').attr('src', '/resources/images/missing.png');
              $('#mainPlayer .songInfo').text('no songs in queue');
              $('.admin').unbind('click', pauseSong);
              $('.admin').unbind('click', playSong);
              socket.emit('hub:poll');
            });
          });
        }
      }
//       SC.stream("/tracks/"+window.song.trackId, {
//         autoPlay: window.isPlaying,
//         onfinish: function() {
//           if (songlist.length > 0) {
//             window.song = songlist.shift();
//             window.isPlaying = true;
//           } else {
//             window.isPlaying = false;
//           }
//         }
//       }, function(sound) {
//         $('.admin').on('click', '#playButton', function() {
//           if (!window.isPlaying) {
//             window.updatePlayerState(window.songTime.progress, duration, true);
//             sound.play();
//             window.isPlaying = true;
//           }
//         });
//       });

      var musicList= [];
      for(var i =0; i< songlist.length;i++){
        musicList.push(songlist[i].song);
      }

      var playlistHtml = $.map(musicList, function(track) {
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
