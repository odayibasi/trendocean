var tblFollows_RelativePath="";
var tblFollows_LoginedUser=cookie_get(COOKIE_USERNAME);
var tblFollows_Page="";

var follow_directive = {
    '@id':'"user"',
    'div.follow_part': {
        'post <- user':{
            'div.follow_id':'post.username',
            'a.badge@href':function(arg){
                return tblFollows_RelativePath+arg.item.username;
            },
            'img.avatarImg@src':'post.smallAvatarURL',
            'div.namebadge':'post.username',
            'div.realname':'post.fullName',
            'div.about':function(arg){
                //return common_contentProcess(arg.item.about);
                return common_htmlStrip(arg.item.about);
            },
            'a.badgesendmessage@style':function(arg){
                if(arg.item.username==tblFollows_LoginedUser){
                    return 'display:none';
                }else{
                    return '';
                }
            },
            'a.badgesendcoffee@style':function(arg){
                if(arg.item.username==tblFollows_LoginedUser){
                    return 'display:none';
                }else{
                    return '';
                }
            },
            'a.badgeaddfollow@style':function(arg){
                if(arg.item.isFollowedByCurrentUser=='true' || arg.item.username==tblFollows_LoginedUser  || tblFollows_Page==PAGE_NEWFOLLOWERS){
                    return 'display:none';
                }else{
                    return '';
                }
            },
            'a.badgeaddunfollow@style':function(arg){
                if(arg.item.isFollowedByCurrentUser=='false'|| arg.item.username==tblFollows_LoginedUser || tblFollows_Page==PAGE_NEWFOLLOWERS){
                    return 'display:none';
                }else{
                    return '';
                }
            }
        }
    }
};

var follow_template;
var display_follows=null;
var selected_follow=null;
var tblFollows_LoginedUserFolloweds=null;
var tblFollows_data=null;

function tblFollows_initialize(relativePath, page){

    $("#btnMore").hide();
    $("#footer_nav").hide();

    if(relativePath!=null){
        tblFollows_RelativePath=relativePath;
    }

    if(page!=null){
        tblFollows_Page=page;
    }

    $(".follow_def").hide();
    follow_template = $('#foll_part').compile(follow_directive);
    $('#foll_part').hide();
    $('#tableLoadingIcon').hide();

    $('.badgesendcoffee').live("click",function(event){
        event.preventDefault();
        var fID=$(this).parents('.follow_part').children(':first-child').children(':first-child').text();
        selected_follow=tblFollows_getFollow(fID);
        if(selected_follow!=null){
            var pos= $(this).position();
            coffeeDlg_setContent(selected_follow.username,cookie_get(COOKIE_USERNAME),selected_follow.smallAvatarURL);
            coffeeDlg_show(pos);
        }
    });


    $('.badgeaddfollow').live("click",function(event){
        event.preventDefault();
        if(common_checkPOST()){
            var fID=$(this).parents('.follow_part').children(':first-child').children(':first-child').text();
            selected_follow=tblFollows_getFollow(fID);
            if(selected_follow!=null){
                $.ajax({
                    url: tblFollows_RelativePath+'api/users/follow/'+selected_follow.username,
                    async:false,
                    type: 'POST',
                    success: function(){
                        selected_follow.isFollowedByCurrentUser="true";
                        tblFollows_renderFollows(tblFollows_data);
                    },
                    error:function (xhr){
                        notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG,tblFollows_RelativePath);
                    }
                });
            }
        }
        return false;
    });

    $('.badgeaddunfollow').live("click",function(event){
        event.preventDefault();
        if(common_checkPOST()){
            var fID=$(this).parents('.follow_part').children(':first-child').children(':first-child').text();
            selected_follow=tblFollows_getFollow(fID);
            if(selected_follow!=null){
                $.ajax({
                    url: tblFollows_RelativePath+'api/users/follow/'+selected_follow.username,
                    async:false,
                    type: 'DELETE',
                    success: function(){
                        var anchr=jQuery.url.setUrl(document.location).attr("anchor");
                        if(cookie_get(COOKIE_USERNAME)==common_getURLSegment(1) && anchr=='following'){
                            tblFollows_removeFollow(selected_follow.username);
                            selected_follow=null;
                        }else{
                            selected_follow.isFollowedByCurrentUser="false";
                            tblFollows_renderFollows(tblFollows_data);
                        }
                    },
                    error:function (xhr){
                        notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG,tblFollows_RelativePath);
                    }
                });
            }
        }
        return false;
    });


    if(tblFollows_Page==PAGE_NEWFOLLOWERS){

        $('.badgeaccept').live("click",function(event){
            event.preventDefault();
            var fID=$(this).parents('.follow_part').children(':first-child').children(':first-child').text();
            selected_follow=tblFollows_getFollow(fID);
            if(selected_follow!=null){
                $.ajax({
                    url: tblFollows_RelativePath+'api/users/follow/confirm/'+selected_follow.username,
                    type: 'POST',
                    success: function(){
                        var reqCount=parseInt($('#friends_MainBar_Count').text());
                        reqCount--;
                        $('#friends_MainBar_Count').text(reqCount);
                        newFollowers_displayMainText(reqCount);
                        tblFollows_removeFollow(selected_follow.username);
                    },
                    error:function (xhr){
                        notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG,tblFollows_RelativePath);
                    }
                });
                return false;

            }
        });

        $('.badgedecline').live("click",function(event){
            event.preventDefault();
            if(common_checkPOST()){
                var fID=$(this).parents('.follow_part').children(':first-child').children(':first-child').text();
                selected_follow=tblFollows_getFollow(fID);
                if(selected_follow!=null){
                    $.ajax({
                        url: tblFollows_RelativePath+'api/users/follow/reject/'+selected_follow.username,
                        type: 'POST',
                        success: function(){
                            var reqCount=parseInt($('#friends_MainBar_Count').text());
                            reqCount--;
                            $('#friends_MainBar_Count').text(reqCount);
                            newFollowers_displayMainText(reqCount);
                            tblFollows_removeFollow(selected_follow.username);
                        },
                        error:function (xhr){
                            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG,tblFollows_RelativePath);
                        }
                    });

                }
            }
            return false;
        });
    }

}

function tblFollows_getFollow(fID){
    for (i=0;i<display_follows.length;i++){
        var follow=display_follows[i];
        if(follow.username==fID){
            return follow;
        }
    }
    return null;
}



function tblFollows_removeFollow(fID){
    for (i=0;i<display_follows.length;i++){
        var follow=display_follows[i];
        if(follow.username==fID){
            break;
        }
    }
    display_follows.splice(i,1);
    tblFollows_renderFollows(tblFollows_data);
}


function tblFollows_renderFollows(data){

    var scrollPosition=$(window).scrollTop();
    $('#static_que_section').html("<div id=que_section></div>");
    if(data==null){
        data=new Object();
        display_follows=null;
    }else if($.isArray(data.user)){
        display_follows=data.user;
    }else{
        display_follows=new Array(data.user);
    }

    tblFollows_data=data;
    tblFollows_data.user=display_follows;
    $('#que_section').render(tblFollows_data, follow_template);
    $(window).scrollTop(scrollPosition);
    
}
