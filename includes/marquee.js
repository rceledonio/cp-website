// JavaScript Document
// Written by Chris Converse
// for Lynda.com

var currentPanel = 1;
var totalPanels = 0;
var autoPlay = true;
var timePassed = 0;
var timeToChange = 3;

function autoAdvance(){
	
	if (window.timePassed == window.timeToChange){
		window.timePassed = 0;
		if(window.currentPanel == window.totalPanels){
			currentPanel = 0;
		}
		if (autoPlay == true){
			$('.marquee_nav a.marquee_nav_item:nth-child('+(window.currentPanel+1)+')').trigger('click');
		}
	}else{
		window.timePassed += 1;
	}
	$('.timePassed').html('timePassed = '+window.timePassed);  //......................
	$('.autoPlay').html('autoPlay = '+window.autoPlay);  //......................
}

$(document).ready(function(){

	//NEW...................................................
	// Set up debugger
	/* debug */ $('.autoPlay').html('autoPlay = '+window.autoPlay);  //......................
	/* debug */ $('.timePassed').html('timePassed = '+window.timePassed);  //......................
	/* debug */ $('.timeToChange').html('timeToChange = '+window.timeToChange);  //......................
	/* debug */ $('.currentPanel').html('currentPanel = '+window.currentPanel);  //.....................
	setInterval(autoAdvance, 1500);
	
	//NEW..............................................

	//NEW....................
	
	$('.marquee_container').hover(
		function(){
			window.autoPlay = false;
			$(this).removeClass('autoplay');
		},
		function(){
			window.autoPlay = true; window.timePassed = 0;
			$(this).addClass('autoplay');
		}
	);
	
	//NEW...................
	
	// Generate Navigation links
	$('.marquee_panels .marquee_panel').each(function(index){
		$('.marquee_nav').append('<a class="marquee_nav_item" ></a>');
		totalPanels = index + 1;  //NEW..................................................................
		$('.totalPanels').html('totalPanels = '+totalPanels);  //......................
	});
	
	// Generate Photo Lineup
	$('img.marquee_panel_photo').each(function(index){
		var photoWidth = $('.marquee_container').width();
		var photoPosition = index * photoWidth;
		$('.marquee_photos').append('<img class="marquee_photo" style="left: '+photoPosition+'" src="'+$(this).attr('src')+'" alt="'+$(this).attr('alt')+'" width="940" height="350" />');
		$('.marquee_photos').css('width', photoPosition+photoWidth);
	});

	// Set up Navigation Links
	$('.marquee_nav a.marquee_nav_item').click(function(){
		
		// Set the navigation state
		$('.marquee_nav a.marquee_nav_item').removeClass('selected');
		$(this).addClass('selected');
		
		var navClicked = $(this).index();
		var marqueeWidth = $('.marquee_container').width();
		var distanceToMove = marqueeWidth*(-1);
		var newPhotoPosition = navClicked*distanceToMove + 'px';
		var newCaption = $('.marquee_panel_caption').get(navClicked);
		window.currentPanel = navClicked + 1;
		///* debug */ $('.currentPanel').html('currentPanel = '+window.currentPanel);  //.....................
		
		// Animate the photos and caption
		$('.marquee_photos').animate({left: newPhotoPosition}, 900);
		$('.marquee_caption').animate({left: '-245px'}, 500, function(){
			var newHTML = $(newCaption).html();
			$('.marquee_caption_content').html(newHTML);
			setCaption();
		});
	});
	
	// Preload all images, then initialize marquee
	$('.marquee_panels img').imgpreload(function(){
		initializeMarquee();
	});

});

function initializeMarquee(){
	$('.marquee_caption_content').html(
		$('.marquee_panels .marquee_panel:first .marquee_panel_caption').html()
	);
	$('.marquee_nav a.marquee_nav_item:first').addClass('selected');
	$('.marquee_photos').fadeIn(1000);
	setCaption();
}

function setCaption(){
	var captionHeight = $('.marquee_caption').width();
	var marqueeHeight = $('.marquee_container').height();
	var newCaptionTop = marqueeHeight - captionHeight - 15;
	$('.marquee_caption').delay(100).animate({left: "0px"}, 500);
}

