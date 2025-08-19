console.log("Hello world")
export {};



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
window.askImage=()=>{
    getImage();
}
window.askVideoNoRange=()=>{
    enableVideoSR()
}
window.askVideo=()=>{
    enableVideo()
}