(function($){
  $(document).ready(function(){
    var engine = new Bloodhound({
      datumTokenizer: function(datum) { return Bloodhound.tokenizers.whitespace(datum); },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      name: "soundcloud",
      remote: {
        url :"http://api.soundcloud.com/tracks?q=%QUERY&client_id=d215739bac728e0fe1a2c2342f83c3ad&format=json&_status_code_map[302]=200",
        filter: function(tracks) {
          return $.map(tracks, function(track) {
            return {
              name: track.title,
              value: track.title,
              artist: track.user.username
            };
          });
        }
      }
    });

    engine.initialize();

    var templates = {
      empty: Handlebars.compile("<li>No Results</li>"),
      footer: Handlebars.compile("</ul>"),
      header: Handlebars.compile("<ul>"),
      suggestion: Handlebars.compile("<li><i>{{name}}</i> by {{artist}}</li>")
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
    });
    socket.emit('hub:poll', { partyId: null });
  });
})(jQuery);
