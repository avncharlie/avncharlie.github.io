window.addEventListener("resize", function () {
  sizePanels();
});

document.addEventListener('DOMContentLoaded', function () {
  sizePanels();
});

function sizePanels() {
  document.getElementById("body").style.padding = "40px";
  
  var windowHeight = window.innerHeight;
  var headerHeight = document.getElementById("header").offsetHeight;
  
  var bodyHeight = windowHeight - headerHeight - 80;
  
  document.getElementById("picture-panel").style.height = bodyHeight + "px";
  document.getElementById("descriptions").style.height = bodyHeight + "px";
}


function changePicture(element, picture) {
  element.classList.add("active");
  document.querySelector("#picture-panel img").src = "explore-pics/" + picture;
}

function removeClass(element) {
  element.classList.remove("active");
}