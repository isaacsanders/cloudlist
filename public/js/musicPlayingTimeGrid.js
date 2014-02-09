
$(document).ready(initializePlayer);

function initializePlayer() {
  // grab elements
  var $musicPlayingTimeGrid = $("#musicPlayingTimeGrid"),
  $startTime = $("#startTime"),
  $endTime = $("#endTime"),
  $progressed = $("#progressed"),
  $remaining = $("#remaining"),
  $track = $("#track");

  window.songTime = {progress:0, overall: 0};

  // update player state
  window.updatePlayerState = (function(progressed, overallLength, isPlaying) {

    if (progressed >= 0 && overallLength >= 0) {
      window.songTime = {progress: progressed, overall: overallLength};
    }

    if (isPlaying) {
      window.songPlayerInterval = setInterval(incrementSongTrack, 1000);
    }
    else {
      window.clearInterval(window.songPlayerInterval);
    }
  });

  function incrementSongTrack() {
    var startTime = window.songTime.progress,
    endTime = window.songTime.overall - window.songTime.progress++;

    if (endTime <= 0) {
      window.updatePlayerState(0, 0, false);
    }
    else {
      //increment progress bar animation
      var percentProgress = 0.9*Math.floor((window.songTime.progress/window.songTime.overall)*10000)/100;
      $progressed.css("width", percentProgress+"%");
      $remaining.css("width", (90-percentProgress)+"%");
    }
    $startTime.text(convertSecondsToSongTime(startTime));
    $endTime.text(convertSecondsToSongTime(endTime));
  }
}

function convertSecondsToSongTime(time) {
  var minutes = Math.floor(time/60),
  seconds = time % 60;

  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return minutes+":"+seconds;
}
