var display_followers=null;

function followTab_renderFollowers(componentIdTag,linkAnchor, displayCount,data){

    if(data==null ||data==TEXT_NULL){
        display_followers=new Array();
    }else if($.isArray(data.user)){
        display_followers=data.user;
    }else{
        display_followers=new Array(data.user);
    }

    $(componentIdTag+"btnAll").attr("href","follow/"+followedTab_profileUserName+"#"+linkAnchor);



    var countOfFallower=display_followers.length;
    if(countOfFallower>displayCount){
        countOfFallower=displayCount;
    }

    for(i=0;i<display_followers.length;i++){
        var user=display_followers[i];
        var temp="<a href=fallowerLink  title='fallowerFullName'><img src=fallowerImg class=profile-follow-rounded width=30 height=30/></a>";
        var item=temp.replace('fallowerImg',user.smallAvatarURL);
        item=item.replace('fallowerLink',user.username);
        item=item.replace('fallowerFullName',user.fullName);
        $(componentIdTag+i).html(item);
    }

    
    for(i=display_followers.length;i<displayCount;i++){
        var defaultTemp='<img src=css/default/images/sampleavatar.png  width=30 height=30/>'
        $(componentIdTag+i).html(defaultTemp);
    }


}


var loginedUserFolloweds=null;
var followButton=null;
var followedTab_profileUserName=null;



function followTab_fillFollowers(displayCount){

    $.ajax({
        url: 'api/users/follower/'+followedTab_profileUserName,
        type: "GET",
        success: function(data){
            followTab_renderFollowers('#follower_','followers', displayCount,data);
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
            return false;
        }
    });
    return false;
}



function followTab_fillFolloweds(displayCount){

    $.ajax({
        url: 'api/users/followed/'+followedTab_profileUserName,
        type: "GET",
        success: function(data){
            followTab_renderFollowers('#following_','following', displayCount,data);
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status, ICON_URL_NOTIFY_WRONG);
            return false;
        }
    });
    return false;
}


function followTab_updateLoginUserFolloweds(){
    if(cookie_get(COOKIE_SIGNIN)==COOKIE_SIGNIN_VAL){
        var loginUserName=cookie_get(COOKIE_USERNAME);
        $.ajax({
            url: 'api/users/followed/'+loginUserName,
            type: "GET",
            success: function(data){
                if(data==null){
                    loginedUserFolloweds=new Array();
                }else if($.isArray(data.user)){
                    loginedUserFolloweds=data.user;
                }else{
                    loginedUserFolloweds=new Array(data.user);
                }
                followTab_followBtn_updateStatus();
            },
            error:function (xhr){
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                return false;
            }
        });
        return false;
    }
}



function followTab_fallowBtn_initialize(triggerComp){


    followButton=triggerComp;
    triggerComp.click(function(event){
        event.preventDefault();
        var op=null;
        if(!profile_isVisibleToLoginUser()){
            op="POST";
        }else if(profileFollowing==TEXT_FALSE){
            op="POST";
        }else{
            op="DELETE";
        }

        $.ajax({
            url: 'api/users/follow/'+followedTab_profileUserName,
            type: op,
            success: function(){
                if(!profile_isVisibleToLoginUser()){
                    notifyBar_display("Follow Request Sended", ICON_URL_NOTIFY_TRUE);
                }else if(profileFollowing==TEXT_FALSE){
                    profileFollowing=TEXT_TRUE;
                    profile_updateProfile();
                }else{
                    profileFollowing=TEXT_FALSE;
                    profile_updateProfile();
                }
            },
            error:function (xhr){
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                return false;
            }
        });
        return false;
    });
    followTab_updateLoginUserFolloweds();
    
}



function followTab_followBtn_updateStatus(){


    followButton.removeClass();
    if(!profile_isVisibleToLoginUser()){
        followButton.addClass("follow_request");
        followButton.html("follow request");
    }else if(profileFollowing==TEXT_FALSE){
        followButton.addClass("follow_request");
        followButton.html("follow");
    }else{
        followButton.addClass("follow_request_remove");
        followButton.html("unfollow");
    }

}


function followTab_followBtn_setContent(){

    var loginUserName=cookie_get(COOKIE_USERNAME);
    if(loginUserName==followedTab_profileUserName){
        followButton.hide();
    }else{
        followButton.show();
    }

    followTab_followBtn_updateStatus();
}




function followTab_setContent(profileUserName){
    followedTab_profileUserName=profileUserName;
}











