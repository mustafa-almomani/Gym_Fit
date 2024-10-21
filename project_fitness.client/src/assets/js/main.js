/************* Main Js File ************************
	Template Name: THEME_NAME
	Author: Netizens Technologies
	Version: 1.0
	Copyright 2023
	Please ❤ this if you like it!
*************************************************************/
/*------------------------------------------------------------------------------------ 
	=============
	= JS INDEX  =
	=============
	01 - PRELOAD JS
	02 - SCROLL TOP JS
	03 - HEADER JS
	04 - STICKY HEADER JS
	05 - PRICING JS
	06 - HOME PAGE SLIDER JS
	07 - FORM VALIDATION JS
	08 - COMING SOON COUNT-DOWN JS
	09 - ANNIMATION JS
	10 - PRELOADR JS
	11 - FLOATING IMG JS
-------------------------------------------------------------------------------------*/

/*=====================================================================
01 - PRELOAD JS
=====================================================================*/
$(window).on("load", function () {
	$(".preloader").fadeOut("slow");
	$("body").removeClass("no-scroll-y");
});


/*=====================================================================
02 - SCROLL TOP JS
=====================================================================*/
$(document).ready(function () {
	var btn = $("#button");
	$(window).scroll(function () {
		if ($(window).scrollTop() > 700) {
			btn.addClass("show");
		} else {
			btn.removeClass("show");
		}
	});
	btn.on("click", function (e) {
		e.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, "300");
	});
});


/*=====================================================================
03 - HEADER JS
=====================================================================*/
$(document).ready(function () {
	/* Menu Open Backgeround Blur */
	$(".hamburger").click(function () {
		$("header").addClass("active");
		$("body").addClass("no-scroll-y");
	});
	$(".closeBtn").click(function () {
		$("header").removeClass("active");
		$("body").removeClass("no-scroll-y");
		$(".dropdown ul").slideUp().removeClass("active");
	});
	$('.tabActive li a:not(.dropdown-toggle)').click(function(){
		$("body").removeClass("no-scroll-y");
		$("header").removeClass("active");
	});
	/* Active Menu */
	$(document).ready(function () {
		$(".tabActive a").click(function () {
			$(".tabActive a").removeClass("active");
			$(this).addClass("active");
		});
		$(function () {
			var path = window.location.href;
			var pop = [];
			$('.tabActive a').each(function () {
				var anchor = $(this).prop('href').split("/").pop();
				pop.push(anchor);
				var href = this.href.replace(".html", "").replace(".php", "");
				var navPath = path.replace(".html", "").replace(".php", "");
				if (href === navPath) {
					$(this).addClass('active');
				}
			});
			var anchor = $('.tabActive a[href*="' + pop[0] + '"]');
			if (path.split('/').pop() == "") {
				$(anchor).addClass("active")
			}
		});
	});
});

$(window).on("resize", function () {
	$("header").removeClass("active");
	$("body").removeClass("no-scroll-y");
	var win = $(this);
	if (win.width() >= 991) {
		$("body").removeClass("overley");
	} else {
		$(".navbar-toggler").addClass("collapsed");
		$(".navbar-collapse").removeClass("show");
		$("body").removeClass("overley");
		$(".navbar-toggler").attr("aria-expanded", "false");
		$(".navbar").removeClass("active-navbar");
	}
});


/*=====================================================================
04 - STICKY HEADER JS
=====================================================================*/
$(document).ready(function () {
    headerFixed();
});
$(document).on('scroll', function () {
    headerFixed();
});
function headerFixed() {
    if ($(window).scrollTop() >= 300) {
        $('header').addClass('stickyMenu');
	} else {
        $('header').removeClass('stickyMenu');
    }
    if ($(window).scrollTop() >= 700) {
        $('.stickyMenu').addClass('menuActive');
    } else {
        $('.stickyMenu').removeClass('menuActive');
    }
}


/*=====================================================================
05 - PRICING JS
=====================================================================*/
$(document).ready(function () {
	$("body").on("click", ".pricing_wrapper .pricing_block", function () {
		$(".pricing_wrapper .pricing_block").removeClass("active");
		$(this).addClass("active");
	});
});


/*=====================================================================
06 - HOME PAGE SLIDER JS
=====================================================================*/
if ($(".ClientSwiper").length == "1") {
	var swiper = new Swiper(".ClientSwiper", {
		loop: true,
		spaceBetween: 24,
		slidesPerView: 1,
		navigation: {
			nextEl: ".ClientSwiper .next",
			prevEl: ".ClientSwiper .prev",
		},
		autoplay: {
			delay: 2500,
			disableOnInteraction: true,
		},
	});
	$(".ClientSwiper").mouseenter(function () {
		document.querySelector('.ClientSwiper').swiper.autoplay.stop();
		console.log('slider stopped');
	});

	$(".ClientSwiper").mouseleave(function () {
		document.querySelector('.ClientSwiper').swiper.autoplay.start();
		console.log('slider started again');
	});
}
if ($(".BlogSwiper").length == "1") {
	var swiper = new Swiper(".BlogSwiper", {
		loop: true,
		spaceBetween: 24,
		slidesPerView: 2,
		navigation: {
			nextEl: ".blog-section .next",
			prevEl: ".blog-section .prev",
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 15,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
		},
		autoplay: {
			delay: 2500,
			disableOnInteraction: true,
		},
	});
	$(".BlogSwiper").mouseenter(function () {
		document.querySelector('.BlogSwiper').swiper.autoplay.stop();
		console.log('slider stopped');
	});

	$(".BlogSwiper").mouseleave(function () {
		document.querySelector('.BlogSwiper').swiper.autoplay.start();
		console.log('slider started again');
	});
}
if ($(".myTeam").length == "1") {
	var swiper = new Swiper(".myTeam", {
		loop: true,
		spaceBetween: 24,
		slidesPerView: 4,
		navigation: {
			nextEl: ".myTeam .next",
			prevEl: ".myTeam .prev",
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 15,
			},
			576: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 24,
			},
			1400: {
				slidesPerView: 4,
				spaceBetween: 24,
			},
		},
		autoplay: {
			delay: 2500,
			disableOnInteraction: true,
		},
	});
	$(".myTeam").mouseenter(function () {
		document.querySelector('.myTeam').swiper.autoplay.stop();
		console.log('slider stopped');
	});

	$(".myTeam").mouseleave(function () {
		document.querySelector('.myTeam').swiper.autoplay.start();
		console.log('slider started again');
	});
}


/*=====================================================================
07 - FORM VALIDATION JS
=====================================================================*/
(() => {
	'use strict'
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	const forms = document.querySelectorAll('.needs-validation')

	// Loop over them and prevent submission
	Array.from(forms).forEach(form => {
		form.addEventListener('submit', event => {
			if (!form.checkValidity()) {
				event.preventDefault()
				event.stopPropagation()
			}

			form.classList.add('was-validated')
		}, false)
	})
})()


/*=====================================================================
08 - COMING SOON COUNT-DOWN JS
=====================================================================*/
if ($(".comming-wrapper").length > "0") {
	(function () {
		const second = 1000,
			minute = second * 60,
			hour = minute * 60,
			day = hour * 24;
		let today = new Date(),
			dd = String(today.getDate()).padStart(2, "0"),
			mm = String(today.getMonth() + 1).padStart(2, "0"),
			yyyy = today.getFullYear(),
			nextYear = yyyy + 1,
			dayMonth = "07/29/",
			birthday = dayMonth + yyyy;

		today = mm + "/" + dd + "/" + yyyy;

		if (today > birthday) {
			birthday = dayMonth + nextYear;
		}

		const countDown = new Date(birthday).getTime(),
			x = setInterval(function () {

				const now = new Date().getTime(),
					distance = countDown - now;

				const days = Math.floor(distance / day),
					hours = Math.floor((distance % day) / hour),
					minutes = Math.floor((distance % hour) / minute),
					seconds = Math.floor((distance % minute) / second);

				document.getElementById("days").innerText = String(days).padStart(2, "0");
				document.getElementById("hours").innerText = String(hours).padStart(2, "0");
				document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
				document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");

				if (distance < 0) {
					document.getElementById("countdown").style.display = "none";
					document.getElementById("content").style.display = "block";
					clearInterval(x);
				}
			}, 0)
	}());
};



/*
=================================================================
09 - ANNIMATION JS
=================================================================
*/
$(document).ready(function () {
	new WOW().init();
});


/*
=================================================================
10 - PRELOADR JS
=================================================================
*/

$(window).on('load', function () {
	$("body").removeClass("hidden");
	$(".page_loader").fadeOut("slow");
});


/*
=================================================================
11 - FLOATING IMG JS
=================================================================
*/
// const floatingImages = document.querySelectorAll('.floatingImage');

// document.addEventListener('mousemove', (e) => {
//     const mouseX = e.clientX;
//     const mouseY = e.clientY;

//     floatingImages.forEach((image) => {
//         // Calculate percentage offsets
//         const offsetX = (mouseX / window.innerWidth - 0.5) * 2; // Normalize to [-1, 1]
//         const offsetY = (mouseY / window.innerHeight - 0.5) * 2;

//         // Apply the transform
//         image.style.transform = `translate(${offsetX * 20}px, ${offsetY * 20}px)`;
//     });
// });