//Redirections For Not Login User
if(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL){
    redirection_execute(PAGE_DESIGN, PAGE_INDEX, ERR_MSG_PLEASE_SIGNIN);
}


$(document).ready(function() {

    $('#txtLivePlayerSource').val(cookie_get(COOKIE_CAPABILITY_OF_LIVEPLAYERSOURCE));
    $('#txtLivePlayerSlogan').val(cookie_get(COOKIE_CAPABILITY_OF_LIVEPLAYERSLOGAN));

    if(cookie_get(COOKIE_CAPABILITY_OF_ASKED_TAB_VISB)==TEXT_TRUE){
        $('#vsbAsked').attr('checked','checked');
    }
    if(cookie_get(COOKIE_CAPABILITY_OF_ANSWERED_TAB_VISB)==TEXT_TRUE){
        $('#vsbAnswered').attr('checked','checked');
    }
    if(cookie_get(COOKIE_CAPABILITY_OF_LOVED_TAB_VISB)==TEXT_TRUE){
        $('#vsbLoved').attr('checked','checked');
    }
    if(cookie_get(COOKIE_CAPABILITY_OF_DROPS_TAB_VISB)==TEXT_TRUE){
        $('#vsbDrops').attr('checked','checked');
    }
    if(cookie_get(COOKIE_CAPABILITY_OF_COFFEES_TAB_VISB)==TEXT_TRUE){
        $('#vsbCoffee').attr('checked','checked');
    }
    if(cookie_get(COOKIE_CAPABILITY_OF_PODCAST_TAB_VISB)==TEXT_TRUE){
        $('#vsbPodcast').attr('checked','checked');
    }


    $('#txtPodcast0_Title').val(cookie_get(COOKIE_CAPABILITY_OF_PODCAST0_TITLE));
    $('#txtPodcast0_URL').val(cookie_get(COOKIE_CAPABILITY_OF_PODCAST0_URL));
    $('#txtPodcast1_Title').val(cookie_get(COOKIE_CAPABILITY_OF_PODCAST1_TITLE));
    $('#txtPodcast1_URL').val(cookie_get(COOKIE_CAPABILITY_OF_PODCAST1_URL));
    $('#txtPodcast2_Title').val(cookie_get(COOKIE_CAPABILITY_OF_PODCAST2_TITLE));
    $('#txtPodcast2_URL').val(cookie_get(COOKIE_CAPABILITY_OF_PODCAST2_URL));
    $('#txtPodcast3_Title').val(cookie_get(COOKIE_CAPABILITY_OF_PODCAST3_TITLE));
    $('#txtPodcast3_URL').val(cookie_get(COOKIE_CAPABILITY_OF_PODCAST3_URL));
    $('#txtPodcast4_Title').val(cookie_get(COOKIE_CAPABILITY_OF_PODCAST4_TITLE));
    $('#txtPodcast4_URL').val(cookie_get(COOKIE_CAPABILITY_OF_PODCAST4_URL));
    $('#txtPodcast5_Title').val(cookie_get(COOKIE_CAPABILITY_OF_PODCAST5_TITLE));
    $('#txtPodcast5_URL').val(cookie_get(COOKIE_CAPABILITY_OF_PODCAST5_URL));
    $('#txtPodcast6_Title').val(cookie_get(COOKIE_CAPABILITY_OF_PODCAST6_TITLE));
    $('#txtPodcast6_URL').val(cookie_get(COOKIE_CAPABILITY_OF_PODCAST6_URL));
    $('#txtPodcast7_Title').val(cookie_get(COOKIE_CAPABILITY_OF_PODCAST7_TITLE));
    $('#txtPodcast7_URL').val(cookie_get(COOKIE_CAPABILITY_OF_PODCAST7_URL));



    $("#btnLivePlayerSource").click(function(event){
        event.preventDefault();
        if(common_checkPOST()){
            var liveplayercapability = new Object();
            liveplayercapability.source= $('#txtLivePlayerSource').val();
            liveplayercapability.slogan= $('#txtLivePlayerSlogan').val();
            var liveplayercapabilityJSON = $.toJSON(liveplayercapability);

            $.ajax({
                url: 'api/users/capabilityofliveplayer',
                type: "PUT",
                data: (liveplayercapabilityJSON),
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                success: function(data){
                    cookie_saveLoginUser(data,false); //TODO change false
                },
                error:function (xhr){
                    xhr=xhr;
                }
            });
        }
        return false;
    });


    $("#btnPodcast").click(function(event){
        event.preventDefault();
        if(common_checkPOST()){
            var podcastcapabilities = new Object();
            podcastcapabilities.podcast0Title= $('#txtPodcast0_Title').val();
            podcastcapabilities.podcast0URL= $('#txtPodcast0_URL').val();
            podcastcapabilities.podcast1Title= $('#txtPodcast1_Title').val();
            podcastcapabilities.podcast1URL= $('#txtPodcast1_URL').val();
            podcastcapabilities.podcast2Title= $('#txtPodcast2_Title').val();
            podcastcapabilities.podcast2URL= $('#txtPodcast2_URL').val();
            podcastcapabilities.podcast3Title= $('#txtPodcast3_Title').val();
            podcastcapabilities.podcast3URL= $('#txtPodcast3_URL').val();
            podcastcapabilities.podcast4Title= $('#txtPodcast4_Title').val();
            podcastcapabilities.podcast4URL= $('#txtPodcast4_URL').val();
            podcastcapabilities.podcast5Title= $('#txtPodcast5_Title').val();
            podcastcapabilities.podcast5URL= $('#txtPodcast5_URL').val();
            podcastcapabilities.podcast6Title= $('#txtPodcast6_Title').val();
            podcastcapabilities.podcast6URL= $('#txtPodcast6_URL').val();
            podcastcapabilities.podcast7Title= $('#txtPodcast7_Title').val();
            podcastcapabilities.podcast7URL= $('#txtPodcast7_URL').val();

            var podcastcapabilitiesJSON = $.toJSON(podcastcapabilities);

            $.ajax({
                url: 'api/users/capabilityofpodcast',
                type: "PUT",
                data: (podcastcapabilitiesJSON),
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                success: function(data){
                    cookie_saveLoginUser(data,false); //TODO change false
                },
                error:function (xhr){
                    xhr=xhr;
                }
            });
        }
        return false;
    });


    $("#btnTabVisibility").click(function(event){
        event.preventDefault();
        if(common_checkPOST()){
            var tabvisibilitycapabilities = new Object();
            tabvisibilitycapabilities.askedTabVisb=$('#vsbAsked').is(':checked');
            tabvisibilitycapabilities.answeredTabVisb=$('#vsbAnswered').is(':checked');
            tabvisibilitycapabilities.lovedTabVisb= $('#vsbLoved').is(':checked');
            tabvisibilitycapabilities.coffeeTabVisb= $('#vsbCoffee').is(':checked');
            tabvisibilitycapabilities.dropsTabVisb= $('#vsbDrops').is(':checked');
            tabvisibilitycapabilities.podcastTabVisb= $('#vsbPodcast').is(':checked');
            var tabvisibilitycapabilitiesJSON = $.toJSON(tabvisibilitycapabilities);

            $.ajax({
                url: 'api/users/capabilityoftabvisb',
                type: "PUT",
                data: (tabvisibilitycapabilitiesJSON),
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                success: function(data){
                    cookie_saveLoginUser(data,false); //TODO change false
                },
                error:function (xhr){
                    xhr=xhr;
                }
            });
        }
        return false;
    });


});





