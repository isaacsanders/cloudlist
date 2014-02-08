
$(document).ready(function() {
    // initialize
    // grab elements
    var $musicPane = $("#musicPane"),
        $musicSlider = $("#musicSlider"),
        $picturePane = $("#picturePane"),
        $pictureSlider = $("#pictureSlider"),
        isToggled = {music:false, pictures:false};

    // attach event handlers
    $musicSlider.click(toggleMusicPane);
    $pictureSlider.click(togglePicturePane);

    function toggleMusicPane(e) {
        if (isToggled.music) {
            $musicPane.stop(true, true).hide("slide", {direction: "left"}, 500);
            $pictureSlider.stop(true, true).show("slide", {direction: "right"}, 500);
        }
        else {
            $musicPane.stop(true, true).show("slide", {direction: "left"}, 500);
            $pictureSlider.stop(true, true).hide("slide", {direction: "right"}, 500);
        }
        isToggled.music = !isToggled.music;
    }

    function togglePicturePane(e) {
        if (isToggled.pictures) {
            $picturePane.stop(true, true).hide("slide", {direction: "right"}, 500);
            $musicSlider.stop(true, true).show("slide", {direction: "left"}, 500);
        }
        else {
            $picturePane.stop(true, true).show("slide", {direction: "right"}, 500);
            $musicSlider.stop(true, true).hide("slide", {direction: "left"}, 500);
        }
        isToggled.pictures = !isToggled.pictures;
    }
});