(function($){
  $(document).ready(function(){
    var socket = io.connect('http://localhost:5000'),
    songTemplate = Handlebars.compile($(".songTemplate").text()),
    suggestionTemplate = Handlebars.compile($(".suggestionTemplate").text());

    socket.on('client:playlist', function(data){
      var playlistHtml = $.map(data, function(track) {
        return songTemplate(track);
      }).join('');
      $('#queueContainer').html(playlistHtml);
    });

    socket.emit('client:poll', { partyId: null });
  });
})(jQuery);
