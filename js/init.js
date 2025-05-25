jQuery(document).ready(function () {
    "use strict";
    beny_tm_owl_carousel();
    beny_tm_down();
    beny_tm_trigger_menu();
    beny_tm_nav_bg();
    beny_tm_modalbox_news();
    beny_tm_modalbox_service();
    beny_tm_cursor();
    beny_tm_imgtosvg();
    beny_tm_popup();
    beny_tm_data_images();
    beny_tm_contact_form();
    beny_tm_totop();
    jQuery(window).load('body', function () {
        beny_tm_my_load();
    });
});

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});
document.addEventListener('selectstart', function (e) {
    e.preventDefault();
}); //copy and paste disable


function beny_tm_owl_carousel() {
    "use strict";
    var carousel = jQuery('.beny_tm_testimonials .owl-carousel');
    var rtlMode = false;
    if (jQuery('body').hasClass('rtl')) {
        rtlMode = 'true';
    }
    carousel.owlCarousel({
        loop: true,
        items: 1,
        lazyLoad: false,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 7000,
        rtl: rtlMode,
        dots: true,
        nav: false,
        navSpeed: false,
    });
    beny_tm_imgtosvg();
    carousel.parent().find('.right_nav').click(function () {
        carousel.trigger('next.owl.carousel');
        return false;
    });
    carousel.parent().find('.left_nav').click(function () {
        carousel.trigger('prev.owl.carousel');
        return false;
    });
}

function beny_tm_down() {
    "use strict";
    var topbar = jQuery('.beny_tm_topbar').outerHeight();
    jQuery('.beny_tm_hero .beny_tm_button a').on('click', function () {
        if ($('.beny_tm_topbar').length) {
            if ($.attr(this, 'href') !== '#') {
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - topbar + 40
                }, 800);
            }
        }
    });
    jQuery('.beny_tm_intro_hero .beny_tm_button a').on('click', function () {
        if ($.attr(this, 'href') !== '#') {
            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top - 120
            }, 800);
        }
    });
}

function tdProgress(container) {
    "use strict";
    container.find('.progress_inner').each(function () {
        var progress = jQuery(this);
        var pValue = parseInt(progress.data('value'), 10);
        var pColor = progress.data('color');
        var pBarWrap = progress.find('.bar');
        var pBar = progress.find('.bar_in');
        var number = progress.find('.number');
        var label = progress.find('.label');
        number.css({
            right: (100 - pValue) + '%'
        });
        setTimeout(function () {
            label.addClass('opened');
        }, 500);
        pBar.css({
            width: pValue + '%',
            backgroundColor: pColor
        });
        setTimeout(function () {
            pBarWrap.addClass('open');
        });
    });
}
jQuery('.tokyo_progress').each(function () {
    "use strict";
    var pWrap = jQuery(this);
    pWrap.waypoint({
        handler: function () {
            tdProgress(pWrap);
        },
        offset: '90%'
    });
});

function beny_tm_trigger_menu() {
    "use strict";
    var hamburger = jQuery('.my_trigger .hamburger');
    var mobileMenu = jQuery('.beny_tm_mobile_menu .dropdown');
    var mobileMenuList = jQuery('.beny_tm_mobile_menu .dropdown .dropdown_inner ul li a');
    hamburger.on('click', function () {
        var element = jQuery(this);
        if (element.hasClass('is-active')) {
            element.removeClass('is-active');
            mobileMenu.slideUp();
        } else {
            element.addClass('is-active');
            mobileMenu.slideDown();
        }
        return false;
    });
    mobileMenuList.on('click', function () {
        jQuery('.my_trigger .hamburger').removeClass('is-active');
        mobileMenu.slideUp();
        return false;
    });
}

function beny_tm_nav_bg() {
    "use strict";
    jQuery(window).on('scroll', function () {
        var topbar = jQuery('.beny_tm_topbar');
        var WinOffset = jQuery(window).scrollTop();
        if (WinOffset >= 100) {
            topbar.addClass('animate');
        } else {
            topbar.removeClass('animate');
        }
    });
}
jQuery('.anchor_nav').onePageNav();

function beny_tm_preloader() {
    "use strict";
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
    var preloader = $('#preloader');
    if (!isMobile) {
        setTimeout(function () {
            preloader.addClass('preloaded');
        }, 800);
        setTimeout(function () {
            preloader.remove();
        }, 2000);
    } else {
        preloader.remove();
    }
}

function beny_tm_modalbox_news() {
    "use strict";
    var modalBox = jQuery('.beny_tm_modalbox_news');
    var list = jQuery('.beny_tm_news ul li');
    var closePopup = modalBox.find('.close');
    var boxInner = modalBox.find('.box_inner');

    list.each(function () {
        var element = jQuery(this);
        var details = element.find('.list_inner').html();
        var buttons = element.find('.details a,.beny_tm_full_link');
        var mainImage = element.find('.main');
        var imgData = mainImage.data('img-url');
        var title = element.find('.title');
        var titleHref = element.find('.title a').html();
        buttons.on('click', function () {
            jQuery('body').addClass('modal');
            modalBox.addClass('opened');
            modalBox.find('.description_wrap').html(details);
            mainImage = modalBox.find('.main');
            mainImage.css({
                backgroundImage: 'url(' + imgData + ')'
            });
            title = modalBox.find('.title');
            title.html(titleHref);
            beny_tm_imgtosvg();
            return false;
        });
    });

    closePopup.on('click', function () {
        closeModal();
        return false;
    });

    // Close when clicking/touching outside modal content
    modalBox.on('mousedown touchstart', function (e) {
        if (!jQuery(e.target).closest('.box_inner').length) {
            closeModal();
        }
    });

    function closeModal() {
        modalBox.removeClass('opened');
        modalBox.find('.description_wrap').html('');
        jQuery('body').removeClass('modal');
    }
}

function beny_tm_modalbox_service() {
    "use strict";
    var modalBox = jQuery('.beny_tm_modalbox_service');
    var list = jQuery('.beny_tm_services ul li');
    var closePopup = modalBox.find('.close');
    var boxInner = modalBox.find('.box_inner');

    list.each(function () {
        var element = jQuery(this);
        var details = element.find('.list_inner').html();
        var buttons = element.find('.beny_tm_full_link');
        var mainImage = element.find('.main');
        var imgData = mainImage.data('img-url');
        buttons.on('click', function () {
            jQuery('body').addClass('modal');
            modalBox.addClass('opened');
            modalBox.find('.description_wrap').html(details);
            mainImage = modalBox.find('.main');
            mainImage.css({
                backgroundImage: 'url(' + imgData + ')'
            });
            beny_tm_imgtosvg();
            return false;
        });
    });

    closePopup.on('click', function () {
        closeModal();
        return false;
    });

    // Close when clicking/touching outside modal content
    modalBox.on('mousedown touchstart', function (e) {
        if (!jQuery(e.target).closest('.box_inner').length) {
            closeModal();
        }
    });

    function closeModal() {
        modalBox.removeClass('opened');
        modalBox.find('.description_wrap').html('');
        jQuery('body').removeClass('modal');
    }
}

function beny_tm_my_load() {
    "use strict";
    var speed = 500;
    setTimeout(function () {
        beny_tm_preloader();
    }, speed);
    setTimeout(function () {
        jQuery('.beny_tm_all_wrap').addClass('animate');
    }, speed + 2000);
}
new WOW().init();

function beny_tm_cursor() {
    "use strict";
    var myCursor = jQuery('.mouse-cursor');
    if (myCursor.length) {
        if ($("body")) {
            const e = document.querySelector(".cursor-inner"),
                t = document.querySelector(".cursor-outer");
            let n, i = 0,
                o = !1;
            window.onmousemove = function (s) {
                o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
            }, $("body").on("mouseenter", "a, .toky_tm_topbar .trigger, .cursor-pointer", function () {
                e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
            }), $("body").on("mouseleave", "a, .toky_tm_topbar .trigger, .cursor-pointer", function () {
                $(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
            }), e.style.visibility = "visible", t.style.visibility = "visible"
        }
    }
};

function beny_tm_imgtosvg() {
    "use strict";
    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        jQuery.get(imgURL, function (data) {
            var $svg = jQuery(data).find('svg');
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }
            $svg = $svg.removeAttr('xmlns:a');
            $img.replaceWith($svg);
        }, 'xml');
    });
}

function beny_tm_popup() {
    "use strict";
    jQuery('.gallery_zoom').each(function () {
        jQuery(this).magnificPopup({
            delegate: 'a.zoom',
            type: 'image',
            gallery: {
                enabled: true
            },
            removalDelay: 300,
            mainClass: 'mfp-fade'
        });
    });
    jQuery('.popup-youtube, .popup-vimeo').each(function () {
        jQuery(this).magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    });
    jQuery('.soundcloude_link').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true,
        },
    });
}

function beny_tm_data_images() {
    "use strict";
    var data = jQuery('*[data-img-url]');
    data.each(function () {
        var element = jQuery(this);
        var url = element.data('img-url');
        element.css({
            backgroundImage: 'url(' + url + ')'
        });
    });
}

function beny_tm_contact_form() {
    "use strict";
    jQuery(".contact_form #send_message").on('click', function () {
        var name = jQuery(".contact_form #name").val();
        var email = jQuery(".contact_form #email").val();
        var message = jQuery(".contact_form #message").val();
        var subject = jQuery(".contact_form #subject").val();
        var success = jQuery(".contact_form .returnmessage").data('success');
        jQuery(".contact_form .returnmessage").empty();
        if (name === '' || email === '' || subject === '' || message === '') {
            jQuery('div.empty_notice').slideDown(500).delay(2000).slideUp(500);
        } else {
            jQuery.post("modal/contact.html", {
                ajax_name: name,
                ajax_email: email,
                ajax_message: message,
                ajax_subject: subject
            }, function (data) {
                jQuery(".contact_form .returnmessage").append(data);
                if (jQuery(".contact_form .returnmessage span.contact_error").length) {
                    jQuery(".contact_form .returnmessage").slideDown(500).delay(2000).slideUp(500);
                } else {
                    jQuery(".contact_form .returnmessage").append("<span class='contact_success'>" + success + "</span>");
                    jQuery(".contact_form .returnmessage").slideDown(500).delay(4000).slideUp(500);
                }
                if (data === "") {
                    jQuery("#contact_form")[0].reset();
                }
            });
        }
        return false;
    });
}

function beny_tm_totop() {
    "use strict";
    jQuery(".beny_tm_totop").on('click', function (e) {
        e.preventDefault();
        jQuery("html, body").animate({
            scrollTop: 0
        }, 'slow');
        return false;
    });
}