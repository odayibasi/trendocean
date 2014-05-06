$(document).ready(function() {

    if(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL ||redirection_isURLContainsSSLOrWWW()){
        return;
    }

    theme_processDesign();
    document.title="TrendOcean / "+cookie_get(COOKIE_USERNAME)+"'s notifications";
    mainBar_signPageName(MAINBAR_LINK_SETTING);
    $(window).unload(function() {
        mainBar_unsignPageName(MAINBAR_LINK_SETTING);
    });

    $("#icoWaiting").hide();
    mainBar_initialize();
    mainBar_initializeSearch(false);
    notifyBar_initialize();
    mainLinks_initialize(PAGE_NOTIFICATIONS);
    
    //Load From Cookies
    var ntfy_followsMe=cookie_get(COOKIE_NOTFY_WHENSOMEBODYFOLLOWSME);
    var ntfy_askedQuestion=cookie_get(COOKIE_NOTFY_WHENFRIENDASKEDQUESTION);
    var nyfy_commentQuestion=cookie_get(COOKIE_NOTFY_WHENMYQUESTIONARECOMMENTED);
    var nyfy_lovesQuestion=cookie_get(COOKIE_NOTFY_WHENMYQUESTIONARELOVED);
    var nyfy_abuseQuestion=cookie_get(COOKIE_NOTFY_WHENMYQUESTIONAREFLAGGED);
    var ntfy_sendCoffee=cookie_get(COOKIE_NOTFY_WHENSOMEBODYSENDCOFFEE);

    if(ntfy_followsMe==TEXT_TRUE){
        $('#ntfy_follow').attr('checked','checked');
    }else{
        $('#ntfyno_follow').attr('checked','checked');
    }

    if(ntfy_askedQuestion==TEXT_TRUE){
        $('#ntfy_asked').attr('checked','checked');
    }else{
        $('#ntfyno_asked').attr('checked','checked');
    }

    if(nyfy_commentQuestion==TEXT_TRUE){
        $('#ntfy_commented').attr('checked','checked');
    }else{
        $('#ntfyno_commented').attr('checked','checked');
    }

    if(nyfy_lovesQuestion==TEXT_TRUE){
        $('#ntfy_loved').attr('checked','checked');
    }else{
        $('#ntfyno_loved').attr('checked','checked');
    }

    if(ntfy_sendCoffee==TEXT_TRUE){
        $('#ntfy_coffee').attr('checked','checked');
    }else{
        $('#ntfyno_coffee').attr('checked','checked');
    }

    if(nyfy_abuseQuestion==TEXT_TRUE){
        $('#ntfy_flag').attr('checked','checked');
    }else{
        $('#ntfyno_flag').attr('checked','checked');
    }


    $("#btnSaveNotifications").click(function(event){
        event.preventDefault();
        if(common_checkPOST()){
            $("#icoWaiting").show();
    
            var notifications = new Object();
            notifications.notifyWhenSomebodyFollowsMe= $('#ntfy_follow').is(':checked');
            notifications.notifyWhenFriendsAskQuestion= $('#ntfy_asked').is(':checked');
            notifications.notifyWhenMyQuestionsAreCommented= $('#ntfy_commented').is(':checked');
            notifications.notifyWhenMyQuestionAreLoved= $('#ntfy_loved').is(':checked');
            notifications.notifyWhenSomebodySendACoffe= $('#ntfy_coffee').is(':checked');
            notifications.notifyWhenMyQuestionsAreFlagged= $('#ntfy_flag').is(':checked');

            var notificationsJSON = $.toJSON(notifications);

            $.ajax({
                url: 'api/users/notifications',
                type: "PUT",
                data: (notificationsJSON),
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                success: function(data){
                    $("#icoWaiting").hide();
                    cookie_saveLoginUser(data,false); //TODO change false
                    notifyBar_display(INFO_MSG_NOTIFICATIONS_CHANGED,ICON_URL_NOTIFY_TRUE);
                },
                error:function (xhr){
                    $("#icoWaiting").hide();
                    notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                }
            });
        }
        return false;
    });

});





