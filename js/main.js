$(document).ready(function () {

    $(document).ready(function () {
        $(".footer-part").append("<link href=\'/css/service-cards.css?v3\' rel=\'stylesheet\'>");
        $(".footer-part").append("<link href=\'/css/jquery-ui.css\' rel=\'stylesheet\'>");
        $(".footer-part").append("<link href=\'/css/specialView.css\' rel=\'stylesheet\'>");
    })

    var liUse = $('.cabinetProfileMenu li>ul>li');
    if (liUse.hasClass('active')) {
        liUse.parent('ul').addClass('open');
    } else {
        liUse.parent('ul').removeClass('open');
    }

    /**
     * Replace all SVG images with inline SVG
     */
    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    $('.navigate_menu').click(function () {
        $('.slide_menu').toggleClass('active')
        $('.slide_content').toggleClass('active')
    });

    $('.btn-fix-menu').click(function () {
        $('.mobile-menu').slideToggle();
        $('.wrapper').toggleClass('close');
    });

    $('.cabinetProfileMenu>li>a').click(function (e) {
        if ($(this).parent('li').has('ul').length) {
            e.preventDefault();
        }
        if ($(this).parent('li').hasClass('active')) {
            $(this).parent('li').removeClass('active');
        } else {
            $(this).parent('li').addClass('active');
        }
    });


    $('.btn_wave').mousedown(function (e) {
        var target = e.target;
        var rect = target.getBoundingClientRect();
        var ripple = target.querySelector('.ripple');
        $(ripple).remove();
        ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
        var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
        var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
        ripple.style.top = top + 'px';
        ripple.style.left = left + 'px';
        return false;
    });

    if ($('div').hasClass('table-vert')) {
        $('.table-vert thead th:not(:first-child):not(:last-child)').each(function (i, e) {
            $(e).html('<p>' + $(e).text() + '</p>')
        });
    }

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $('.btn_check').click(function () {
        $('#receipt-content').print();
    });

    // $('.mobile-owl-tabs').owlCarousel({
    //     autoWidth: true,
    //     loop: true,
    //     nav: true,
    // });
});

function scrollToActiveStep(stepContent) {
    var objXPos = Math.round($(stepContent + ' li.active').offset().left - $(stepContent).offset().left);
    objXPos -= ($(stepContent).width() / 2) - ($(stepContent + ' li.active').width());
    $(stepContent).stop().animate({
        scrollLeft: '+=' + objXPos
    }, 1000, "easeOutQuad");
}

function toggleSidebar(side) {
    if (side !== "left" && side !== "right") {
        return false;
    }
    var left = $("#sidebar-left"),
        right = $("#sidebar-right"),
        content = $("#content"),
        openSidebarsCount = 0,
        contentClass = "";

    if (side === "left") {
        left.toggleClass("collapsed");
        right.addClass("collapsed");
    } else if (side === "right") {
        right.toggleClass("collapsed");
        left.addClass("collapsed");
    }

    if (!left.hasClass("collapsed")) {
        openSidebarsCount += 1;
    }

    if (!right.hasClass("collapsed")) {
        openSidebarsCount += 1;
    }

    if (openSidebarsCount === 0) {
        contentClass = "col-xs-12";
    } else if (openSidebarsCount === 1) {
        contentClass = "col-xs-9";
    } else {
        contentClass = "col-xs-6";
    }

    content.removeClass("col-xs-12 col-xs-9 col-xs-6")
        .addClass(contentClass);
}

$(document).ready(function () {

    $('.switch-btn').click(function (e) {
        e.preventDefault();

        var obj = $(this).attr('data-switch');

        $(obj).slideToggle(300);
    });


    $('.big_search .dropdownBtn').click(function () {
        $(this).parents('.big_search').toggleClass('open');
    });
    $('#servicefilterform-user_type .checkbox').addClass('select_user_type');
    $("#servicefilterform-user_type .checkbox label").replaceWith(function (index, oldHTML) {
        return $("<span>").html(oldHTML);
    });


    $('.select_tick, .select_user_type').click(function () {
        $(this).toggleClass('active');

        if (!$(this).hasClass('active')) {
            $(this).find('input').prop("checked", false);
        } else {
            $(this).find('input').prop("checked", true);
        }
    });

    $('[data-toggle="tooltip"], .dataTooltip').tooltip();

    $('.btn_link, .sphere ').hover(function () {
        $(this).parents('li').addClass('active')

    }, function () {
        $(this).parents('li').removeClass('active')
    });

    $('body').append('<div class="scroll_up"></div>');
    $(window).scroll(function () {
        if ($(this).scrollTop() > 170) {
            $('.scroll_up').fadeIn();
            $('.head').addClass('active');
        } else {
            $('.scroll_up').fadeOut();
            $('.head').removeClass('active');
        }
    });
    $('.scroll_up').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    (function ($) {

        $.fn.parallax = function (options) {
            var windowHeight = $(window).height();
            var settings = $.extend({
                speed: 0.15
            }, options);
            return this.each(function () {
                var $this = $(this);

                $(document).scroll(function () {
                    var scrollTop = $(window).scrollTop();
                    var offset = $this.offset().top;
                    var height = $this.outerHeight();

                    if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
                        return;
                    }

                    var yBgPosition = Math.round((offset - scrollTop) * settings.speed);

                    $this.css('background-position', 'center ' + yBgPosition + 'px');
                });
            });
        }
    }(jQuery));

    $('.s1, .s2').parallax({
        speed: -0.6
    });
});


$(function () {
    $('body').on('click', '.kadastr_numb_list li a', function () {
        var id = $(this).parent().data('id');
        var container = '.informer[data-id="' + id + '"]';

        $('.kadastr_numb_list li').removeClass('active');
        $(this).parent().addClass('active');

        $('.informer').removeClass('active_informer_item');
        $(container).addClass('active_informer_item');

        return false;
    });

    $('#catBtn').click(function (e) {
        e.preventDefault();
        toggleSidebar('left');
    });

    $('#serviceInfoBtn').click(function (e) {
        e.preventDefault();
        toggleSidebar('right')

    });


    $('#w1.alert.fade.in').attr('data-tooltip', 'tr');
    $(function () {
        $("#w0 .task_status_blue").mousemove(function (eventObject) {
            $data_tooltip = $(this).attr("data-tooltip");
            $("#w1.alert.fade.in").html($data_tooltip)
                .css({
                    "top": eventObject.pageY + 5,
                    "left": eventObject.pageX + 5
                })
                .show();
        }).mouseout(function () {
            $("#w1.alert.fade.in").hide()
                .css({
                    "top": 0,
                    "left": 0
                });
        });
        toggleSidebar('right')
    });


    $('#w1.alert.fade.in').attr('data-tooltip', 'tr');
    $(function () {
        $("#w0 .task_status_blue").mousemove(function (eventObject) {
            $data_tooltip = $(this).attr("data-tooltip");
            $("#w1.alert.fade.in").html($data_tooltip)
                .css({
                    "top": eventObject.pageY + 5,
                    "left": eventObject.pageX + 5
                })
                .show();
        }).mouseout(function () {
            $("#w1.alert.fade.in").hide()
                .css({
                    "top": 0,
                    "left": 0
                });
        });
    });


    if (document.location.href == 'https://my.gov.uz/ru' || document.location.href == 'https://my.gov.uz/ru/juridicalCabinet/site/index') {
        $('body').addClass('main_body');
    }
    if (document.location.href == 'https://my.gov.uz/uz' || document.location.href == 'https://my.gov.uz/uz/juridicalCabinet/site/index') {
        $('body').addClass('main_body');
    }
    if (document.location.href == 'https://my.gov.uz/oz' || document.location.href == 'https://my.gov.uz/oz/juridicalCabinet/site/index') {
        $('body').addClass('main_body');
    }

    if (window.location.href.indexOf("https://my.gov.uz/uz/juridicalCabinet/all-services") > -1) {
        $('body').addClass('main_body');
    }
    if (window.location.href.indexOf("https://my.gov.uz/oz/juridicalCabinet/all-services") > -1) {
        $('body').addClass('main_body');
    }
    if (window.location.href.indexOf("https://my.gov.uz/ru/juridicalCabinet/all-services") > -1) {
        $('body').addClass('main_body');
    }

    if (window.location.href.indexOf("https://my.gov.uz/uz/all-services") > -1) {
        $('body').addClass('main_body');
    }
    if (window.location.href.indexOf("https://my.gov.uz/oz/all-services") > -1) {
        $('body').addClass('main_body');
    }
    if (window.location.href.indexOf("https://my.gov.uz/ru/all-services") > -1) {
        $('body').addClass('main_body');
    }

    $(function () {
        $("#tabs_car").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
        $("#tabs_car li").removeClass("ui-corner-top").addClass("ui-corner-left");
    });


    $('.drop_ftl').click(function () {
        if ($(this).hasClass("dropdown_3")) {
            $("#w2").toggleClass('flt_block_new');
        }
        $(this).parent('.sec-center').toggleClass('fl_new');
        if ($(".sec-center ").hasClass("fl_new")) {
            $("#w2").addClass('flt_block');
        } else {
            $("#w2").removeClass('flt_block');
        }
    });


    var btn_top_sc = $('#button_top');

    $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
            btn_top_sc.addClass('show');
        } else {
            btn_top_sc.removeClass('show');
        }
    });
    btn_top_sc.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, '300');
    });


    if (window.location.href.indexOf("en/service/77") > -1) {
        $('body').addClass('body_inner_service');
    }
    if (window.location.href.indexOf("en/service/63") > -1) {
        $('body').addClass('body_inner_service');
    }
    if (window.location.href.indexOf("en/service/498") > -1) {
        $('body').addClass('body_inner_service');
    }
    if (window.location.href.indexOf("en/service/470") > -1) {
        $('body').addClass('body_inner_service');
    }
    if (window.location.href.indexOf("en/service/138") > -1) {
        $('body').addClass('body_inner_service');
    }
    if (window.location.href.indexOf("en/service/246") > -1) {
        $('body').addClass('body_inner_service');
    }
    if (window.location.href.indexOf("en/service/57") > -1) {
        $('body').addClass('body_inner_service');
    }
    if (window.location.href.indexOf("en/service/403") > -1) {
        $('body').addClass('body_inner_service');
    }
    if (window.location.href.indexOf("en/service/300") > -1) {
        $('body').addClass('body_inner_service');
    }
    if (window.location.href.indexOf("en/service/187") > -1) {
        $('body').addClass('body_inner_service');
    }

    let table_more = "<div class=\"table_more_btn\"><i class=\"fa fa-arrow-down\" aria-hidden=\"true\"></i></div>";
    let table_th1 = $("#myTabContent table.styledTable thead tr th:first-child").html();
    let table_th2 = $("#myTabContent table.styledTable thead tr th:nth-child(2)").html();
    let table_th3 = $("#myTabContent table.styledTable thead tr th:nth-child(3)").html();
    let table_th4 = $("#myTabContent table.styledTable thead tr th:nth-child(4)").html();
    let table_th5 = $("#myTabContent table.styledTable thead tr th:last-child").text();


    let table_tb2 = $("#myTabContent table.styledTable tbody tr td:nth-child(2)").prepend(table_th2);
    let table_tb3 = $("#myTabContent table.styledTable tbody tr td:nth-child(3)").prepend(table_th3);
    let table_tb4 = $("#myTabContent table.styledTable tbody tr td:nth-child(4)").prepend(table_th4);
    let table_tb5 = $("#myTabContent table.styledTable tbody tr td:last-child").prepend(table_th5);


    $('.tab-content .styledTable thead a').click(function (event) {
        event.preventDefault();
    });

    if (window.location.href.indexOf("mrzp") > -1) {
        $('.table.table-hover.noLinks thead a').click(function (evt) {
            evt.preventDefault();
        });
    }

    if (window.location.href.indexOf("all-services") > -1) {
        let txt = $("li.active .labelTitle").text();
        $("title").text(txt);
    }

    $("#individualinfoformgettingattorneydrive-date").keydown(function (event) {
        return false;
    });
    $('#individualinfoformgettingattorneydrive-date').prop('readonly', true);


    $('#account_number').bind('input', function () {
        $(this).val(function (_, v) {
            return v.replace(/\s+/g, '');
        });
    });

    if (window.location.href.indexOf("all-services?id=12") > -1) {
        $('.serviceCardHolder .card_icon img').attr('src', '/uploads/sphere/f62314c5-bd1b-f614-74a3-625563e6404d.png?v=2');
    }

    $('.site-error .folder_error .cover ').empty();


    if($(window).width() < 991)
    {
        $('.tab-style.nav.nav-tabs.nopade.owl_kidergarten.owl-carousel').each(function(){
            const list=$(this),
                select=$(document.createElement('select')).insertBefore($(this).hide()).change(function(){
                    window.open($(this).val(),'_self');
                });
            select.addClass("kindergartenDrop");
            $('>li a', this).each(function(){
                const option=$(document.createElement('option'))
                    .appendTo(select)
                    .val(this.href)
                    .html($(this).html());
            });
            list.remove();
        });
    }

    $(".field-bankinfoformeducationalstudentscredit-pact.required label").append("<a href='https://lex.uz/uz/docs/6163025' target='_blank'>https://lex.uz/uz/docs/6163025</a>");

    $(".request-view #w1 + div.text-center ").prepend($(".request-view .alert-info.text-center"));

    if (window.location.href.indexOf("pages/service-price") > -1) {
        $('h4#userName').remove();
    }


    $('body .paymentDetailsButtonHiddenShow').remove();
    $("#payNewEvent").click(function(){
        $(".newPayDescrption").slideToggle();
        $("#paymentDetails").slideUp();
        $(this).toggleClass('active');
        $('.newPayViewMore').removeClass('active');
    });
    $(".newPayViewMore").click(function(){
        $(".newPayDescrption").slideUp();
        $("#paymentDetails").slideToggle();
        $(this).toggleClass('active');
        $('#payNewEvent').removeClass('active');
    });

    $(document).ready(function () {
        let srok  = $("#setDateByDay").text();
        let addDay = parseInt(srok);
        let date = new Date();
        date.setDate(date.getDate() + addDay);
        let dateN =  ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '.' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '.' + + date.getFullYear();
        $("#setDateByDay").text(dateN);
    });

    if (window.matchMedia('(max-width: 991px)').matches) {
        $(".second_timeline .btn.btn-default.pull-right").appendTo(".requestTitleBox");
        $(".second_timeline .btn.btn-danger.pull-right").appendTo(".request-view");
        $(".requestTitleBox .btn.btn-default.pull-right").addClass('mobileSvg');
        $(".requestTitleBox .mobileSvg").remove();
    }

    $("#qrPayDesc").click(function(){
        $(".qrDescription ").fadeToggle("fast");
    });

    $('#creditMask').on('input propertychange', function() {
        let node = $('#creditMask')[0];
        let cursor = node.selectionStart;
        let lastValue = $('#creditMask').val();
        let formattedValue = formatCardNumber(lastValue);
        $('#creditMask').val(formattedValue);
        if(cursor === lastValue.length) {
            cursor = formattedValue.length;
            if($('#creditMask').attr('data-lastvalue') && $('#creditMask').attr('data-lastvalue').charAt(cursor - 1) == " ") {
                cursor--;
            }
        }
        if (lastValue !== formattedValue) {
            if(lastValue.charAt(cursor) == " " && formattedValue.charAt(cursor - 1) == " ") {
                cursor++;
            }
        }
        node.selectionStart = cursor;
        node.selectionEnd = cursor;
        $('#creditMask').attr('data-lastvalue', formattedValue);
    });
    function formatCardNumber(value) {
        var value = value.replace(/\D/g, '');
        let formattedValue;
        let maxLength;
        if ((/^3[47]\d{0,13}$/).test(value)) {
            formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ');
            maxLength = 17;
        } else if((/^3(?:0[0-5]|[68]\d)\d{0,11}$/).test(value)) { // diner's club, 14 digits
            formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ');
            maxLength = 16;
        } else if ((/^\d{0,16}$/).test(value)) { // regular cc number, 16 digits
            formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{4})/, '$1 $2 ').replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
            maxLength = 19;
        }
        $('#creditMask').attr('maxlength', maxLength);
        return formattedValue;
    }

    var expiryMask = function() {
        var inputChar = String.fromCharCode(event.keyCode);
        var code = event.keyCode;
        var allowedKeys = [8];
        if (allowedKeys.indexOf(code) !== -1) {
            return;
        }

        event.target.value = event.target.value.replace(
            /^([1-9]\/|[2-9])$/g, '0$1/'
        ).replace(
            /^(0[1-9]|1[0-2])$/g, '$1/'
        ).replace(
            /^([0-1])([3-9])$/g, '0$1/$2'
        ).replace(
            /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2'
        ).replace(
            /^([0]+)\/|[0]+$/g, '0'
        ).replace(
            /[^\d\/]|^[\/]*$/g, ''
        ).replace(
            /\/\//g, '/'
        );
    }

    var splitDate = function($domobj, value) {
        var regExp = /(1[0-2]|0[1-9]|\d)\/(20\d{2}|19\d{2}|0(?!0)\d|[1-9]\d)/;
        var matches = regExp.exec(value);
        $domobj.siblings('input[name$="expiryMonth"]').val(matches[1]);
        $domobj.siblings('input[name$="expiryYear"]').val(matches[2]);
    };

    $('#creditCardDate').on('keyup', function(){
        expiryMask();
    });

    $('#creditCardDate').on('focusout', function(){
        splitDate($(this), $(this).val());
    });

    $('input[name=payment_source]').change(function () {
        if (this.value == 'upay_source') {
            $("#telNumPayment").show();
        } else {
            $("#telNumPayment").hide();
        }
    });
    MaskedInput({
        elm: document.getElementById('telNumPayment'),
        format: '+998 (__) ___-__-__',
        separator: '+998 ()-'
    });

    $('#appNotifyPhoneNum').inputmask("+999 (99) 999-99-99");

    if($(window).width() < 767){
        let step = $(".serviceStepsList li.active .serviceStepId").text();
        let stepName = $(".serviceStepsList li.active .serviceStepDescription").text();
        $(".serviceStepsListBox").append(
            "<div class='mobileStep'><p><span id='mobileStep'></span><span id='mobileStepTitle'></span></p><div id='mobileProgress'><div class='progressPerWrap'><div class='progresPer'></div></div><span id='mobilePercent'></span></div></div>"
        );
        let stepCount = $("#serviceSteps li.active").index() + 1 ;
        let countLength = $('#serviceSteps li').length;
        $("#mobileStep").text(step + ": ");
        $("#mobileStepTitle").text(stepName);
        let calcPercent = (100/countLength)*stepCount;
        $("#mobilePercent").text(calcPercent.toFixed(0) + "%");
        $(".progresPer").css('width',calcPercent.toFixed(0) + "%");
        $("#serviceSteps").remove();

    }

    if (window.location.href.indexOf("service/302") > -1) {
        $(".service_passport_btns .service_button").click(function (e) {
            e.preventDefault();
            window.location.replace("/connection/index");
        });
    }


    const tabs = document.querySelectorAll('.type-of-services-list [role="tab"]');

    function activateTab(newIndex) {
        tabs.forEach((tab, index) => {
            const isSelected = index === newIndex;
            tab.setAttribute('aria-selected', isSelected);
            tab.setAttribute('tabindex', isSelected ? '0' : '-1');
            tab.setAttribute('aria-hidden', false);
            if (isSelected) {
                tab.focus();
                tab.click();
            }
        });
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                event.preventDefault();
                const nextIndex = (index + 1) % tabs.length;
                activateTab(nextIndex);
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                const prevIndex = (index - 1 + tabs.length) % tabs.length;
                activateTab(prevIndex);
            }
        });
    });

    $("#userName").click(function(){
        window.location.href = '/user/index';
    });

    activateTab(0);

    let lastWindowWidth = $(window).width();

    function convertTableToList() {
        if ($(window).width() <= 768) {
            $('#p0, #p1, #p2, #p3, #p4, #p5, #p6, #p7, #p8, #p9, #p10').each(function() {
                let table = $(this).find('table');
                let wrapper = $('<div class="mobileListGirdTable"></div>');
                let addButton = table.find('.service_table_btn_create').clone(); // Клонируем кнопку "Добавить"

                if (table.find('tbody tr').length > 0) {
                    table.find('tbody tr').each(function() {
                        let ul = $('<ul></ul><hr></hr>');
                        let rowEmpty = true;

                        $(this).find('td').each(function(index) {
                            let header = table.find('thead th').eq(index).text().trim();
                            let cellContent = $(this).html().trim();

                            if (cellContent !== '' && cellContent !== '<div class="empty">Ничего не найдено.</div>') {
                                rowEmpty = false;
                            }

                            let li = $('<li><span>' + header + '</span><b>' + cellContent + '</b></li>');
                            ul.append(li);
                        });

                        wrapper.append(ul);
                    });
                }

                let addButtonDiv = $('<div class="addButtonContainer"></div>');
                addButtonDiv.append(addButton);
                wrapper.append(addButtonDiv);

                table.after(wrapper);
                table.remove();
            });
        }
    }

    convertTableToList();

    $(window).resize(function() {
        let currentWindowWidth = $(window).width();

        if (currentWindowWidth !== lastWindowWidth) {
            lastWindowWidth = currentWindowWidth;
            $('.mobileListGirdTable').remove();
            convertTableToList();
        }
    });

    function transformTableToList() {
        if ($(window).width() <= 768) {
            $('table.table.table-striped.table-bordered.table-condensed').each(function() {
                const $table = $(this);

                if ($table.data('transformed') === true) return;

                const headers = [];
                $table.find('thead th').each(function() {
                    headers.push($(this).text());
                });

                const $listContainer = $('<div class="table-as-list"></div>');

                $table.find('tbody tr').each(function() {
                    const $row = $(this);
                    const $listItem = $('<div class="list-item"></div><hr></hr>');

                    $row.children('td').each(function(index) {
                        const $cell = $(this);
                        const label = headers[index] || '';
                        const $field = $('<div class="list-field"></div>');

                        $field.append(`<strong>${label}:</strong> `);
                        $field.append($cell.html());
                        $listItem.append($field);
                    });

                    $listContainer.append($listItem);
                });

                $table.after($listContainer);
                $table.hide();
                $table.data('transformed', true);
            });
        } else {
            $('table').each(function() {
                $(this).show();
                $(this).next('.table-as-list').remove();
                $(this).data('transformed', false);
            });
        }
    }

    transformTableToList();
    $(window).resize(transformTableToList);

    $(document).on('click', '.form-group .fa-question-circle', function(event) {
        event.preventDefault();
        $(this).closest('.form-group').find('input').blur();
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modal = document.getElementById('mapView');
            if (modal && getComputedStyle(modal).display === 'flex') {
                modal.classList.add('animate__fadeOutBottomRight');
            }
        }
    });


    // Focus for Sitemap
    (() => {
        const menuButton = document.querySelector('#topMap');
        const firstMenuItem = document.querySelector('.listMap .for-brauser li a');
        const logoImgDiv = document.querySelector('.logo-img');
        let openMap = false;
        if (menuButton && firstMenuItem && logoImgDiv) {
            menuButton.addEventListener('click', () => {
                openMap = true;

                setTimeout(() => {
                    firstMenuItem.focus();
                    firstMenuItem.style.outline = '2px solid #11a8ec';
                    setTimeout(() => {
                        firstMenuItem.style.outline = '';
                    }, 2000);
                }, 2000);
            });
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && openMap) {
                    openMap = false;

                    setTimeout(() => {
                        logoImgDiv.focus();
                    }, 0);
                }
            });
            console.log("Focus activated for Sitemap");
        } else {
            console.warn("Selectors are not correct");
        }
    })();
    // end Sitemap focus for


    // MUXLISA AI INKLUZIVNOST
    (function() {
        function updateMessages() {
            const messages = document.querySelectorAll('.chatbox .chat p');
            messages.forEach((message) => {
                if (!message.hasAttribute('tabindex')) {
                    message.setAttribute('tabindex', '0');
                    message.addEventListener('keydown', (event) => {
                        if (event.code === 'Space') {
                            event.preventDefault();
                            const inputField = document.querySelector('.chat-input textarea');
                            if (inputField) {
                                inputField.focus();
                            }
                        }
                    });
                }
            });

            document.querySelectorAll('.chatbox .chat p a').forEach((link) => {
                link.setAttribute('tabindex', '-1');
            });
        }

        function enableScreenReaderAnnouncements() {
            const liveRegion = document.createElement('div');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('role', 'alert');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.position = 'absolute';
            liveRegion.style.left = '-9999px';
            document.body.appendChild(liveRegion);

            const chatContainer = document.querySelector('.chatbox');
            if (chatContainer) {
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.addedNodes.length > 0) {
                            mutation.addedNodes.forEach((node) => {
                                if (node.classList && node.classList.contains('chat')) {
                                    const newMessage = node.querySelector('p');
                                    if (newMessage) {
                                         liveRegion.textContent = newMessage.textContent; // Отправляем текст в live region
                                    }
                                }
                            });
                        }
                    });
                });

                observer.observe(chatContainer, { childList: true, subtree: true });
            }
        }

        function updateChatVisibilityForScreenReader() {
            const chatWidget = document.querySelector('.chatbot');
            const body = document.body;
            const isChatVisible = body.classList.contains('show-chatbot');

            if (chatWidget) {
                const chatElements = chatWidget.querySelectorAll('.chatbox .chat, .chatbox .chat p, .chat-input, .chatbot-toggler');
                chatElements.forEach((el) => {
                    if (isChatVisible) {
                        el.removeAttribute('aria-hidden');
                        el.removeAttribute('tabindex');
                        el.removeAttribute('inert');
                    } else {
                        el.setAttribute('aria-hidden', 'true');
                        el.setAttribute('tabindex', '-1');
                        el.setAttribute('inert', '');
                    }
                });
            }
        }

        updateMessages();

        const chatContainer = document.querySelector('.chatbox');
        if (chatContainer) {
            const observer = new MutationObserver(() => {
                updateMessages();
            });

            observer.observe(chatContainer, { childList: true, subtree: true });
        }

        enableScreenReaderAnnouncements();

        const chatbotToggler = document.querySelector('.chatbot-toggler');
        if (chatbotToggler) {
            chatbotToggler.addEventListener('click', () => {
                const inputField = document.querySelector('.chat-input textarea');
                if (inputField) {
                    inputField.focus(); // Устанавливаем фокус на поле ввода
                }

                updateChatVisibilityForScreenReader();

                updateMessages();
            });
        }

        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === 'm') {
                event.preventDefault();
                if (chatbotToggler) {
                    chatbotToggler.click();
                }
            }
        });

        function checkChatVisibility() {
            const body = document.body;
            const isChatVisible = body.classList.contains('show-chatbot');
            if (isChatVisible) {
                // Чат видим, делаем его доступным для скринридера
                updateChatVisibilityForScreenReader();
                const inputField = document.querySelector('.chat-input textarea');
                if (inputField) {
                    inputField.focus();
                }
                updateMessages();
            } else {
                updateChatVisibilityForScreenReader();
            }
        }

        checkChatVisibility();

        const body = document.body;
        const observerBody = new MutationObserver(() => {
            checkChatVisibility();
        });
        observerBody.observe(body, { attributes: true, attributeFilter: ['class'] });

        let currentMessageIndex = -1;
        function switchFocusOnArrowKeys(event) {
            if (event.key === 'ArrowDown') {
                const messages = document.querySelectorAll('.chatbox .chat p');
                if (messages.length > 0) {
                    currentMessageIndex = (currentMessageIndex + 1) % messages.length; // Зацикливание
                    messages[currentMessageIndex].focus();
                }
            } else if (event.key === 'ArrowUp') {
                const messages = document.querySelectorAll('.chatbox .chat p');
                if (messages.length > 0) {
                    currentMessageIndex = (currentMessageIndex - 1 + messages.length) % messages.length; // Зацикливание
                    messages[currentMessageIndex].focus();
                }
            }
        }

        document.addEventListener('keydown', switchFocusOnArrowKeys);

    })();
    // MUXLISA AI INKLUZIVNOST
});


const eventRegistry = new WeakMap();
function registerEvent(element, event, handler) {
    if (!eventRegistry.has(element)) {
        eventRegistry.set(element, new Set());
    }
    const events = eventRegistry.get(element);

    if (!events.has(event)) {
        element.addEventListener(event, handler);
        events.add(event);
    }
}