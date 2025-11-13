(function($) {
	"use strict";
	var $window = $(window);
	$('#preloader').fadeOut('normall', function() {
		$(this).remove();
	});

    $window.on('scroll', function() {
        var scroll = $window.scrollTop();
        if (scroll <= 50) {
            $("header").removeClass("scrollHeader").addClass("fixedHeader");
        } else {
            $("header").removeClass("fixedHeader").addClass("scrollHeader");

        }
    });

	$window.on('scroll', function() {
		if ($(this).scrollTop() > 500) {
			$(".scroll-to-top").fadeIn(400);
		} else {
			$(".scroll-to-top").fadeOut(400);
		}
	});
	$(".scroll-to-top").on('click', function(event) {
		event.preventDefault();
		$("html, body").animate({
			scrollTop: 0
		}, 2000);
	});

	var pageSection = $(".parallax,.bg-img");
	pageSection.each(function(indx) {
		if ($(this).attr("data-background")) {
			$(this).css("background-image", "url(" + $(this).data("background") + ")");
		}
	});

	$(document).ready(function() {
		"use strict";


        
			


	});
})(jQuery);




