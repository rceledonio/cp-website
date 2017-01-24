$(document).ready(function() {

	$('.nav_menu .dropmenu').css('display','block');
	
	$('.nav_menu > ul').dropmenu({
		timeout : 0,
		nbsp : false
	});
	    
	$('li').has('ul').has('ul').find('> a').addClass('indicator');
	
});