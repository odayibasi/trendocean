var notify_directive = {
    '@id':'"notificationEntry"',
    'div.notify_part': {
        'post <- notificationEntry':{
            'div.notify_id':'post.id',
            'span.notify-date':function(arg){

                var epoc=arg.item.time*1;
                var datum = new Date(epoc);
                return common_getRemainingTime(datum);
            },
            'span.notify-content':function(arg){
                var content="";
                if(arg.item.notificationType=="COMMENT"){
                    if(arg.item.isOwnQuestion==TEXT_TRUE){
                        content="@"+arg.item.username+ " commented your question "+ "é"+arg.item.questionId;
                    }else{
                        content="@"+arg.item.username+ " commented question "+ "é"+arg.item.questionId;
                    }
                }else if(arg.item.notificationType=="LIKE"){
                    content="@"+arg.item.username+ " loved your question "+ "é"+arg.item.questionId;
                }else if(arg.item.notificationType=="MENTION"){
                    content="@"+arg.item.username+ " mentioned you in a question "+ "é"+arg.item.questionId;
                }else if(arg.item.notificationType=="ANSWER_COUNT"){
                    content="é"+arg.item.questionId+" answered "+arg.item.answerCount+" times";
                }else if(arg.item.notificationType=="NEW_FOLLOWER"){
                    content="@"+arg.item.username+ " started to follow you";
                }else if(arg.item.notificationType=="FOLLOW_REQUEST_ACCEPT"){
                    content="Your follow request accepted by @"+arg.item.username;
                }
                return common_linkifyNotification(content,arg.item.questionText);
            },
            'div.notify-friend-status@style':function(arg){
                if(arg.item.notificationType=="NEW_FOLLOWER"){
                    return '';
                }else{
                    return 'display:none';
                }
            },
            'div.notify-queans-status@style':function(arg){
                if(arg.item.notificationType=="ANSWER_COUNT"){
                    return '';
                }else{
                    return 'display:none';
                }
            },
            'div.notify-friend-request-status@style':function(arg){
                if(arg.item.notificationType=="FOLLOW_REQUEST_ACCEPT"){
                    return '';
                }else{
                    return 'display:none';
                }
            },
            'div.notify-mention-status@style':function(arg){
                if(arg.item.notificationType=="MENTION"){
                    return '';
                }else{
                    return 'display:none';
                }
            },
            'div.notify-comment-status@style':function(arg){
                if(arg.item.notificationType=="COMMENT"){
                    return '';
                }else{
                    return 'display:none';
                }
            },
            'div.notify-love-status@style':function(arg){
                if(arg.item.notificationType=="LIKE"){
                    return '';
                }else{
                    return 'display:none';
                }
            }
        }
    }
};

var notify_template;
var display_notifies=null;
var selected_notify=null;
var tblNotifications_data=null;

function tblNotifications_initialize(){
    $("#btnMore").hide();
    $(".notify_def").hide();
    notify_template = $('#not_part').compile(notify_directive);
    $('#not_part').hide();
    $('#tableLoadingIcon').hide();
}

function tblNotifications_get(nID){
    for (i=0;i<display_notifies.length;i++){
        var notify=display_notifies[i];
        if(notify.id==nID){
            return notify;
        }
    }
    return null;
}


function tblNotifications_render(data){

    var scrollPosition=$(window).scrollTop();
    $('#static_que_section').html("<div id=que_section></div>");
    tblNotifications_data=data;
    if(data==null){
        data=new Object();
        display_notifies=null;
    }else if($.isArray(data.notificationEntry)){
        display_notifies=data.notificationEntry;
    }else{
        display_notifies=new Array(data.notificationEntry);
    }

    data.notificationEntry=display_notifies;
    $('#que_section').render(data, notify_template);
    $(window).scrollTop(scrollPosition);
};
