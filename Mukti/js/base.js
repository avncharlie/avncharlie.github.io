document.addEventListener('DOMContentLoaded', function () {
    updateNavBar();
});

window.onresize = function () {
    updateNavBar();
};

var navbarOpen = false;
var inDropDownState = false;

// shows bars if navbar in drop down state
function updateNavBar() {
    var currentWidth = window.innerWidth;
    var bars = document.getElementById("bars");
    var navbar = document.getElementById("navbar");

    if (currentWidth < 650) {
        bars.setAttribute("style", "display: block");
        if (!inDropDownState) {
            navbar.setAttribute("style", "display: none");
        }
        inDropDownState = true;
    } else {
        inDropDownState = false;
        bars.setAttribute("style", "display: none");
        navbar.setAttribute("style", "display: block");
        navbarOpen = false;
    }
}

// show hide navbar when bars clicked in drop down state
document.getElementById("bars").addEventListener("click", function () {
  console.log("heya");
    var navbar = document.getElementById("navbar");
    if (navbarOpen) {
        navbar.setAttribute("style", "display: none");
        navbarOpen = false;
    } else {
        navbar.setAttribute("style", "display: block; z-index: 1");
        navbarOpen = true;
    }
});
