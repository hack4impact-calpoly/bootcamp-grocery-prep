function redirect(){
	window.open("https://www.youtube.com/watch?v=oHg5SJYRHA0", '_blank');
}

var videoPlay = document.getElementById("hover-video");
videoPlay.addEventListener("click", redirect, false);