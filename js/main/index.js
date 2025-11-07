(function($) {
	"use strict";
	var $window = $(window);
	$('#preloader').fadeOut('normall', function() {
		$(this).remove();
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



