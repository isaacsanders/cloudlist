
$(document).ready(setupTextCollapsers);

// Setup event listeners
function setupTextCollapsers() {
  $("#contentCollapser div").each(function(index) {
        var $content = $(".collContent", this).attr("id", "textContent_" + index);
        $("span", this).click(function() {
            $(this).toggleClass("selected");
            tryToOpenContent($content);
        }).append("<img src='/resources/images/turnArrow.svg' />");
  });
}

function tryToOpenContent($content) {
    $content.stop(true).animate({
        height: "toggle",
        opacity: "toggle"
    }, 500);
    var $img = $("img", $content.prev("h2"));

    if ($content.hasClass("isOpen")) {
        $img.animateRotate(360, 450, "linear");
    }
    else {
        $img.animateRotate(180, 450, "linear");
    }
    $content.toggleClass("isOpen");
}

$.fn.animateRotate = function(angle, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
        args.step = function(now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(this, arguments);
        };

        $({deg:angle}).animate({deg: angle+180}, args);
    });
};