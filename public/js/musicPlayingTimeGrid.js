
$(document).ready(initializePlayer);

function initializePlayer() {
    // grab elements
    var $musicPlayingTimeGrid = $("#musicPlayingTimeGrid"),
        $startTime = $("#startTime"),
        $endTime = $("#endTime"),
        $progressed = $("#progressed"),
        $remaining = $("#remaining"),
        $track = $("#track");

    window.songTime = {progress:0, overall: 0, barStep: 0};

    // update player state
    window.updatePlayerState = (function(progressed, overallLength, isPlaying) {

        if (progressed >= 0 && overallLength >= 0) {
            var barStep = Math.floor($track.width()/overallLength);
            window.songTime = {progress: progressed, overall: overallLength, barStep: barStep};
        }
        // set progress bar
        $progressed.css("width", window.songTime.barStep*window.songTime.progress+"px");
        $remaining.css("width", window.songTime.barStep*(window.songTime.overall-window.songTime.progress)+"px");

        if (isPlaying) {
            window.songPlayerInterval = setInterval(incrementSongTrack, 1000);
        }
        else {
            window.clearInterval(window.songPlayerInterval);
        }
    });

    window.updatePlayerState(0, 200, true);

    function incrementSongTrack() {
        var startTime = window.songTime.progress,
            endTime = window.songTime.overall - window.songTime.progress++;

        if (endTime <= 0) {
            window.updatePlayerState(0, 0, false);
        }
        else {
            //increment progress bar animation
            $progressed.css("width", (window.songTime.progress*window.songTime.barStep)+"px");
            $remaining.css("width", (window.songTime.overall-window.songTime.progress)*window.songTime.barStep+"px");
        }
        $startTime.text(convertSecondsToSongTime(startTime));
        $endTime.text(convertSecondsToSongTime(endTime));
    }

}

function convertSecondsToSongTime(seconds) {
    var minutes = Math.floor(seconds/60),
        seconds = seconds%60;

    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return minutes+":"+seconds;
}