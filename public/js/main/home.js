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
		$('#example').dataTable();


		$('#chart-cols').owlCarousel({
			loop: false,
			nav: false,
			dots: true,
			smartSpeed: 3000,
			autoplay: true,
			responsiveClass: true,
			autoplayHoverPause: false,
			stagePadding: 0,
			slideTransition: 'linear',
			autoplayTimeout: 3000,
			autoplaySpeed: 15000,
			responsive: {
				0: {
					items: 1,
					margin: 10
				}
			}
		});

		new Chart(document.getElementById("chart1"), {
			"type": "bar",
			"data": {
				"labels": [
					"B.O.A.", "Chase", "Chime", "Citi", "Huntington", "N.F.C.U.",
					"Truist", "R.B.C.", "Wells Fargo", "Woodforest"
				],
				"datasets": [{
					"label": "Logs Available",
					"data": [10, 10, 10, 10, 10, 9, 9, 9, 10, 9],
					"fill": false,
					"backgroundColor": [
						"rgb(3,169,245)", "rgb(245,222,179)", "rgb(71,88,143)",
						"rgb(250,183,2)", "rgb(208,173,85)", "rgb(73,192,208)",
						"rgb(3,192,208)", "rgb(22,160,134)", "rgb(134,188,66)", "rgb(100,242,72)"
					],
					"borderColor": [
						"rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)",
						"rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)",
						"rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)"
					],
					"borderWidth": 1
				}]
			},
			"options": {
				"scales": {
					"yAxes": [{
						"ticks": {
							"beginAtZero": true
						}
					}]
				}
			}
		});

		new Chart(document.getElementById("chart2"), {
			"type": "line",
			"data": {
				"labels": [
					"B.O.A.", "Chase", "Chime", "Citi", "Huntington", "N.F.C.U.",
					"Truist", "R.B.C.", "Wells Fargo", "Woodforest"
				],
				"datasets": [{
					"label": "Bank Logs",
					"data": [12, 14, 16, 14, 12, 11, 11, 12, 12, 10],
					"borderColor": "rgb(255, 255, 255, 0.56)",
					"backgroundColor": "rgba(255, 255, 255, 0.1)",
				}]
			},
			"options": {}
		});



		new Chart(document.getElementById("chart3"), {
			"type": "bar",
			"data": {
				"labels": [
					"B.O.A.", "Chase", "Chime", "Citi", "Huntington", "N.F.C.U.",
					"Truist", "R.B.C.", "Wells Fargo", "Woodforest"
				],
				"datasets": [{
					"label": "Logs Available",
					"data": [10, 10, 10, 10, 10, 9, 9, 9, 10, 9],
					"fill": false,
					"backgroundColor": [
						"rgb(3,169,245)", "rgb(245,222,179)", "rgb(71,88,143)",
						"rgb(250,183,2)", "rgb(208,173,85)", "rgb(73,192,208)",
						"rgb(3,192,208)", "rgb(22,160,134)", "rgb(134,188,66)", "rgb(100,242,72)"
					],
					"borderColor": [
						"rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)",
						"rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)",
						"rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)"
					],
					"borderWidth": 1
				}]
			},
			"options": {
				"scales": {
					"yAxes": [{
						"ticks": {
							"beginAtZero": true
						}
					}]
				}
			}
		});

		new Chart(document.getElementById("chart4"), {
			"type": "line",
			"data": {
				"labels": [
					"B.O.A.", "Chase", "Chime", "Citi", "Huntington", "N.F.C.U.",
					"Truist", "R.B.C.", "Wells Fargo", "Woodforest"
				],
				"datasets": [{
					"label": "Bank Logs",
					"data": [12, 14, 16, 14, 12, 11, 11, 12, 12, 10],
					"borderColor": "rgb(255, 255, 255, 0.56)",
					"backgroundColor": "rgba(255, 255, 255, 0.1)",
				}]
			},
			"options": {}
		});


		new Chart(document.getElementById("chart5"), {
			"type": "bar",
			"data": {
				"labels": [
					"B.O.A.", "Chase", "Chime", "Citi", "Huntington", "N.F.C.U.",
					"Truist", "R.B.C.", "Wells Fargo", "Woodforest"
				],
				"datasets": [{
					"label": "Logs Available",
					"data": [10, 10, 10, 10, 10, 9, 9, 9, 10, 9],
					"fill": false,
					"backgroundColor": [
						"rgb(3,169,245)", "rgb(245,222,179)", "rgb(71,88,143)",
						"rgb(250,183,2)", "rgb(208,173,85)", "rgb(73,192,208)",
						"rgb(3,192,208)", "rgb(22,160,134)", "rgb(134,188,66)", "rgb(100,242,72)"
					],
					"borderColor": [
						"rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)",
						"rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)",
						"rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)", "rgba(255,255,255,0.7)"
					],
					"borderWidth": 1
				}]
			},
			"options": {
				"scales": {
					"yAxes": [{
						"ticks": {
							"beginAtZero": true
						}
					}]
				}
			}
		});
			


	});
})(jQuery);




jQuery(document).ready(function($) {
	var $timeline_block = $('.cd-time-block');

	//hide timeline blocks which are outside the viewport
	$timeline_block.each(function() {
		if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
			$(this).find('.cd-time-img, .cd-time-content').addClass('is-hidden');
		}
	});

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function() {
		$timeline_block.each(function() {
			if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.cd-time-img').hasClass('is-hidden')) {
				$(this).find('.cd-time-img, .cd-time-content').removeClass('is-hidden').addClass('bounce-in');
			}
		});
	});
});

