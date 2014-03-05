
function sortQueue(data) {
    // turn data into ID list
    window.trueSongList = makeIdListFromMusicObjects(data);
    console.log("HERE!!", window.trueSongList);
//    if (!window.currentSongList) {
//        window.currentSongList = window.trueSongList;
//    }
//    addAndRemoveAllExrasBasedOnIdLists(window.currentSongList, window.trueSongList, data);
//    sortObjectsBasedOnIdListAssumeNoAddsOrDeletes(window.currentSongList, window.trueSongList);
}

function makeIdListFromMusicObjects(data) {
    var i, list = [];
    for (i = 0; i < data.length; i++) {
        list.push(data[i].song.trackId);
    }
    return list;
}


function switchAdjacentDivs(id1, id2, callback) {
    // first grab elements
    var $higher, $lower, position1, position2, spaceDiff, $lowerBefore, $higherBefore;
    var $div1 = $("#"+id1),
        $div2 = $("#"+id2),
        shouldCorrectIndex = false;


    // find out higher element
    position1 = $div1.position();
    position2 = $div2.position();
    if (position1.top < position2.top) {
        $higher = $div1;
        $lower = $div2;
    }
    else {
        $higher = $div2;
        $lower = $div1;
    }

    // find out space between elements
    $lowerBefore = $("#queueContainer li:nth-child("+($higher.index()+2)+")");

    $higherBefore = $("#queueContainer li:nth-child("+($lower.index()+2)+")");
    if (!$higherBefore[0]) {
        console.log("YUP");
        $higherBefore = $("#queueContainer li:nth-child("+($lower.index()+1)+")");
        shouldCorrectIndex = true;
    }
    spaceDiff = $lower.index()-$higher.index();

    var height = spaceDiff*((($lower.outerHeight(true)-$lower.outerHeight())/2)+$lower.outerHeight());
    // animate lower element upwards above higher element
    $lower.css({"z-index":3}).animate({top: -height+"px"});
    $higher.css({"z-index":2}).animate({top: height+"px"}, switchDOM);

    // switch positions in the DOM
    function switchDOM(){
        $higher.css({top:"0", "z-index":1});
        $lower.css({top:"0", "z-index":1});

        // get elements to put switched elements BEFORE
        $lowerBefore.before($lower);
        if (shouldCorrectIndex) {
            $higherBefore.after($higher);
        }
        else {
            $higherBefore.before($higher);
        }
        if(callback){callback();};
    };
}


function sortObjectsBasedOnIdListAssumeNoAddsOrDeletes(currentList,trueList) {
    var i, j, truL, curL, switches = [];

    for (i = 0; i < currentList.length-1; i++) {
        curL = currentList[i];
        truL = trueList[i];
        if (truL != curL) {
            currentList[getIndexOfObj(currentList, truL)] = curL;
            currentList[i] = truL;
            switches.push([curL, truL]);
        }
    }
    tryNextSwitch();
    function tryNextSwitch() {
        var p = switches.shift();
        if (p) {
            switchAdjacentDivs(p[0], p[1], tryNextSwitch);
        }
    }

    function getIndexOfObj(arr, obj) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == obj) {
                return i;
            }
        }
    }
}


function addAndRemoveAllExrasBasedOnIdLists(currentList, trueList, data) {
    var i, j, truL, curL, $e, addedList=[];

    for (i = 0; i < currentList.length; i++) {
        curL = currentList[i];
        for (j = 0; j < trueList.length; j++) {
            truL = trueList[j];
            if (truL == curL) {
                trueList[j]=-1;
                break;
            }
            else if(j == trueList.length-1) {
                // remove
                $e = $("#"+curL);
                $e.animate({opacity: 0, height: 0}, 500, function(){
                    $(this).remove();
                });
            }
        }
    }

    var song;
    for (j = 0; j < trueList.length; j++) {
        console.log("J", trueList[j]);
        if (trueList[j] != -1) {
            console.log("NOPE");
            // add
            song = "<li class='songContainer'>" +
                "<img class='queueAlbum' src='' />" +
                "<p class='upVotes'></p>" +
                "<img class='thumbUp' src=''/>" +
                "<p class='songTitle'></p>" +
                "<p class='downVotes'></p>" +
                "<img class='thumbDown' src='' />" +
                "<img class='deleteButton' src='' /></li>"

            $("#queueContainer div:nth-child("+(currentList.length)+")").after(song);
        }
    }
}
