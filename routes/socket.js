/**
 * Created with JetBrains WebStorm.
 * User: FrancisMeng
 * Date: 14-2-8
 * Time: 上午3:37
 * To change this template use File | Settings | File Templates.
 */

var songlist =[],
latchTrack = {
  title: 'Disclosure',
  artist: 'Latch',
  upvoteCount: 10,
  downvoteCount: 0,
  albumArtworkUrl: '/resources/images/chance.jpg',
  queueNumber: 1
},
megalithicTrack = {
  title: 'Sail',
  artist: 'AWOLNATION',
  upvoteCount: 9001,
  downvoteCount: 0,
  albumArtworkUrl: 'http://upload.wikimedia.org/wikipedia/en/d/da/Awolnation-Megalithic-Symphony.jpeg',
  queueNumber: 2
};

exports.hubIO = function(socket, io){
	socket.on('hub:poll',function(data) {
		socket.emit('hub:playlist', [latchTrack, megalithicTrack]);
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
