(function($){
  $(document).ready(function(){
    var socket = io.connect('http://localhost:5000'),
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

    socket.emit('client:poll', { partyId: null });
  });
})(jQuery);
