console.log("Hello world")


function getImage(){
fetch("http://localhost:4682/api/img")
.then(r=>r.blob())
.then(b=>{
    console.log(b); //Blob
    const url = URL.createObjectURL(b);
    const imgElem=document.getElementById("imgServ") as HTMLImageElement;
    imgElem.hidden=false
    imgElem.src=url
    })
}
function enableVideoSR(){
    const videoElem=document.getElementById("videoServS") as HTMLVideoElement;
    videoElem.hidden=false;
    videoElem.src="http://localhost:4682/api/videoSC";
    (document.getElementById("askvidS") as HTMLButtonElement)!.disabled=true;
}
function enableVideo(){
    const videoElem=document.getElementById("videoServ") as HTMLVideoElement;
    videoElem.hidden=false;
    videoElem.src="http://localhost:4682/api/videoSCR";
    (document.getElementById("askvid") as HTMLButtonElement)!.disabled=true;
}
function enableVideoHls(){
    const videoElem=document.getElementById("videoHls") as HTMLVideoElement;
    videoElem.hidden=false;
    
    if(window.Hls.isSupported()){
        const hls = new window.Hls();
        hls.loadSource("http://localhost:4682/api/videoHls/playlist.m3u8");
        hls.attachMedia(videoElem);
        
    }else if(videoElem.canPlayType("application/vnd.apple.mpegurl")){
        videoElem.src="http://localhost:4682/api/videoHls/playlist.m3u8";
    }

    (document.getElementById("askvidHls") as HTMLButtonElement)!.disabled=true;
}
window.askImage=()=>{
    getImage();
}
window.askVideoNoRange=()=>{
    enableVideoSR()
}
window.askVideo=()=>{
    enableVideo()
}
window.askvideoHls=()=>{
    enableVideoHls();
}