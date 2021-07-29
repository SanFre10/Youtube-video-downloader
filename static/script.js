urlInput    = document.getElementById("URL-input");
downloadMP4 = document.getElementById("dmp4");
downloadMP3 = document.getElementById("dmp3");
search      = document.getElementById("search");
videoId     = document.getElementById("videoId");
icon        = document.getElementById("icon");

downloadMP4.addEventListener("click", () => download("mp4"));
downloadMP3.addEventListener("click", () => download("mp3"));
search.addEventListener("click", () => {
    fetch("/search",{ 
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url:urlInput.value}),
    }).then((response) => {
        if(response.status === 200) {
            window.location.replace(response.url);
        }
    });
});

download = (format) => {
    if (urlInput.value) {
        icon.src = "https://www.drupal.org/files/issues/throbber_12.gif";
        icon.className = "progress"
        window.location.replace(`/download?url=${urlInput.value}&format=${format}`);
    }
}

var player;
function onYouTubeIframeAPIReady() {
    console.log(videoId.value);
    player = new YT.Player('player', {
    videoId: videoId.innerHTML,
    events: {
        //'onReady': onPlayerReady,
        // 'onStateChange': onPlayerStateChange
    }
    });
}

// function onPlayerReady(event) {
//   event.target.playVideo();
// }

