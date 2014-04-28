if(redirection_toClearURL()){

}else if(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL){
    redirection_execute(PAGE_FINDFRIENDS, PAGE_INDEX, ERR_MSG_PLEASE_SIGNIN);
}else{
    var anchor=jQuery.url.attr("anchor");
    if(anchor==null){
        var address=window.location.href+ANCHOR_RECOMMEND;
        window.location.href=address.replace("##", "#");
    }
}

var ffCurrentAnchor=null;

function fireAnchorTabChanged(currentAnchor){
    ffCurrentAnchor=currentAnchor;
    if(currentAnchor==ANCHOR_INVITE){
        $('#invite_head').show();
        $('#btnAddFromAddressBook').show();
        $('#btnInvite').show();
        $('#contact_list').show();
        $('#recommend_head').hide();
        tblFollows_renderFollows();
    }else if(currentAnchor==ANCHOR_RECOMMEND){
        $('#invite_head').hide();
        $('#btnAddFromAddressBook').hide();
        $('#btnInvite').hide();
        $('#contact_list').hide();
        $('#recommend_head').show();
        recommend_recommendPeople();
    }
    common_preventScreenFlash();

}


function recommend_displayMorePeople(){
    var length=display_follows.length;
    if(length>0){
        $('#tableLoadingIcon').show();
        $.ajax({
            url: 'api/users/recommendation'+'?start='+length+'&size=20',
            type: "GET",
            success: function(data){
                if(data!=null){
                    data.user=display_follows.concat(data.user);
                    tblFollows_renderFollows(data);
                }
                $('#tableLoadingIcon').hide();
            },
            error:function (xhr){
                $('#tableLoadingIcon').hide();
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
            }
        });
    }
    return false;
}


function recommend_recommendPeople(){
    $.ajax({
        url: 'api/users/recommendation',
        type: "GET",
        success: function(data){
            tblFollows_renderFollows(data);
        },
        error:function (xhr){
            tblFollows_renderFollows();
        }
    });
    return false;
}



$(document).ready(function() {

    if(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL || redirection_isURLContainsSSLOrWWW()){
        return;
    }

    theme_processDesign();
    $('#btnInvite').click(function(event){
        event.preventDefault();
        $.ajax({
            url: 'api/registration/invite',
            type: "POST",
            data: {
                mailList:$("#contact_list").val()
            },
            success: function(data){
                notifyBar_display("Invite Mail Sended",ICON_URL_NOTIFY_TRUE);
                tblFollows_renderFollows(data);
            },
            error:function(xhr){
                notifyBar_display("Invite Mail Failed"+ ":"+xhr.status,ICON_URL_NOTIFY_WRONG);
            }
        });
        return false;
    });

    mainBar_initialize();
    mainBar_initializeSearch(false);
    notifyBar_initialize();
    mainLinks_initialize(PAGE_FINDFRIENDS);
    redirection_executeOrderAfterNewPageLoad();

    profileTab_initialize();
    profileTab_setContent();

    tblFollows_initialize();
    anchorTab_initialize();
    common_registerMoreActionListener(function(){
        if(ffCurrentAnchor==ANCHOR_RECOMMEND){
            if ( $('#tableLoadingIcon').is(':visible')==false){
                recommend_displayMorePeople();
            }
        }
    });
    
});