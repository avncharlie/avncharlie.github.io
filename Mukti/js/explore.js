window.addEventListener("resize", function () {
  sizePanels();
});

document.addEventListener('DOMContentLoaded', function () {
  sizePanels();
});

function sizePanels() {
  document.getElementById("body").style.padding = "40px";
  
  var viewportRatio = window.innerHeight / window.innerWidth;
  console.log(viewportRatio);
  
  // keep panels in aspect ratio
  var ratio;
  if (viewportRatio > 2) {
    ratio = 1.9;
  } else if (viewportRatio > 1) {
    ratio = 1.5;
  } else {
    ratio = 1.1;
  }
  var width = document.getElementById("picture-panel").offsetWidth;
  var newHeight = width * ratio;
  document.getElementById("picture-panel").style.height =  newHeight + "px";
  document.getElementById("descriptions").style.height = newHeight + "px";
  
  // vertically center container
  var containerHeight = document.getElementById("body").offsetHeight;
  document.getElementById("body").style.padding = containerHeight/2 - newHeight/2 + "px 40px";
}