var urlUserName=common_getURLSegment(1);
var peopleCurrentAnchor=null;
var peopleApiURL="";

//Redirections For Not Login User
if(redirection_toClearURL()){
//Do Nothing
}else if(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL){
    redirection_execute(PAGE_FALLOWS, PAGE_INDEX, ERR_MSG_PLEASE_SIGNIN);
}else{
    var anchor=jQuery.url.attr("anchor");
    if(anchor==null){
        window.location.href=window.location.href+ANCHOR_FOLLOWEDS;
    }
}


function fireAnchorTabChanged(currentAnchor){
    peopleCurrentAnchor=currentAnchor;
    if(currentAnchor==ANCHOR_FOLLOWEDS){
        document.title="TrendOcean / "+urlUserName+"'s followeds";
        people_getFollows('../api/users/followed/'+urlUserName);
    }else if(currentAnchor==ANCHOR_FOLLOWERS){
        document.title="TrendOcean / "+urlUserName+"'s followers";
        people_getFollows('../api/users/follower/'+urlUserName);
    }
}


function people_updateProfile(){

    
    var loginUserName=cookie_get(COOKIE_USERNAME);
    if(loginUserName==urlUserName){
        profileTab_setContent();
    }else{

        $.ajax({
            url:'../api/users/'+urlUserName,
            type: "GET",
            success: function(data){
                profileTab_setContent(urlUserName,data.smallAvatarURL);
            },
            error:function (){
                window.location.href=PAGE_OPPS;
            }
        });
        return false;
    }
    return false;
}


function people_getFollows(apiURL){
    peopleApiURL=apiURL;
    $.ajax({
        url:peopleApiURL,
        type: "GET",
        success: function(data){
            tblFollows_renderFollows(data);
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG,"../");
            return false;
        }
    });
    return false;

}


function people_displayMoreFollows(apiURL){
    peopleApiURL=apiURL;
    var length=display_follows.length;
    if(length>0){
        var fID=display_follows[length-1].username;
        $('#tableLoadingIcon').show();
        $.ajax({
            url: peopleApiURL+'?startUserName='+fID+'&size=10',
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
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG,"../");
            }
        });
    }
    return false;
}


$(document).ready(function() {

    if(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL || redirection_isURLContainsSSLOrWWW()){
        return;
    }

    theme_processDesign();
    mainBar_initialize("../");
    mainBar_initializeSearch();
    notifyBar_initialize();
    mainLinks_initialize(PAGE_FALLOWS);
    redirection_executeOrderAfterNewPageLoad();


    coffeeDlg_initialize();
    coffeeDlg_setRelativePath("../");
    
    profileTab_initialize("../");
    people_updateProfile();
    tblFollows_initialize("../");
    anchorTab_initialize();
    common_preventScreenFlash();
    common_registerMoreActionListener(function(){

        if ( $('#tableLoadingIcon').is(':visible')==false){
            if(peopleCurrentAnchor==ANCHOR_FOLLOWEDS){
                people_displayMoreFollows('../api/users/followed/'+urlUserName);
            }else if(peopleCurrentAnchor==ANCHOR_FOLLOWERS){
                people_displayMoreFollows('../api/users/follower/'+urlUserName);
            }
        }
    });
});