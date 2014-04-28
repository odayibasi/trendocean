var youtube="<iframe title='YouTube video player' class='youtube-player' type='text/html' width='400' height='240' src='http://www.youtube.com/embed/$youtubecode$?wmode=transparent' frameborder='0'></iframe>";
var vimeo="<iframe src='http://player.vimeo.com/video/$vimeocode$' width='400' height='240' frameborder='0'></iframe>";
var htmlImgURL="<img src='{url}' width='400'  height='240'/>"
var mediaDiv="<div id='question_media'></div>";
var soundCloud='<object id="toPlayer" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">'+
'<param name=movie" value="http://player.soundcloud.com/player.swf?url=http%3A%2F%2Fsoundcloud.com%2F$soundcloudCode1$%2F$soundcloudCode2$&enable_api=true&object_id=toPlayer"></param>'+
'<param name="allowscriptaccess" value="always"></param>'+
'<embed allowscriptaccess="always" height="81" wmode="transparent" src="http://player.soundcloud.com/player.swf?url=http%3A%2F%2Fsoundcloud.com%2F$soundcloudCode3$%2F$soundcloudCode4$&enable_api=true&object_id=toPlayer" type="application/x-shockwave-flash" width="400" name="toPlayer"></embed>'+
'</object>';




var directive = {
    '@id':'"question"',
    'div.question_part': {
        'post <- question':{
            'div.question_id':'post.id',
            'a.avatarImgLink@href':'post.owner',
            'img.avatarImg@src':'post.ownerSmallAvatarURL',
            'a.owner': 'post.owner',
            'a.owner@href': 'post.owner',
            'a.commentCount':'#{post.numberOfComments} comments',
            'a.commentCount@href':'question/#{post.id}',
            'a.qTotalAnswerCount':' #{post.totalAnswerCount} answered',
            'a.qTotalLovedCount':'#{post.likedCount} love',
            'a.video-navi@href':'question/#{post.id}',
            'div.post_body': function(arg){
                return common_contentProcess(arg.item.body);
            },
            'span.qCreationDate':function(arg){

                var epoc=arg.item.creationDate*1;
                var datum = new Date(epoc);
                //var ds=datum.toGMTString();
                return common_getRemainingTime(datum);
            },
            'span.trendsetting@style':function(arg){
                var promoted=arg.item.isPromoted;
                if(promoted=="true"){
                    return '';
                }else{
                    return 'display:none';
                }
            },
            'a.love@style':function(arg){
                return 'display:none';
            },
            'a.loveselected@style':function(arg){
                return 'display:none';
            },
            'a.flag@style':function(arg){
                return 'display:none';
            },
            'a.flagselected@style':function(arg){
                return 'display:none';
            },
            'a.share@style':function(arg){
                return 'display:none';
            },
            '.coffeecup_sendbutton@style':function(arg){
                return 'display:none';
            },
            'a.video-navi@style':function(arg){

                if(common_isContainsMedia(arg.item.body)){
                    return '';
                }else{
                    return 'display:none';
                }
            },
            'a.btnAnswer':function(arg){
                return tblQuestions_defineQNodeBtnText(arg.item);
            },
            'a.infostat-navi@style':function(arg){
                return 'display:none';
            },
            'a.infostat-navi@href':'question/#{post.id}#stat',
            'span.reask-info@style':function(arg){
                if(arg.item.reaskUser==TEXT_NULL || arg.item.isPromoted=='true'){
                    return 'display:none';
                }else{
                    return '';
                }
            },
            'span.reask-info':'<b>reasked</b> by #{post.reaskUser}',
            'span.reask-info-do@style':function(arg){
                return 'display:none';
            },
            'span.reask-info-remove@style':function(arg){
                return 'display:none';
            }
        }
    }
};


var selected_qBody=null
var selected_qTotalAnswerCount=null;
var selected_qLovedCount=null;
var selected_qFlag=null;
var selected_qFlagSelected=null;
var selected_qLoved=null;
var selected_qLovedSelected=null;
var selected_qStat=null;



var render_template;
var question_answer_process=null;
var tblQuestionsData=null;
var display_questions=null;
var selected_question_choiceCount=0;
var selected_question=null;
var hover_question=null;
var selected_choice=null;
var selected_button=null;
var selected_button_prevText=null;
var tblQuestions_page="";



function tblQuestions_initialize(page){

    tblQuestionRelatedUsers_initialize();

    $("#btnMore").hide();
    $("#footer_nav").hide();
    $("#questionRelatedUsers").hide();
    
    if(tblQuestions_page!=null){
        tblQuestions_page=page;
    }

    $(".question_def").hide();
    render_template = $('#que_part').compile(directive)

    question_answer_process=$("#question_answer_process");
    question_answer_process.prepend(mediaDiv);

    for(i=0;i<10;i++){
        $('#answers_cho'+i).data(DATA_CHOICE_INDEX,i);
    }

    $('#que_part').hide();
    question_answer_process.hide();
    $('#waitingIcon').hide();
    $('#ichoosethis_onequestion').hide();
    $('#statistic_onequestion').hide();
    $('#tableLoadingIcon').hide();


    $('#ichooseact_onequestion').live("click",function(event){
        event.preventDefault();
        if(common_checkAnswerPOST()){
            var prevTrend=cookie_get(COOKIE_LOGINUSER_TREND);
            $('#waitingIcon').show();
            var answer = new Object();
            answer.questionID = selected_question.id;
            answer.choiceIndex =selected_choice.data(DATA_CHOICE_INDEX);
            var answerJSON = $.toJSON(answer);
            $.ajax({
                url: 'api/answers',
                type: "POST",
                data: (answerJSON),
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                success: function(data){
                    tblQuestions_answerSucceeded(prevTrend,answer.choiceIndex,data)
                },
                error:function (xhr){
                    $('#waitingIcon').hide();
                    $('#ichoosethis_onequestion').hide();
                    if(xhr.status==HTTP_STATUS_NOT_FOUND){
                        notifyBar_display(xhr.responseText,ICON_URL_NOTIFY_WRONG);
                    }
                    else{
                        notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                    }
                }
            });
        }
        return false;
    });

    $('.quendy').live("mouseenter ",function(event){

        var qParent=$(this).parents('.question_part');
        var qID=qParent.children(':first-child').children(':first-child').text();
        hover_question=tblQuestions_getQuestion(qID);
        if(hover_question!=null){
            if(hover_question.answer!=INDEX_OF_NOT_ANSWERED ||hover_question.owner==cookie_get(COOKIE_USERNAME)){
                qParent.find('.infostat-navi').show();
            }

            if(hover_question.owner!=cookie_get(COOKIE_USERNAME)){
                qParent.find('.coffeecup_sendbutton').show();
            }

            if(hover_question.owner!=cookie_get(COOKIE_USERNAME)){
                qParent.find('.reask-info-do').show();
            }

            if(hover_question.isQuestionFaved=="false"){
                qParent.find('.love').show();
            }else{
                qParent.find('.loveselected').show();
            }

            if(hover_question.isQuestionAbused=="false"){
                qParent.find('.flag').show();
            }else{
                qParent.find('.flagselected').show();
            }
            qParent.find('.share').show();
        }

    });

    $('.quendy').live("mouseleave",function(event){
        var qParent=$(this).parents('.question_part');
        qParent.find('.infostat-navi').hide();
        qParent.find('.coffeecup_sendbutton').hide();
        qParent.find('.share').hide();
        qParent.find('.love').hide();
        qParent.find('.loveselected').hide();
        qParent.find('.flag').hide();
        qParent.find('.flagselected').hide();
        qParent.find('.reask-info-do').hide();

    });

    //JQuery 1.4.4 Live Backward Binding
    $('.btnAnswer').live("click",function(event){

        event.preventDefault();
        var parent=$(this).parent();
        var qID=$(this).parents('.question_part').children(':first-child').children(':first-child').text();
        selected_qTotalAnswerCount=$(this).parents('.question_part').find('.qTotalAnswerCount');
        selected_qStat=$(this).parents('.question_part').find('.infostat-navi');
        selected_qBody=$(this).parents('.question_part').find('.post_body');

        if(selected_button!=null){
            var prevQID=selected_button.parents('.question_part').children(':first-child').children(':first-child').text();
            if(prevQID!=qID){
                selected_button.text(tblQuestions_defineQNodeBtnText(tblQuestions_getQuestion(prevQID)));
            }
        }


        selected_question=tblQuestions_getQuestion(qID);
        selected_button=$(this);

        if($(this)!=null){

            if($(this).text()==QNODE_BTN_CLOSE){
                question_answer_process.hide()
                $(this).html(tblQuestions_defineQNodeBtnText(selected_question));
                selected_question=null;
                return false;
            }else{
                $(this).html(tblQuestions_defineQNodeBtnText(selected_question));
            }
        }


        if(selected_question!=null){
            $(this).html(QNODE_BTN_CLOSE);
            question_answer_process.appendTo(parent);
            tblQuestions_prepareQuestionChoices(selected_question);
            $("#question_media").html(common_contentProcessing(selected_question.body, CONTENT_PROCESS_FOR_QUESTION_TABLE));


            $("#rounder").hide();
            $("#que_linked_part1").hide();
            $("#que_linked_part2").hide();
            $('#ichoosethis_onequestion').hide();
            $('#statistic_onequestion').hide();


            if(selected_question.answer==INDEX_OF_NOT_ANSWERED){
                tblQuestions_clearChoiceSelection();
                gTable_bindEventToNonAnsweredQuestion();
            }else{
                tblQuestions_prepareChoiceDistribution(selected_question);
                tblQuestions_clearChoiceSelection();
                gTable_unbindChoiceEvents();
                gTable_bindEventToAnsweredQuestion();
                tblQuestions_signSelectedChoice(parseInt(selected_question.answer));
            }

            question_answer_process.show();
        }
        return false;

    });


    $('.qTotalAnswerCount').live("click",function(event){
        event.preventDefault();
        var pos=$(this).offset();
        var qID=$(this).parents('.question_part').children(':first-child').children(':first-child').text();
        selected_question=tblQuestions_getQuestion(qID);
        if(selected_question!=null){
            $.ajax({
                url: 'api/answers/all/'+qID,
                type: "GET",
                success: function(data){
                    if(data!=null){
                        $('#questionRelatedUsers').css("position","absolute");
                        $('#questionRelatedUsers').css("top",pos.top);
                        $('#questionRelatedUsers').css("left",pos.left);
                        $('#questionRelatedUsersTitle').text("Answered");
                        $("#questionRelatedUsers").show();
                        tblQuestionRelatedUsers_render(data,"answers", selected_question);
                    }
                },
                error:function (xhr){
                    if(xhr.status==HTTP_STATUS_NOT_FOUND){
                        notifyBar_display(xhr.responseText,ICON_URL_NOTIFY_WRONG);
                    }else{
                        notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                    }
                }
            });

        }
        return false;
    });


    $('.qTotalLovedCount').live("click",function(event){
        event.preventDefault();
        var pos=$(this).offset();
        var qID=$(this).parents('.question_part').children(':first-child').children(':first-child').text();
        selected_question=tblQuestions_getQuestion(qID);
        if(selected_question!=null){
            $.ajax({
                url: 'api/favorites/favoritedUsers/'+qID,
                type: "GET",
                success: function(data){
                    if(data!=null){
                        $('#questionRelatedUsers').css("position","absolute");
                        $('#questionRelatedUsers').css("top",pos.top);
                        $('#questionRelatedUsers').css("left",pos.left);
                        $('#questionRelatedUsersTitle').text("Loved");
                        $("#questionRelatedUsers").show();
                        tblQuestionRelatedUsers_render(data,"loved",selected_question);
                    }
                },
                error:function (xhr){
                    if(xhr.status==HTTP_STATUS_NOT_FOUND){
                        notifyBar_display(xhr.responseText,ICON_URL_NOTIFY_WRONG);
                    }else{
                        notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                    }
                }
            });

        }
        return false;
    });

    $('.flag').live("click",function(event){
        event.preventDefault();
        if(common_checkPOST()){
            var qID=$(this).parents('.question_part').children(':first-child').children(':first-child').text();
            selected_qFlag=$(this).parents('.question_part').find('.flag');
            selected_qFlagSelected=$(this).parents('.question_part').find('.flagselected');
            selected_question=tblQuestions_getQuestion(qID);
            if(selected_question!=null){
                $.ajax({
                    url: 'api/abuse/'+qID,
                    async:false,
                    type: "POST",
                    success: function(){
                        selected_question.isQuestionAbused="true";
                        selected_qFlagSelected.show();
                        selected_qFlag.hide();
                    },
                    error:function (xhr){
                        if(xhr.status==HTTP_STATUS_NOT_FOUND){
                            notifyBar_display(xhr.responseText,ICON_URL_NOTIFY_WRONG);
                        }else{
                            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                        }

                    }
                });
            }
        }
        return false;
    });

    
    $('.reask-info-do').live("click",function(event){
        event.preventDefault();
        if(common_checkPOST()){
            var qID=$(this).parents('.question_part').children(':first-child').children(':first-child').text();
            selected_qFlag=$(this).parents('.question_part').find('.flag');
            selected_qFlagSelected=$(this).parents('.question_part').find('.flagselected');
            selected_question=tblQuestions_getQuestion(qID);
            if(selected_question!=null){
                $.ajax({
                    url: 'api/questions/reask/'+qID,
                    async:false,
                    type: "POST",
                    success: function(){
                        notifyBar_display("reask succeed",ICON_URL_NOTIFY_TRUE);
                    },
                    error:function (xhr){
                        if(xhr.status==HTTP_STATUS_NOT_FOUND){
                            notifyBar_display(xhr.responseText,ICON_URL_NOTIFY_WRONG);
                        }else{
                            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                        }

                    }
                });
            }
        }
        return false;
    });



    $('.flagselected').live("click",function(event){
        event.preventDefault();
        if(common_checkPOST()){
            var qID=$(this).parents('.question_part').children(':first-child').children(':first-child').text();
            selected_qFlag=$(this).parents('.question_part').find('.flag');
            selected_qFlagSelected=$(this).parents('.question_part').find('.flagselected');

            selected_question=tblQuestions_getQuestion(qID);
            if(selected_question!=null){
                $.ajax({
                    url: 'api/abuse/remove/'+qID,
                    async:false,
                    type: "POST",
                    success: function(){
                        selected_question.isQuestionAbused="false";
                        selected_qFlagSelected.hide();
                        selected_qFlag.show();
                    },
                    error:function (xhr){
                        if(xhr.status==HTTP_STATUS_NOT_FOUND){
                            notifyBar_display(xhr.responseText,ICON_URL_NOTIFY_WRONG);
                        }
                        else{
                            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                        }
                    }
                });
            }
        }
        return false;
    });



    $('.love').live("click",function(event){
        event.preventDefault();
        if(common_checkPOST()){
            var qID=$(this).parents('.question_part').children(':first-child').children(':first-child').text();
            selected_qLove=$(this).parents('.question_part').find('.love');
            selected_qLoveSelected=$(this).parents('.question_part').find('.loveselected');
            selected_qLovedCount=$(this).parents('.question_part').find('.qTotalLovedCount');
            selected_question=tblQuestions_getQuestion(qID);
            if(selected_question!=null){
                $.ajax({
                    url: 'api/favorites/'+qID,
                    async:false,
                    type: "POST",
                    success: function(){
                        selected_question.isQuestionFaved="true";
                        selected_question.likedCount++;
                        selected_qLove.hide();
                        selected_qLoveSelected.show();
                        selected_qLovedCount.text(selected_question.likedCount+" love");
                        common_incrementLoveQuestionCount();

                        if(tblQuestions_page==PAGE_PROFILE){
                            profile_reflectActionsOnQuestions(QACTIONS_FAVED,selected_question);
                        }
                    },
                    error:function (xhr){
                        if(xhr.status==HTTP_STATUS_NOT_FOUND){
                            notifyBar_display(xhr.responseText,ICON_URL_NOTIFY_WRONG);
                        }else{
                            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                        }
                    }
                });
            }
        }
        return false;
    });


    $('.loveselected').live("click",function(event){
        event.preventDefault();
        if(common_checkPOST()){
            var qID=$(this).parents('.question_part').children(':first-child').children(':first-child').text();
            selected_qLove=$(this).parents('.question_part').find('.love');
            selected_qLoveSelected=$(this).parents('.question_part').find('.loveselected');
            selected_qLovedCount=$(this).parents('.question_part').find('.qTotalLovedCount');
            selected_question=tblQuestions_getQuestion(qID);
            if(selected_question!=null){
                $.ajax({
                    url: 'api/favorites/remove/'+qID,
                    async:false,
                    type: "POST",
                    success: function(){
                        selected_question.isQuestionFaved="false";
                        selected_question.likedCount--;
                        selected_qLove.show();
                        selected_qLoveSelected.hide();
                        selected_qLovedCount.text(selected_question.likedCount+" love");
                        common_decrementLoveQuestionCount();

                        if(tblQuestions_page==PAGE_PROFILE){
                            profile_reflectActionsOnQuestions(QACTIONS_UNFAVED,selected_question);
                        }
                    },
                    error:function (xhr){
                        if(xhr.status==HTTP_STATUS_NOT_FOUND){
                            notifyBar_display(xhr.responseText,ICON_URL_NOTIFY_WRONG);
                        }else{
                            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                        }
                    }
                });
            }
        }
        return false;
    });


    $('.share').live("click",function(event){
        event.preventDefault();
        var qID=$(this).parents('.question_part').children(':first-child').children(':first-child').text();
        shareDlg_setContent(tblQuestions_getQuestion(qID));
        shareDlg_display($(this), -250, 0);
    });

    $('.coffeecup_sendbutton').live("click",function(event){
        event.preventDefault();
        var qID=$(this).parents('.question_part').children(':first-child').children(':first-child').text();
        selected_question=tblQuestions_getQuestion(qID);
        if(selected_question!=null && selected_question.owner!=cookie_get(COOKIE_USERNAME)){
            var pos= $(this).position();
            coffeeDlg_setContent(selected_question.owner,cookie_get(COOKIE_USERNAME),selected_question.ownerSmallAvatarURL);
            coffeeDlg_show(pos);
        }else{
            notifyBar_display("COFFEE TO ME ?",ICON_URL_NOTIFY_WRONG);
        }
    });


}


function tblQuestions_answerSucceeded(prevTrend,choiceIndex,choiceDistData){

    $('#waitingIcon').hide();
    $('#ichoosethis_onequestion').hide();
    $('#statistic_onequestion').show();

    selected_question.answer=""+choiceIndex;
    tblQuestions_prepareStatisticsIcon(selected_question,choiceDistData);
    tblQuestions_clearChoiceSelection();
    gTable_unbindChoiceEvents();
    gTable_bindEventToAnsweredQuestion();
    tblQuestions_signSelectedChoice(choiceIndex);

    var order=tblQuestions_getAnswerOrderStatus(choiceDistData, choiceIndex, cookie_get(COOKIE_MARGINAL));
    var orderText;
    if(order==1){
        orderText="1ST";
    }else if(order==2){
        orderText="2ND";
    }else if(order==3){
        orderText="3RD";
    }else{
        orderText=order+"TH";
    }

    $('#answerOrder').hide();
    if(cookie_get(COOKIE_MARGINAL)==TEXT_TRUE){
        $('#deltaTrend').text(orderText+' MOST ECCENTRIC ANSWER');
    }else{
        $('#deltaTrend').text(orderText+' MOST TRENDY ANSWER');
    }

    var answQuestionCount=parseInt(selected_question.totalAnswerCount);
    answQuestionCount++;
    selected_question.totalAnswerCount++;
    selected_qTotalAnswerCount.text(selected_question.totalAnswerCount+" answered");
    selected_qStat.show();
    common_incrementAnswerQuestionCount();
    selected_qBody.html(common_contentProcess(selected_question.body));

    if(tblQuestions_page==PAGE_PROFILE){
        profile_reflectActionsOnQuestions(QACTIONS_ANSWERED,selected_question);
    }


}

function tblQuestions_bindEventToAnsweredQuestion(){
    $('.answers').click(function(event){
        event.preventDefault();
    });
}

function tblQuestions_signSelectedChoice(selectedIndex){

    for(i=0;i<MAX_CHOICE_COUNT;i++){
        var choice=$('#answers_cho'+i);
        choice.removeClass();
        if(i==selectedIndex){
            choice.addClass("cho_x_selected");
        }else{
            choice.addClass("cho_x_notselected");
        }

    }
}

function tblQuestions_clearChoiceSelection(){
    for(i=0;i<MAX_CHOICE_COUNT;i++){
        var choice=$('#answers_cho'+i);
        choice.removeClass();
        choice.addClass("cho_x");
    }
}


function gTable_unbindChoiceEvents(){
    $('.cho_x').unbind();
}

function gTable_bindEventToAnsweredQuestion(){
    $('.cho_x').click(function(event){
        event.preventDefault();
    });
}

function gTable_bindEventToNonAnsweredQuestion(){
    $('.cho_x').click(function(event){
        event.preventDefault();
        tblQuestions_clearChoiceSelection();
        selected_choice=$(this);
        selected_choice.addClass("cho_x_selected");
        $('#ichoosethis_onequestion').show();
    });
}



function tblQuestions_defineQNodeBtnText(question){

    if(question==null || question.answer==null){
        return QNODE_BTN_INVALID
    }

    if(question.answer==INDEX_OF_NOT_ANSWERED)
        return QNODE_BTN_ANSWER;
    else
        return QNODE_BTN_OPENSTATS;
}


function tblQuestions_getQuestion(qID){
    for (i=0;i<display_questions.length;i++){
        var question=display_questions[i];
        if(question.id==qID){
            return question;
        }
    }
    return null;
}


function tblQuestions_removeQuestion(qID){
    for (i=0;i<display_questions.length;i++){
        var question=display_questions[i];
        if(question.id==qID){
            break;
        }
    }
    display_questions.splice(i,1);
    tblQuestions_renderQuestions(tblQuestionsData);
}



function tblQuestions_prepareStatisticsIcon(question,choiceDistb){
    selected_question_choiceCount=0;
    var choices=question.choices;
    var totalAnswer=0;
    var index=0;

    for(i=0;i<10;i++){
        $('#answerscounter_cho'+i).text("0%");
    }

    for(i=0;i<choiceDistb.map.length;i++){
        index=choiceDistb.map[i].index;
        if(index==QUESTION_TOTAL_ANSWERED_INDEX){
            totalAnswer=parseInt(choiceDistb.map[i].value);
        }
    }

    for(i=0;i<choiceDistb.map.length;i++){
        index=choiceDistb.map[i].index;
        if(index<choices.length){
            var val=parseInt(choiceDistb.map[i].value);
            var ratio=(parseFloat(val*100/totalAnswer)).toFixed(1);
            if(ratio*10%10==0){
                ratio=parseFloat(ratio).toFixed();
            }
            $('#answerscounter_cho'+index).text(ratio+"%");
        }
    }

    for(i=0;i<choices.length;i++){
        var choice=choices[i];
        if(choice==TEXT_NULL){
            $('#answers_cho'+i).hide();
            $('#answerscounter_cho'+i).hide();
        }else{
            $('#answers_cho'+i).show();
            $('#answers_cho'+i).html(common_choiceProcess(choice));
            $('#answerscounter_cho'+i).show();
            selected_question_choiceCount++;
        }
    }

    for(i=choices.length;i<10;i++){
        $('#answers_cho'+i).hide();
        $('#answerscounter_cho'+i).hide();
    }
}


function tblQuestions_getAnswerOrderStatus(choiceDistb, choiceIndex,orderByMarginal){

    var valueArray=new Array();
    var answerValue=0;

    for(i=0;i<choiceDistb.map.length;i++){
        var index=choiceDistb.map[i].index;
        if(index==choiceIndex){
            answerValue=parseInt(choiceDistb.map[i].value);
        }else if(index!=QUESTION_TOTAL_ANSWERED_INDEX && index!=84) { //?Why 84
            valueArray.push(parseInt(choiceDistb.map[i].value));
        }
    }


    var order=1;
    if(orderByMarginal==TEXT_TRUE){
        for(i=0;i<valueArray.length;i++){
            if(valueArray[i]<answerValue){
                order++;
            }
        }
    }else{
        for(i=0;i<valueArray.length;i++){
            if(valueArray[i]>answerValue){
                order++;
            }
        }
    }

    return order;
}


function tblQuestions_prepareChoiceDistribution(question){

    $.ajax({
        url: 'api/answers/distribution/'+question.id,
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            tblQuestions_prepareStatisticsIcon(question,data);
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
        }
    });
    return false;
}


function tblQuestions_prepareQuestionChoices(question){
    selected_question_choiceCount=0;
    var choices=question.choices;
    for(i=0;i<choices.length;i++){
        var choice=choices[i];
        if(choice==""){
            $('#answers_cho'+i).hide();
            $('#answerscounter_cho'+i).hide();
            $('#embed_cho'+i).hide();
        }else{
            $('#embed_cho'+i).show();
            $('#embed_cho'+i).data("embed_value",choice);
            $('#embed_cho'+i).html(common_choiceBoxProcess(choice));
            $('#answers_cho'+i).show();
            $('#answers_cho'+i).html(common_choiceProcess(choice));
            $('#answerscounter_cho'+i).hide();
            selected_question_choiceCount++;
        }
    }

    for(i=choices.length;i<10;i++){
        $('#answers_cho'+i).hide();
        $('#embed_cho'+i).hide();
        $('#answerscounter_cho'+i).hide();
    }
}


function tblQuestions_renderQuestions(data){

    //Reset
    question_answer_process.appendTo($("#question_answer_process_container")); //For IE8
    var scrollPosition=$(window).scrollTop();
    $('#static_que_section').html("<div id=que_section></div>");

    if(data==null){
        data=new Object();
        display_questions=null;
    }else if($.isArray(data.question)){
        display_questions=data.question;
    }else{
        display_questions=new Array(data.question);
    }

    tblQuestionsData=data;
    tblQuestionsData.question=display_questions;

    $('#que_section').render(tblQuestionsData, render_template);
    $(window).scrollTop(scrollPosition);
    $('.coffeecup_sendbutton').attr("title", "send a cup of coffee");

    if(selected_question!=null){
        var item=$("div:contains("+selected_question.id+")");
        if(item!=null){
            var btnAnswer=item.parents('.question_part').find('.btnAnswer');
            btnAnswer.click();
        }
    }

}