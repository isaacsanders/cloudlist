/**
 * Created with JetBrains WebStorm.
 * User: FrancisMeng
 * Date: 14-2-8
 * Time: 上午3:37
 * To change this template use File | Settings | File Templates.
 */

var songlist =[];

exports.hubIO = function(socket, io){
	socket.on('hub:poll',function(data) {
		socket.emit('hub:playlist', [{name: 'foo'}, {name: 'bar'}]);
	});

};

exports.clientIO = function(socket, io){
	socket.on('hub:playlist:update', function(data) {
		console.log(data.newSong);
		songlist.push(data.newSong);
		console.log(songlist);
		io.sockets.emit('client:playlist', {songList:songlist});
	});
};
