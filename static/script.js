urlInput = document.getElementById("URL-input");
downloadMP4 = document.getElementById("dmp4");
downloadMP3 = document.getElementById("dmp3");
icon = document.getElementById("icon");

downloadMP4.addEventListener("click", () => {
    if (urlInput.value) {
        icon.src = "https://www.drupal.org/files/issues/throbber_12.gif";
        window.location.replace(`/download?url=${urlInput.value}&format=mp4`);
    }
});

downloadMP3.addEventListener("click", () => {
    if (urlInput.value) {
        icon.src = "https://www.drupal.org/files/issues/throbber_12.gif";
        window.location.replace(`/download?url=${urlInput.value}&format=mp3`);
    }
});
