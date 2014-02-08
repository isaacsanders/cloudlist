/**
 * Created with JetBrains WebStorm.
 * User: FrancisMeng
 * Date: 14-2-8
 * Time: 上午3:37
 * To change this template use File | Settings | File Templates.
 */

var songlist = [];

exports.hubIO = function(socket, io){
	socket.on('hub:poll',function(data) {
		socket.emit('hub:playlist', songlist);
	});

};

exports.clientIO = function(socket, io){
  socket.on('client:poll', function(data) {
    socket.emit('client:playlist', songlist);
  });
	socket.on('hub:playlist:update', function(song) {
		songlist.push(song);
    song.queueNumber = songlist.length;
    socket.emit('hub:playlist', songlist);
		io.sockets.emit('client:playlist', songlist);
	});
};
