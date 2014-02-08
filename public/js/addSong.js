(function($){
	$(document).ready(function(){
		var socket = io.connect('http://localhost:5000');
		socket.on('hub:playlist', function(data){
			console.log(data);
		});
		console.log('haha');
		$('button.submit').click(function(){
			var value = $('input.newSong').val();
			console.log(value);
			socket.emit('hub:playlist:update', {newSong:value});
		});
	})

})(jQuery);
