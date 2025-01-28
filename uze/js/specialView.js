/**
 * Created by Azamat Mirvosiqov on 29.01.2015.
 */

var min = 14,
    max = 30;

function setFontSize(size) {
    if (size < min) {
        size = min;
    }
    if (size > max) {
        size = max;
    }

    $('').css({'font-size': parseInt(size) - 2 + 'px'});/*12*/
    $('.new-design .services-list .tab-content ul li a .text, .social_banner div, .redesign-inner .breadcrumbBox > li a').css({'font-size': parseInt(size) + 'px'});/*14*/
    $('.service-moments .tab-content .sphere-list li a .service-name, .stat_box_count_part .table_list li .right, .footer-part .text').css({'font-size': parseInt(size) + 1 + 'px'});/*15*/
    $('.new-design .type-of-services-list li a, .list_with_icon.without li a div span, .social_banner, body, .statistic-page-btn, .news-part .news ul li .text, .footer-part .footer-menu li a, .passport-info .panel-body, .passport-info .cat_btn').css({'font-size': parseInt(size) + 2 + 'px'});/*16*/
    $('.icon_list li .icon_name').css({'font-size': parseInt(size) + 3 + 'px'});/*17*/
    $('.title-serivces, .service-moments-list li a, .service-moments .tab-content .sphere-list li a .sphere-title, .category-news .title, .statistic-part .donut_title, .news-part .news .title, .services_tab .tab-style li a').css({'font-size': parseInt(size) + 4 + 'px'});/*18*/
    $('.social_banner .bold_title, .footer-part .project-name, .service_passport_btns .service_button').css({'font-size': parseInt(size) + 6 + 'px'});/*20*/
    $('.new-design .bannerBar .titleArea span, .service_name_box .service_title p, h1.whiteTitle, .whiteTitle').css({'font-size': parseInt(size) + 10 + 'px'});/*24*/
    $('').css({'font-size': parseInt(size) + 14 + 'px'});/*28*/
    $('.user_name').css({'font-size': parseInt(size) + 22 + 'px'});/*36*/


    /* TODO - Add font options */
}

function makeNormal() {
    $('html').removeClass('blackAndWhite blackAndWhiteInvert');
    $.removeCookie('specialView', {path: '/'});
}

function makeBlackAndWhite() {
    makeNormal();
    $('html').addClass('blackAndWhite');
    $.cookie("specialView", 'blackAndWhite', {path: '/'});
}

function makeBlackAndWhiteDark() {
    makeNormal();
    $('html').addClass('blackAndWhiteInvert');
    $.cookie("specialView", 'blackAndWhiteInvert', {path: '/'});
}

function saveFontSize(size) {
    $.cookie("fontSize", size, {path: '/'});
}

function changeSliderText(sliderId, value) {
    var position = Math.round(Math.abs((value - min) * (100 / (max - min))));
    $('#' + sliderId).prev('.sliderText').children('.range').text(position);
}

$(document).ready(function () {
    var appearance = $.cookie("specialView");
    switch (appearance) {
        case 'blackAndWhite':
            makeBlackAndWhite();
            break;
        case 'blackAndWhiteInvert':
            makeBlackAndWhiteDark();
            break;
    }

    $('.no-propagation').click(function(e) {e.stopPropagation()});
    $('.appearance .spcNormal').click(function() {makeNormal()});
    $('.appearance .spcWhiteAndBlack').click(function() {makeBlackAndWhite()});
    $('.appearance .spcDark').click(function() {makeBlackAndWhiteDark()});


    $('#fontSizer').slider({
        min: min,
        max: max,
        range: "min",
        slide: function (event, ui) {
            setFontSize(ui.value);
            changeSliderText('fontSizer', ui.value);
        },
        change: function (event, ui) {
            saveFontSize(ui.value);
        }
    });


    var fontSize = $.cookie("fontSize");
    if (typeof(fontSize) != 'undefined') {
        $("#fontSizer").slider('value', fontSize);
        setFontSize(fontSize);
        changeSliderText('fontSizer', fontSize);
    }

    /****************zoomSizer********************/
    $('#zoomSizer').slider({
        min: minzoom,
        max: maxzoom,
        range: "min",
        slide: function (event, ui) {
            setzoomSizer(ui.value);
            changeSliderTextZoom('zoomSizer', ui.value);
        },
        change: function (event, ui) {
            savezoomSizer(ui.value);
        }
    });

    var zoomSizer = $.cookie("zoomSizer");
    if (typeof(zoomSizer) != 'undefined') {
        $("#zoomSizer").slider('value', zoomSizer);
        setzoomSizer(zoomSizer);
        changeSliderTextZoom('zoomSizer', zoomSizer);
    }

});

var minzoom = 0,
    maxzoom = 5; /** максимум 5 **/

function savezoomSizer(size) {
    $.cookie("zoomSizer", size, {path: '/'});
}

function changeSliderTextZoom(sliderId, value) {
    var position = Math.round(Math.abs(100 - (20 * (maxzoom - value))));
    $('#' + sliderId).prev('.sliderZoom').children('.range').text(position);
}
function setzoomSizer(size) {
    if (size < minzoom) {
        size = minzoom;
    }
    if (size > maxzoom) {
        size = maxzoom;
    }
    $('body').css({
        'zoom': '1.' + parseInt(size),
        '-ms-zoom': '1.' + parseInt(size),
        '-webkit-zoom': '1.' + parseInt(size),
        // '-moz-zoom': '1.' + parseInt(size),
        // '-o-zoom': '1.' + parseInt(size),
        '-moz-transform': 'scale(1.'+parseInt(size)+')',
        // '-webkit-transform': 'scale(1.'+parseInt(size)+')',
        // 'transform': "scale(1."+parseInt(size)+")",
        // 'margin-top': ""+ (parseInt(size) + 20) +"%",
    });

}