if(redirection_toClearURL()){
//Do Nothing
}else if(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL){
    redirection_execute(PAGE_NEWFOLLOWERS, PAGE_INDEX, ERR_MSG_PLEASE_SIGNIN);
}

function newFollowers_displayMainText(reqCount){
    var mainTemplate='You have reqCount follower request<br/><span>You can easily add  them to your list or ignore their request</span>';
    var mainText=mainTemplate.replace('reqCount',reqCount)
    $('#lefty_info_main').html(mainText);
}



function newFollowers_getRequests(){
    $.ajax({
        url: 'api/users/requests/',
        type: "GET",
        success: function(data){
            tblFollows_renderFollows(data);
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
            return false;
        }
    });
    return false;
}


function newFollowers_displayMoreRequests(){
    var length=display_follows.length;
    if(length>0){
        var fID=display_follows[length-1].username;
        $('#tableLoadingIcon').show();
        $.ajax({
            url: 'api/users/requests/'+'?startUserName='+fID+'&size=10',
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



$(document).ready(function() {

    if(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL || redirection_isURLContainsSSLOrWWW()){
        return;
    }

    theme_processDesign();
    document.title="TrendOcean / "+cookie_get(COOKIE_USERNAME)+"'s follow requests";
    mainBar_initialize();
    mainBar_initializeSearch();
    notifyBar_initialize();
    mainLinks_initialize(PAGE_NEWFOLLOWERS);
    redirection_executeOrderAfterNewPageLoad();


    
    coffeeDlg_initialize();
    profileTab_initialize();
    profileTab_setContent();
    tblFollows_initialize("",PAGE_NEWFOLLOWERS);
    newFollowers_getRequests();
    common_preventScreenFlash();
    common_registerMoreActionListener(function(){

        if ( $('#tableLoadingIcon').is(':visible')==false){
            newFollowers_displayMoreRequests();
        }
    });


    
    $.ajax({
        url: 'api/users/follow/numberOfFollowRequests/',
        type: "GET",
        success: function(data){
            var obj=$.evalJSON(data);
            newFollowers_displayMainText(obj.numberOfFollowRequests);
        }
    });
    return false;



});


