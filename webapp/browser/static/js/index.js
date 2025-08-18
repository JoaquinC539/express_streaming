console.log("Hello world");
function getImage() {
    fetch("http://localhost:4682/api/img")
        .then(r => r.blob())
        .then(b => {
        console.log(b); //Blob
        const url = URL.createObjectURL(b);
        const imgElem = document.getElementById("imgServ");
        imgElem.hidden = false;
        imgElem.src = url;
    });
}
function enableVideo() {
    const videoElem = document.getElementById("videoServ");
    videoElem.hidden = false;
    videoElem.src = "http://localhost:4682/api/videoSC";
    document.getElementById("askvid").disabled = true;
}
window.askImage = () => {
    getImage();
};
window.askVideo = () => {
    enableVideo();
};
export {};
