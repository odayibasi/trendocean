var tblQuestionRelatedUsers_RelativePath="";
var tblQuestionRelatedUsers_Question=null;
var tblQuestionRelatedUsers_Mode="";

var qRelated_directive = {
    '@id':'answerOfUser',
    'div.body_tiny2': {
        'post <- answerOfUser':{
            'a.owner-tiny':'post.username',
            'a.owner-tiny@href':function(arg){
                return tblQuestionRelatedUsers_RelativePath+arg.item.username;
            },
            'a.avatar-tiny@href':function(arg){
                return tblQuestionRelatedUsers_RelativePath+arg.item.username;
            },
            'img.avatarURL@src':'post.smallAvatar',
            'div.choice-true@style':function(arg){
                if(tblQuestionRelatedUsers_Mode=="loved" || arg.item.choiceIndex==-1){
                    return 'display:none';
                }else{
                    return '';
                }
            },
            'div.choice-locked@style':function(arg){
                if(tblQuestionRelatedUsers_Mode=="loved" || arg.item.choiceIndex!=-1){
                    return 'display:none';
                }else{
                    return '';
                }
            },
            'div.choice-true':function(arg){
                var choiceIndex=arg.item.choiceIndex;
                if(tblQuestionRelatedUsers_Mode=="answers" && choiceIndex!=-1 && tblQuestionRelatedUsers_Question!=null){
                    return common_choiceProcess(common_htmlStrip(tblQuestionRelatedUsers_Question.choices[arg.item.choiceIndex]));
                }
                return "";
            }
        }
    }
};

var qRelated_template;
var display_qRelateds=null;

function tblQuestionRelatedUsers_initialize(rPath){

    if(rPath!=null){
        tblQuestionRelatedUsers_RelativePath=rPath;
    }

    qRelated_template = $('#qRelated_part').compile(qRelated_directive);
    $(".qRelated_def").hide();
    $("#qRelated_part").hide();

    $('#questionRelatedUsersClose').click(function(event){
        event.preventDefault();
        $('#questionRelatedUsers').hide();

    });

    
    $('#qRelated_More').click(function(event){
        event.preventDefault();
        if(tblQuestionRelatedUsers_Question!=null){

            var length=display_qRelateds.length;
            if(length>0){
                var fID=display_qRelateds[length-1].username;
            
                var apiURL="";
                if(tblQuestionRelatedUsers_Mode=="answers"){
                    apiURL=tblQuestionRelatedUsers_RelativePath+'api/answers/all/'+tblQuestionRelatedUsers_Question.id+'?startUsername='+fID+'&size=10';
                }else{
                    apiURL=tblQuestionRelatedUsers_RelativePath+'api/favorites/favoritedUsers/'+tblQuestionRelatedUsers_Question.id+'?startIndex='+fID+'&size=10';
                }

                $.ajax({
                    url: apiURL,
                    type: "GET",
                    success: function(data){
                        if(data!=null){
                            data.answerOfUser=display_qRelateds.concat(data.answerOfUser);
                            tblQuestionRelatedUsers_render(data,tblQuestionRelatedUsers_Mode,tblQuestionRelatedUsers_Question);
                        }
                    },
                    error:function (xhr){
                        notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                    }
                });
            }

        }
        return false;
    });

}

function tblQuestionRelatedUsers_render(data,mode, question){

    tblQuestionRelatedUsers_Mode=mode;
    tblQuestionRelatedUsers_Question=question;

    // $('#static_que_related').html("<div id=que_related></div>");
    //XHTML not support innerHTML
    $('#static_que_related').empty();
    var queSectionDIV = document.createElement("div");
    queSectionDIV.setAttribute("id","que_related");
    document.getElementById("static_que_related").appendChild(queSectionDIV);



    if(data==null){
        data=new Object();
        display_qRelateds=null;
    }else if($.isArray(data.answerOfUser)){
        display_qRelateds=data.answerOfUser;
    }else{
        display_qRelateds=new Array(data.answerOfUser);
    }

    tblQuestionRelatedUsers_data=data;
    tblQuestionRelatedUsers_data.answerOfUser=display_qRelateds;
    $('#que_related').render(tblQuestionRelatedUsers_data, qRelated_template);

    if(mode=='loved'){
        $('.locked-text').hide();
    }else{
        $('.locked-text').show();
    }


    
    if(display_qRelateds.length<20){
        $('#qRelated_More').hide();
    }else{
        $('#qRelated_More').show();
    }


}


