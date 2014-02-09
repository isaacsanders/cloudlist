/**
 * Created with JetBrains WebStorm.
 * User: FrancisMeng
 * Date: 14-2-8
 * Time: 上午3:37
 * To change this template use File | Settings | File Templates.
 */

var priorityCal = require('./priorityCalculator');
var prioritySort = require('./prioritySort');
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
	socket.on('hub:playlist:enqueue', function(song) {
		var singleSong = {};
		singleSong.song = song;
		singleSong.criteria = {};
		singleSong.criteria.upvote = 0;
		singleSong.criteria.downvote = 0;
		singleSong.criteria.adminupvote = 0;
		singleSong.criteria.starvation = 0;
		singleSong.criteria.timeStack = 0
		console.log(singleSong);
		for(var i = 0; i < songlist.length; i++){
			songlist[i].criteria.timeStack++;
		}
		songlist.push(singleSong);
		songlist = prioritySort(songlist);
    socket.emit('hub:playlist', songlist);
		io.sockets.emit('client:playlist', songlist);
	});
	socket.on('hub:playlist:dequeue', function() {
		songlist.shift();
    console.log(songlist);
    socket.emit('hub:playlist', songlist);
		io.sockets.emit('client:playlist', songlist);
	});
  socket.on('hub:nowPlaying', function(song) {
    io.sockets.emit('client:nowPlaying', song);
  });
};
