/**
 * Created by Azamat Mirvosiqov on 20/03/2015.
 */

var ajaxQuery = $.ajax();

var lang = $('html').attr('lang');

var narrator = {

    init: function(){
        if ($("#speech").length < 1) {
            $('body').append('<audio id="speech" src=""></audio>');
        }
    },

    player : function(){
        return document.getElementById('speech');
    },

    speak: function(text){
        var player = this.player();

        ajaxQuery.abort();
        ajaxQuery = $.ajax({
            type: "POST",
            url: "/uz/narrator/read",
            data: { text: text.trim()},
            cache: false,
            //async: false,
            success : function(data){
                $('.narratorBox .loading').remove();
                player.setAttribute('src', data);
                player.play();
            }
        });

        player.addEventListener("ended", function() {
            $('.narratorBox').removeClass('loadingCursor');
        });
    },

    setVolume: function(vol){
        var player = this.player();
        if (vol > 100 || vol < 25){
            vol = 100;
        }
        player.volume = (vol/100);
    },

    play: function(){
        var player = this.player();
        player.play();
    },

    stop: function(){
        var player = this.player();
        if (player) {
            player.pause();
            player.currentTime = 0;
        }
        ajaxQuery.abort();
    }
};


$(document).ready(function(){

    $.fn.narrator = '1.0.0';

    $('p, .alert-info, .call-bold,.call_descrpt,td,th, a, span, h1, h2, h3, h4, h5, h6, label, article, b, strong, i, li, .panel-heading').hoverIntent({
        over: function(){
            if ($("#speech").length == 1 && $('.narratorBox').length == 0) {
                var text = $(this).text();
                if ($.trim(text).length > 0) {
                    $(this).addClass('narratorBox loadingCursor');
                    $('.narratorBox').append('<div class="loading"></div>');
                    narrator.speak(text);
                }
            }
        },
        timeout: 0,
        interval: 500,
        out: function(){
            $('.narratorBox').removeClass('loadingCursor');
            $('.narratorBox .loading').remove();
            $(this).removeClass('narratorBox');
            narrator.stop();
            ajaxQuery.abort();
        }
    });

    $('[data-toggle="tooltip"], .dataTooltip').hoverIntent({
        over: function(){
            if ($("#speech").length == 1) {
                var text = $(this).attr('data-original-title');
                if ($.trim(text).length > 0) {
                    $(this).addClass('narratorBox loadingCursor');
                    $('.narratorBox').append('<div class="loading"></div>');
                    narrator.speak(text);
                }
            }
        },
        timeout: 0,
        interval: 500,
        out: function(){
            $('.narratorBox').removeClass('loadingCursor');
            $('.narratorBox .loading').remove();
            $(this).removeClass('narratorBox');
            narrator.stop();
            ajaxQuery.abort();
        }
    });
});