(function($) {
	"use strict";
	var $window = $(window);
	$('#preloader').fadeOut('normall', function() {
		$(this).remove();
	});

    $window.on('scroll', function() {
        var scroll = $window.scrollTop();
        if (scroll <= 10) {
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


        $('#clients').owlCarousel({
			loop: true,
			nav: false,
			dots: false,
			smartSpeed: 500,
			autoplay: true,
			autoplayTimeout: 3000,
			responsiveClass: true,
			autoplayHoverPause: false,
			stagePadding: 0,
			slideTransition: 'linear',
			autoplayTimeout: 1300,
			autoplaySpeed: 1300,
			responsive: {
				0: {
					items: 5,
					margin: 20
				},
				768: {
					items: 11,
					margin: 22
				},
				992: {
					items: 13,
					margin: 26
				},
				1200: {
					items: 15,
					margin: 30
				},
			}
		});
			


	});
})(jQuery);




