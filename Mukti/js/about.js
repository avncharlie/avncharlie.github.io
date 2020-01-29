window.addEventListener("resize", function () {
  sizePanels();
});

document.addEventListener('DOMContentLoaded', function () {
  sizePanels();
});

function sizePanels() {
  var bodyContentWidth = document.querySelector("h1").offsetWidth;
  
  var images = document.querySelectorAll("#body img");
  
  for (var i = 0; i < images.length; i++) {
    if (images[i].clientWidth <= bodyContentWidth) {
      images[i].style.height = "auto";
    } 
    if (images[i].clientHeight >= 325) {
      images[i].style.height = "325px";
    };
  };
}

window.setInterval(function(){
  sizePanels();
}, 200);