var comment_directive = {
    '@id':'"comment"',
    'div.comment_part': {
        'post <- comment':{
            'div.comment_id':'post.commentID',
            'img.cAvatarImg@src':'post.smallAvatarURL',
            'a.cAvatarImgLink@href': '../#{post.sender}',
            'a.cOwner': 'post.sender',
            'a.cOwner@href': '../#{post.sender}',
            'span.comment-from-realname':'post.serderFullName',
            'div.comment-content':function(arg){
                return common_contentProcessing(arg.item.commentText,CONTENT_PROCESS_FOR_ONE_QUESTION);
            },
            'a.coffeecup_deletebutton@style':function(arg){
                if(arg.item.isRemovableByRequester=='true'){
                    return '';
                }else{
                    return 'display:none';
                }
            },
            'span.comment-from-qCreationDate':function(arg){

                var epoc=arg.item.creationDate*1;
                var datum = new Date(epoc);
                //var ds=datum.toGMTString();
                return common_getRemainingTime(datum);
            }
        }
    }
};



var comment_template;
var display_comments=null;
var selected_comment=null;
var tblComments_data=null;
var tblComments_stripHTMLDIV=$('<div class="stripHTMLClass">text</div>');

function tblComments_initialize(){
    $(".comment_def").hide();
    comment_template = $('#cmt_part').compile(comment_directive);
    $('#cmt_part').hide();
    $('#tableLoadingIcon').hide();

    $('.coffeecup_deletebutton').live("click",function(){
        var cID=$(this).parents('.comment_part').children(':first-child').children(':first-child').text();
        selected_comment=tblComments_getComment(cID);
        if(selected_comment!=null){
            $.ajax({
                url: '../api/comments/remove/'+onequestion_selectedQuestion.id+"/"+cID,
                type: "POST",
                success: function(data){
                    tblComments_removeComment(cID);
                },
                error:function (xhr){
                    notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                }
            });
        }
        return false;
    });
}


function tblComments_getComment(cID){
    for (i=0;i<display_comments.length;i++){
        var comment=display_comments[i];
        if(comment.commentID==cID){
            return comment;
        }
    }
    return null;
}


function tblComments_addComment(data){

    if(tblComments_data==null){
        tblComments_data=new Object();
    }
    if(display_comments!=null){
        tblComments_data.comment=display_comments.concat(data);
    }else{
        tblComments_data.comment=data;
    }
    tblComments_renderComments(tblComments_data);
    onequestion_commentCount++;
    onequestion_displayCommentCount();

}


function tblComments_removeComment(cID){
    for (i=0;i<display_comments.length;i++){
        var comment=display_comments[i];
        if(comment.commentID==cID){
            break;
        }
    }
    display_comments.splice(i,1);
    tblComments_renderComments(tblComments_data);
    onequestion_commentCount--;
    onequestion_displayCommentCount();
}




function tblComments_renderComments(data){

    var scrollPosition=$(window).scrollTop();
    // $('#static_que_section').html("<div id=que_section></div>");
    //XHTML not support innerHTML
    $('#static_que_section').empty();
    var queSectionDIV = document.createElement("div");
    queSectionDIV.setAttribute("id","que_section");
    document.getElementById("static_que_section").appendChild(queSectionDIV);

    tblComments_data=data;
    if(data==null){
        data=new Object();
        display_comments=null;
    }else if($.isArray(data.comment)){
        display_comments=data.comment;
    }else{
        display_comments=new Array(data.comment);
    }

    data.comment=display_comments;
    $('#que_section').render(data, comment_template);
    $(window).scrollTop(scrollPosition);
    $('.coffeecup_deletebutton').attr("title","delete comment");
}


