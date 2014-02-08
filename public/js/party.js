(function($){
	$(document).ready(function(){
		var socket = io.connect('http://localhost:5000');
		console.log('haha');
		socket.on('client:playlist', function(data){
			console.log(data.songList);
			$('.songName').remove();
			for(var i = 0; i <data.songList.length;i++){

				$('#musicPane').append('<p class = "songName">'+data.songList[i].name+'</p>');
			}

		});

		socket.emit('client:poll', { partyId: null });
	})

})(jQuery);
