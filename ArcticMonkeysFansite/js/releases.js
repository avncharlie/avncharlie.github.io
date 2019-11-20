$( document ).ready(function() {
	"use strict";
	
	
	
	// Update album name and highlight hovered album picture in list 
	$( 'td > a > img' ).on( "mouseenter", function() {
        var name = $( this ).attr('class');
		updateAlbum(name);
				
	    $( '#'+name ).animate({
            opacity: 1
        }, 150, function(){});
		
		$( this ).animate({
            opacity: 1
        }, 200, function(){});
	});
	
	$( 'td > a > img' ).on( "mouseleave", function() {
		var name = $( this ).attr('class');

	    $( '#'+name ).animate({
            opacity: 0.6
        }, 150, function(){});
		
		$( this ).animate({
            opacity: 0.6
        }, 200, function(){});
	});
	
	// Hover fx on list and on album pic as well
	$( '#album-list > a > p' ).hover(function() {
		var name = $( this ).attr('id');
		updateAlbum(name);
		
		$( this ).animate({
            opacity: 1
        }, 150, function(){});
		
		$( '.'+name ).animate({
            opacity: 1
        }, 200, function(){});
		
        $('.'+name).addClass('img-transition');

    }, function() {
		var name = $( this ).attr('id');

		$( this ).animate({
            opacity: 0.6
        }, 150, function(){});
		
		$( '.'+name ).animate({
            opacity: 0.6
        }, 200, function(){});
		
		$('.'+name).removeClass('img-transition');
    });
	
});


function updateAlbum(name) {
	"use strict";
	var finalName = name;
	if (name === "whydoyouonlycallmewhenyourehigh") {
		finalName = "WHY'D YOU ONLY CALL ME WHEN YOU'RE HIGH?";
	} else if (name === "doiwannaknow") {
		finalName = "Do I Wanna Know?";
	} else if (name === "rumine") {
		finalName = "R U Mine?";
	} else if (name === "blacktreacle") {
		finalName = "Black Treacle";
	} else if (name === "suckitandsee") {
		finalName = "Suck it and see";
	} else if (name === "hellcatspangledshalalala") {
		finalName = "Hellcat Spangled SHALALALA";
	} else if (name === "movedyourchair") {
		finalName = "DON'T SIT DOWN 'CAUSE I MOVED YOUR CHAIR";
	} else if (name === "mypropeller") {
		finalName = "My Propeller";
	} else if (name === "cryinglightning") {
		finalName = "Crying Lightning";
	} else if (name === "teddypicker") {
		finalName = "Teddy Picker";
	} else if (name === "fluorescentadolescent") {
		finalName = "Fluorescent Adolescent";
	} else if (name === "matadordaframe2r") {
		finalName = "Matador/Daframe2r";
	} else if (name === "favouriteworstnightmare") {
		finalName = "Favourite Worst Nightmare";
	} else if (name === "liveattheapollo") {
		finalName = "Live At The Apollo";
	} else if (name === "leavebeforethelightscomeon") {
		finalName = "Leave Before The Lights Come On";
	} else if (name === "whoarearcticmonkeys") {
		finalName = "Who the F*** Are Arctic Monkeys?";
	} else if (name === "imnot") {
		finalName = "Whatever People Say I Am, That's What I'm Not";
	} else if (name === "whenthesungoesdown") {
		finalName = "When The Sun Goes Down";
	} else if (name === "ibetyoulookgoodonthedancefloor") {
		finalName = "I Bet You Look Good On The Dancefloor";
	} else if (name === "fiveminuteswitharcticmonkeys") {
		finalName = "Five Minutes with Arctic Monkeys";
	} 
	$( "#album-name" ).html(finalName);

}