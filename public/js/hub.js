(function(){
  var socket = io.connect('http://localhost:5000');
  socket.on('hub:playlist', function(data){
    console.log(data);
  });
})();
