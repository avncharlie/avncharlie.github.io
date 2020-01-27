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
  
  var bodyHeight = windowHeight - headerHeight;
  
  
  if (window.innerWidth <= 1000) {
    document.getElementById("content-container").style.margin = 40 + "px";
    document.getElementById("collage").style.width = document.getElementById("body").offsetWidth - 80 + "px";
    document.getElementById("content").style.width = document.getElementById("body").offsetWidth - 80 + "px";
    
    document.getElementById("content").style.height = "auto"; 
    
    document.getElementById("collage").style.height = document.getElementById("collage").offsetWidth + "px";
    console.log(document.getElementById("collage").offsetWidth);
    
    document.getElementById("body").style.height = "auto";
  } else if (window.innerWidth <= 1100) {
    document.getElementById("content").style.width = 450 + "px";
    document.getElementById("content-container").style.margin = 35 + "px";
  } else if (window.innerWidth <= 1280) {
    document.getElementById("content").style.width = 500 + "px";
    document.getElementById("content-container").style.margin = 50 + "px";
  }  else {
    document.getElementById("content").style.width = 568 + "px";
    document.getElementById("content-container").style.margin = 70 + "px";
  }
  
  if (window.innerWidth > 1000) {
    document.getElementById("collage").style.width = document.getElementById("body").offsetWidth - document.getElementById("content").offsetWidth - 80 + "px";
    document.getElementById("body").style.height = bodyHeight + "px";
    document.getElementById("content").style.height = "100%"; 
    document.getElementById("collage").style.height = "100%"; 
  }
}