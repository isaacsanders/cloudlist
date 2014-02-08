/**
 * Created with JetBrains WebStorm.
 * User: FrancisMeng
 * Date: 14-2-8
 * Time: 上午3:37
 * To change this template use File | Settings | File Templates.
 */

var latchTrack = {
  title: 'Disclosure',
  trackId: 0,
  artist: 'Latch',
  upvoteCount: 10,
  downvoteCount: 0,
  albumArtworkUrl: '/resources/images/chance.jpg',
  queueNumber: 1
},
megalithicTrack = {
  title: 'Sail',
  trackId: 1,
  artist: 'AWOLNATION',
  upvoteCount: 9001,
  downvoteCount: 0,
  albumArtworkUrl: 'http://upload.wikimedia.org/wikipedia/en/d/da/Awolnation-Megalithic-Symphony.jpeg',
  queueNumber: 2
},
songlist =[latchTrack, megalithicTrack];

exports.hubIO = function(socket, io){
	socket.on('hub:poll',function(data) {
		socket.emit('hub:playlist', songlist);
	});

};

exports.clientIO = function(socket, io){
	socket.on('hub:playlist:update', function(song) {
		songlist.push(song);
    song.queueNumber = songlist.length;
    socket.emit('hub:playlist', songlist);
		io.sockets.emit('client:playlist', {songlist:songlist});
	});
};
