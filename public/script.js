urlInput = document.getElementById("URL-input");
downloadMP4 = document.getElementById("dmp4");
downloadMP3 = document.getElementById("dmp3");
error = document.getElementById("error");

downloadMP4.addEventListener('click', () => {
    redirect("mp4");
});

downloadMP3.addEventListener('click', () => {
    redirect("mp3");
});

function redirect(format){
    console.log("hola");
    if(urlInput.value != ""){
        window.location.href = `/download?url=${urlInput.value}&format=${format}`
    }
}
