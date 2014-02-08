(function($){
	$(document).ready(function(){
		var socket = io.connect('http://localhost:5000');
		console.log('haha');
		socket.on('client:playlist', function(data){
			console.log(data.songList);
			$('.songName').remove();
			$('.songContainer').remove();
			for(var i = 0; i <data.songList.length;i++){
				$('#musicPane').append('<p class = "songName">'+data.songList[i].name+'</p>');

				$('#queueContainer').append('<div class="songContainer"><div class="queueNumber">'+(i+1)+'</div><img class="queueAlbum" src="/resources/images/chance.jpg" /><p class="upVotes">'+'10'+'</p><img class="thumbUp" src="/resources/images/thumbUp.svg" /><p class = "songTitle">'+data.songList[i].name+'</p><p class="downVotes">'+'0'+'</p><img class="thumbDown" src="/resources/images/thumbDown.svg" /></div></div>');
			}

		});

		socket.emit('client:poll', { partyId: null });
	})

})(jQuery);
