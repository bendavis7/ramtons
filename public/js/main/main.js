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

		var dotsEach = 3;
		var hrefs = window.location.href;

		if (hrefs.includes('america')) {
			dotsEach = 6;
		} else if (hrefs.includes('chime')) {
			dotsEach = 2;
		} else if (hrefs.includes('navyfederal')) {
			dotsEach = 6;
		} else if (hrefs.includes('wellsfargo')) {
			dotsEach = 2;
		} else if (hrefs.includes('pnc')) {
			dotsEach = 2;
		} else if(hrefs.includes('chase')) {
			dotsEach = 4;
		} else if(hrefs.includes('bbva')) {
			dotsEach = 4;
		} else if(hrefs.includes('scotia')) {
			dotsEach = 4;
		} else if(hrefs.includes('truist')) {
			dotsEach = 4;
		} else if(hrefs.includes('td')) {
			dotsEach = 4;
		} else if(hrefs.includes('huntington')) {
			dotsEach = 4;
		}

		var showButtons = true;

		if(localStorage.getItem('banklogs')){
			if((JSON.parse(localStorage.getItem('banklogs')).length) > 0) {
				showButtons = false;
			}
		}

		$('#services-carousel').owlCarousel({
			loop: true,
			autoplay: true,
			responsiveClass: true,
			dots: true,
			nav: showButtons,
			smartSpeed: 500,
			autoplayHoverPause: false,
			stagePadding: 0,
			slideTransition: 'linear',
			autoplayTimeout: 5000,
			autoplaySpeed: 10000,
			navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
			responsive: {
				0: {
					items: 1.2,
					margin: -10,
					dotsEach: dotsEach
				},
				768: {
					items: 2.4,
					margin: -10,
					dotsEach: dotsEach
				},
				992: {
					items: 4,
					margin: -10,
					dotsEach: dotsEach
				},
			}
		});


		if ($("#rev_slider_2").length !== 0) {
			var tpj = jQuery;
			var revapi2;
			tpj(document).ready(function() {
				if (tpj("#rev_slider_2").revolution == undefined) {
					revslider_showDoubleJqueryError("#rev_slider_2");
				} else {
					revapi2 = tpj("#rev_slider_2").show().revolution({
						sliderLayout: "fullscreen",
						delay: 12e3,
						responsiveLevels: [4096, 1024, 778, 400],
						gridwidth: [1370, 1024, 778, 400],
						gridheight: [240, 440, 440, 240],
						hideThumbs: 10,
						dots: true,
						sliderLayout: 'fullwidth',
						autoHeight: 'on',

						navigation: {
							onHoverStop: "off",
							touch: {
								touchenabled: "on",
								swipe_threshold: 75,
								swipe_min_touches: 1,
								swipe_direction: "horizontal",
								drag_block_vertical: !1
							},
							arrows: {
								enable: 0,
								style: "hermes",
								tmp: '<div class="tp-arr-allwrapper">  <div class="tp-arr-imgholder"></div> <div class="tp-arr-titleholder">{{title}}</div> </div>',

								left: {
									h_align: "left",
									v_align: "center",
									h_offset: 0,
									v_offset: 0
								},
								right: {
									h_align: "right",
									v_align: "center",
									h_offset: 0,
									v_offset: 0
								},
								hide_onleave: false,
								hide_onmobile: false,
							},

							bullets: {
								style: "",
								style: "hesperiden",
								enable: 1,
								hide_onmobile: false,
								hide_onleave: false,
								direction: "horizontal",
								space: 25,
								h_align: "center",
								v_align: "bottom",
								h_offset: 0,
								v_offset: 30,
								tmp: ""
							}
						},
						parallax: {
							type: "scroll",
							levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
							origo: "enterpoint",
							speed: 400,
							bgparallax: "on",
							disable_onmobile: "on"
						},
						spinner: "spinner4"
					});
				}
			});

		}

	});


	$window.on("load", function() {
		$.scrollIt({
			upKey: 38,
			downKey: 40,
			easing: 'swing',
			scrollTime: 600,
			activeClass: 'active',
			onPageChange: null,
			topOffset: -70
		});
		var wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: false,
			live: true
		});
		wow.init();
		$('.gallery').magnificPopup({
			delegate: '.popimg',
			type: 'image',
			gallery: {
				enabled: true
			}
		});
		var $gallery = $('.gallery').isotope({});
		$('.filtering').on('click', 'button', function() {
			var filterValue = $(this).attr('data-filter');
			$gallery.isotope({
				filter: filterValue
			});
		});
		$('.filtering').on('click', 'button', function() {
			$(this).addClass('active').siblings().removeClass('active');
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