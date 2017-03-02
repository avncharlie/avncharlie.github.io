// Scroll to xkcd plugin
$("#xkcd-link").click(function() {
    $('html,body').animate({
            scrollTop: $("#xkcd-plugin-anchor").offset().top},
            'slow');
});

// Scroll to calculator
$("#calculator-link").click(function() {
    $('html,body').animate({
            scrollTop: $("#kivy-calculator-anchor").offset().top},
            'slow');
});

// Scroll to tribute page
$("#mandela-tribute-link").click(function() {
    $('html,body').animate({
            scrollTop: $("#mandela-tribute-anchor").offset().top},
            'slow');
});

// Scroll to battery saver
$("#battery-saver-link").click(function() {
    $('html,body').animate({
            scrollTop: $("#battery-saver-anchor").offset().top},
            'slow');
});

// Scroll to top of page 
$("#home-link").click(function() {
    $('html,body').animate({
            scrollTop: (0)},
            'slow');
});

$("#my-name").click(function() {
    $('html,body').animate({
            scrollTop: (0)},
            'slow');
});