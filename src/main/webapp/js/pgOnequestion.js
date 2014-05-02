redirection_toClearURL("../");
//statistics_initialize();

var onequestion_selectedQuestion=null;
var onequestion_selectedChoice=null;
var onequestion_commentCount=0;


var youtube="<iframe title='YouTube video player' class='youtube-player' type='text/html' width='495' height='295' src='http://www.youtube.com/embed/$youtubecode$?wmode=transparent' frameborder='0'></iframe>";
var vimeo="<iframe src='http://player.vimeo.com/video/$vimeocode$' width='495' height='295' frameborder='0'></iframe>";
var htmlImgURL="<img src='{url}' width='495'  height='295'/>";
var soundCloud='<object id="toPlayer" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">'+
'<param name=movie" value="http://player.soundcloud.com/player.swf?url=http%3A%2F%2Fsoundcloud.com%2F$soundcloudCode1$%2F$soundcloudCode2$&enable_api=true&object_id=toPlayer"></param>'+
'<param name="allowscriptaccess" value="always"></param>'+
'<embed allowscriptaccess="always" height="81" src="http://player.soundcloud.com/player.swf?url=http%3A%2F%2Fsoundcloud.com%2F$soundcloudCode3$%2F$soundcloudCode4$&enable_api=true&object_id=toPlayer" type="application/x-shockwave-flash" width="495" name="toPlayer"></embed>'+
'</object>';

var whoAvatarTemp='<div class="who-avatar"><a href="$avatarLink$"  title="$usernameTooltip$"><img class="tinypicture" src="$avatarImgURL$" /></a> </div>'
var whoAvatarMoreTemp='<a class="who-avatar-more" title="more" href="">...</a>'
var whoAvatarDispStat='<a id="btnDisplayStat" class="display-stat" href="#" ></a>'


var oMp3Player='<object type="application/x-shockwave-flash" data="http://flash-mp3-player.net/medias/player_mp3_maxi.swf" width="12" height="12">'+
'<param name="movie" value="http://flash-mp3-player.net/medias/player_mp3_maxi.swf" />'+
'<param name="bgcolor" value="#f5ebec" />'+
'<param name="FlashVars" value="mp3={url}&amp;width=12&amp;height=12&amp;showslider=0&amp;showloading=never&amp;buttonwidth=12&amp;sliderwidth=0&amp;sliderheight=0&amp;volumewidth=0&amp;volumeheight=0&amp;loadingcolor=ffffff&amp;bgcolor=f5ebec&amp;bgcolor1=f5ebec&amp;bgcolor2=f5ebec&amp;slidercolor1=ffffff&amp;slidercolor2=ffffff&amp;sliderovercolor=ffffff&amp;buttoncolor=304e63&amp;buttonovercolor=505050" />'+
'</object>'


var statsDisplayFlag=false;


function onequestion_prepareQuestionChoices(question){
    var selected_question_choiceCount=0;
    var choices=question.choices;
    for(i=0;i<choices.length;i++){
        var choice=choices[i];
        if(choice==TEXT_NULL){
            $('#answers_cho'+i).hide();
            $('#embed_cho'+i).hide();
        }else{
            if(common_isContainsSound(choice)){
                $('#embed_cho'+i).show();
                $('#embed_cho'+i).html(common_choiceBoxProcessOneQuestion(choice,oMp3Player));
                $('#embed_cho'+i).removeClass();
                $('#embed_cho'+i).addClass("playericon");
            }else if(common_isContainsLink0(choice) || common_isContainsLink1(choice)){
                $('#embed_cho'+i).show();
                $('#embed_cho'+i).html(common_choiceBoxProcessOneQuestion(choice));
                $('#embed_cho'+i).removeClass();
                $('#embed_cho'+i).addClass("linkicon");
            }else{
                $('#embed_cho'+i).hide();
            }
            $('#answers_cho'+i).show();
            $('#answers_cho'+i).html(common_choiceProcess(choice));
            selected_question_choiceCount++;
        }
    }

    for(i=choices.length;i<10;i++){
        $('#answers_cho'+i).hide();
        $('#ansright'+i).hide();
        $('#embed_cho'+i).hide();
    }
}


function onequestion_prepareStatisticsIcon(question,choiceDistb){
    var selected_question_choiceCount=0;
    var choices=question.choices;
    var totalAnswer=0;
    var index=0;
    for(i=0;i<choiceDistb.map.length;i++){
        index=choiceDistb.map[i].index;
        if(index<choices.length){
            totalAnswer+=parseInt(choiceDistb.map[i].value);
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

            $('#anscounter'+index).text(ratio+"%");
        }
    }

    for(i=0;i<choices.length;i++){
        var choice=choices[i];
        if(choice==TEXT_NULL){
            $('#answers_cho'+i).hide();
            $('#ansright'+i).hide();
        }else{
            $('#answers_cho'+i).show();
            $('#answers_cho'+i).html(common_choiceProcess(choice));
            $('#ansright'+i).show();
            selected_question_choiceCount++;
        }
    }

    for(i=choices.length;i<10;i++){
        $('#answers_cho'+i).hide();
        $('#ansright'+i).hide();
    }
}



function onequestion_signSelectedChoice(){
    for(i=0;i<MAX_CHOICE_COUNT;i++){
        var choice=$('#answers_cho'+i);
        choice.removeClass();
        choice.addClass("answers_notselected");
    }
    onequestion_selectedChoice.addClass("answers_selected");
}


function onequestion_prepareOwnerInfo(){

    var fullname=onequestion_selectedQuestion.ownerFullName;
    $('#fullname_onequestion').html(fullname);

    var username=onequestion_selectedQuestion.owner;

    $('#avatarLink_onequestion').attr('href', '../'+username);
    $('#avatarImg_onequestion').attr('src', onequestion_selectedQuestion.ownerSmallAvatarURL);

    $('#usernameLink_onequestion').attr('href', '../'+username);
    $('#usernameLink_onequestion').text(username);


}

function onequestion_prepareChoiceDistribution(question){

    $.ajax({
        url: '../api/answers/distribution/'+question.id,
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function(data){
            onequestion_prepareStatisticsIcon(question,data);
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG,"../");
        }
    });
    return false;

}


function onequestion_bindEventForNonLoginUser(){
    $('.answers').click(function(event){
        event.preventDefault();
        notifyBar_display(ERR_MSG_PLEASE_SIGNIN,ICON_URL_NOTIFY_WRONG);
    });
}



function onequestion_bindEventToNonAnsweredQuestion(){
    $('.answers').click(function(event){
        event.preventDefault();
        if(onequestion_selectedQuestion.answer==INDEX_OF_NOT_ANSWERED){
            for(i=0;i<MAX_CHOICE_COUNT;i++){
                var choice=$('#answers_cho'+i);
                choice.removeClass();
                choice.addClass("answers_notselected");
            }
            onequestion_selectedChoice=$(this);
            onequestion_selectedChoice.addClass("answers_selected");
            $('#ichoosethis_onequestion').show();
        }
    });
}


function onequestion_bindEventToAnsweredQuestion(){
    $('.answers').click(function(event){
        event.preventDefault();
    });
}

function onequestion_unbindEvents(){
    $('.answers').unbind();
}


function onequestion_defineLoveBtnStatus(){
    $('#btnLove').removeClass();
    if(onequestion_selectedQuestion.isQuestionFaved=="true"){
        $('#btnLove').addClass('loveactselected');
        $('#btnLove').attr("title","remove love")
    }else{
        $('#btnLove').addClass('loveact');
        $('#btnLove').attr("title","add love")
    }
}

function onequestion_bindEventToLove(){
    $('#btnLove').click(function(event){
        event.preventDefault();
        if(common_checkPOST()){
            var bAddLove=TEXT_TRUE;
            var URL='../api/favorites/'+onequestion_selectedQuestion.id;
            if(onequestion_selectedQuestion.isQuestionFaved==TEXT_TRUE){
                bAddLove=TEXT_FALSE;
                URL= '../api/favorites/remove/'+onequestion_selectedQuestion.id;
            }
            $.ajax({
                url: URL,
                type: "POST",
                async: false,
                success: function(data){
                    onequestion_selectedQuestion.isQuestionFaved=bAddLove;
                    onequestion_defineLoveBtnStatus();
                    if(bAddLove==TEXT_TRUE){
                        onequestion_selectedQuestion.likedCount++;
                    }else{
                        onequestion_selectedQuestion.likedCount--;
                    }
                    onequestion_updateLovedAndAnsweredCount();
                },
                error:function (xhr){
                    if(xhr.status==HTTP_STATUS_NOT_FOUND){
                        redirection_execute(PAGE_ONEQUESTION, "../"+PAGE_HOME, xhr.responseText);
                    }else{
                        notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG,"../");
                    }
                }
            });
        }
        return false;
    });

}


function onequestion_defineComponentVisibilityAccordingAuthentication(){

    
    if(cookie_get(COOKIE_SIGNIN)==COOKIE_SIGNIN_VAL){
        $('#userAvatar').attr("src",cookie_get(COOKIE_AVATAR_SMALL_URL));
        mainBar_initialize("../");
        mainBar_initializeSearch();
        $('#logindock').hide();
        $('#docka').show();
        $('.right-person-navi').show();
        $('#btnCoffee').show();
        $('#btnReask').show();
        $('#btnLove').show();
        $('#commentSendLayout').show();
        $('#trendbottom').hide();
        mainBar_startTimer();
    }else{
        $('#docka').hide();
        $('.right-person-navi').hide();
        $('#btnCoffee').hide();
        $('#btnReask').hide();
        $('#btnLove').hide();
        $('#commentSendLayout').hide();
        $('#trendbottom').show();
        mainBar_stopTimer();
    }


}


function onequestion_defineStatus(){

    onequestion_bindEventToLove();
    onequestion_prepareQuestionChoices(onequestion_selectedQuestion);
    /*if(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL){ Pulic Answer
        onequestion_bindEventForNonLoginUser();
    }else */
    if(onequestion_selectedQuestion.answer==INDEX_OF_NOT_ANSWERED){
        onequestion_bindEventToNonAnsweredQuestion(); //Second Status
    }else{
        onequestion_bindEventToAnsweredQuestion();          //Third Status
        onequestion_selectedChoice=$('#answers_cho'+onequestion_selectedQuestion.answer);
        onequestion_signSelectedChoice();
        onequestion_prepareChoiceDistribution(onequestion_selectedQuestion);
    }
       
}


function onequestion_defineDeletionStatus(){

    if(cookie_get(COOKIE_USERNAME)=="trendocean"){
        $("#btnDeleteQuestion").show();
    }else if(onequestion_selectedQuestion.totalAnswerCount==0 &&
        onequestion_selectedQuestion.owner==cookie_get(COOKIE_USERNAME)){
        $("#btnDeleteQuestion").show();
    }else{
        $("#btnDeleteQuestion").hide();
    }
}


function onequestion_themeProcessDesign(){

    $.ajax({
        async:false,
        url:'../api/users/'+onequestion_selectedQuestion.owner,
        type: "GET",
        success: function(data){

            //design
            var themeBgImage=data.design.backgroundURL;
            var themeBgImageTiled=data.design.backgroundTiled;
            if(themeBgImage!=TEXT_NULL){
                $('body').css('background-position', '0px 0px');
                $('body').css('background-image',"url("+themeBgImage+")");
                if(themeBgImageTiled==TEXT_TRUE){
                    $('body').css('background-repeat',"repeat");
                }else{
                    $('body').css('background-repeat',"no-repeat");
                }
            }
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
        }
    });



}


function onequestion_updateQuestion(){
    var qID=common_getURLSegment(1);
    $.ajax({
        url: '../api/question/getQuestion',
        type: "GET",
        data:{
            'qId':qID
        },
        success: function(resp){
            var data=resp.data;
            onequestion_selectedQuestion=data;
            coffeeDlg_setContent(data.owner,cookie_get(COOKIE_USERNAME),data.ownerSmallAvatarURL);
            if(data.owner==cookie_get(COOKIE_USERNAME)){
                $('#btnCoffee').hide();
                $('#btnReask').hide();

            }

            var content=common_contentProcessing(data.body,CONTENT_PROCESS_FOR_ONE_QUESTION);
            $('#body_onequestion').html(content);
            onequestion_prepareOwnerInfo();
            onequestion_updateCreationDate();
            onequestion_defineStatus();
            onequestion_defineDeletionStatus();
            onequestion_defineLoveBtnStatus();
            onequestion_updateLovedAndAnsweredCount();
            onequestion_updateCommentCount();
            onequestion_updateWhoIsAnsweredAvatar();
            onequestion_themeProcessDesign();
            onequestion_displayComments();
            common_preventScreenFlash();

            //Display Stat if Press Statistics Button Other Page or etc..
            if(jQuery.url.setUrl(document.location).attr("anchor")=="stat"){
                $("#btnDisplayStat").click();
            }

        },
        error:function (xhr){
           // window.location.href="../"+PAGE_OPPS;
        }
    });
}


function onequestion_updateCreationDate(){
    var epoc=onequestion_selectedQuestion.creationDate*1;
    var datum = new Date(epoc);
    $('#questionaddedDate').html("question added " +common_getRemainingTime(datum));
}


function onequestion_displayCommentCount(){
    $('#btnDiplayComments').text("see more comments ("+onequestion_commentCount+")")
}


function onequestion_updateCommentCount(){
    onequestion_commentCount=onequestion_selectedQuestion.numberOfComments;
    onequestion_displayCommentCount();
}

function onequestion_updateLovedAndAnsweredCount(){
    $('#qLoved').text(onequestion_selectedQuestion.likedCount+" loved, ");
    $('#qAnswered').text(onequestion_selectedQuestion.totalAnswerCount+" answered");
}

function onequestion_displayComments(){
    $.ajax({
        url: '../api/comments/'+onequestion_selectedQuestion.id,
        type: "GET",
        success: function(data){
            tblComments_renderComments(data);
            $('#trendbottom').css("bottom","-135px");
            return false;
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG,"../");
        }
    });
    return false;
}

function onequestion_displayMoreComments(){

    var length=display_comments.length;
    if(length>0){
        $('#tableLoadingIcon').show();
        var cID=display_comments[length-1].commentID;
        $.ajax({
            url: '../api/comments/'+onequestion_selectedQuestion.id+'?startComment='+cID+'&size=5',
            type: "GET",
            success: function(data){
                if(data!=null){
                    data.comment=display_comments.concat(data.comment);
                    tblComments_renderComments(data);
                    $('#tableLoadingIcon').hide();
                }
            },
            error:function (xhr){
                $('#tableLoadingIcon').hide();
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG,"../");
            }
        });
    }
    return false;
 
}


function onequestion_getAnswerOrderStatus(choiceDistb, choiceIndex,orderByMarginal){

    var valueArray=new Array();
    var answerValue=0;

    for(i=0;i<choiceDistb.map.length;i++){
        var index=choiceDistb.map[i].index;
        if(index==choiceIndex){
            answerValue=parseInt(choiceDistb.map[i].value);
        }else if(index!=QUESTION_TOTAL_ANSWERED_INDEX && index!=84) { //? Why
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


function onequestion_updateWhoIsAnsweredAvatar(){

    $('#whoansweredDiv').empty();
    if(onequestion_selectedQuestion.totalAnswerCount==0){
        $('#whoansweredDiv').hide();
    }else{
        $('#whoansweredDiv').show();
    }

    var display_oqRelateds=null;
    var qID=onequestion_selectedQuestion.id;
    if(onequestion_selectedQuestion!=null){
        $.ajax({
            url: '../api/answers/all/'+qID,
            type: "GET",
            success: function(data){

                if(data==null){
                    display_oqRelateds=null;
                    return;
                }else if($.isArray(data.answerOfUser)){
                    display_oqRelateds=data.answerOfUser;
                }else{
                    display_oqRelateds=new Array(data.answerOfUser);
                }

                for(i=0;i<display_oqRelateds.length;i++){
                    if(i<17){
                        var whoAvatarDOM=whoAvatarTemp.replace('$avatarLink$',"../"+display_oqRelateds[i].username);
                        var choiceIndex=display_oqRelateds[i].choiceIndex;
                        if(choiceIndex!=-1){
                            whoAvatarDOM=whoAvatarDOM.replace('$usernameTooltip$',common_choiceProcess(common_htmlStrip(onequestion_selectedQuestion.choices[display_oqRelateds[i].choiceIndex])));
                        }else{
                            whoAvatarDOM=whoAvatarDOM.replace('$usernameTooltip$',common_choiceProcess(common_htmlStrip("locked")));
                        }
                        whoAvatarDOM=whoAvatarDOM.replace('$avatarImgURL$',display_oqRelateds[i].smallAvatar);
                        $('#whoansweredDiv').append(whoAvatarDOM);
                    }
                }
                if(display_oqRelateds.length==20){
                    $('#whoansweredDiv').append(whoAvatarMoreTemp);
                }

                $('.who-avatar-more').click(function(event){
                    event.preventDefault();
                    $('#qAnswered').click();
                });


            },
            error:function (xhr){
                if(xhr.status==HTTP_STATUS_NOT_FOUND){
                    redirection_execute(PAGE_ONEQUESTION, "../"+PAGE_HOME, xhr.responseText);
                }else{
                    notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG,"../");
                }
            }
        });
    }
    $('#whoansweredDiv').append(whoAvatarDispStat);
    if(onequestion_selectedQuestion.answer!=INDEX_OF_NOT_ANSWERED
        ||onequestion_selectedQuestion.owner==cookie_get(COOKIE_USERNAME)){
        $("#btnDisplayStat").show();
    }else{
        $("#btnDisplayStat").hide();
    }


    return false;


}






function onequestion_answerSucceeded(prevTrend,choiceIndex,choiceDistData){

    $('#waitingIcon').hide();
    $('#ichoosethis_onequestion').hide();
    $('#statistic_onequestion').show();

    onequestion_selectedQuestion.answer=""+choiceIndex;
    //onequestion_prepareStatisticsIcon(onequestion_selectedQuestion,choiceDistData);
    onequestion_unbindEvents();
    onequestion_bindEventToAnsweredQuestion();
    onequestion_signSelectedChoice();
    onequestion_selectedQuestion.totalAnswerCount++;
    onequestion_updateLovedAndAnsweredCount();
            
           
    var order=onequestion_getAnswerOrderStatus(choiceDistData, choiceIndex, cookie_get(COOKIE_MARGINAL));
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

    $('#answerOrder').text("");
    if(cookie_get(COOKIE_MARGINAL)==TEXT_TRUE){
        $('#deltaTrend').text(orderText+' MOST ECCENTRIC ANSWER');
    }else{
        $('#deltaTrend').text(orderText+' MOST TRENDY ANSWER');
    }

    var content=common_contentProcessing(onequestion_selectedQuestion.body,CONTENT_PROCESS_FOR_ONE_QUESTION);
    $('#body_onequestion').html(content);
    onequestion_updateWhoIsAnsweredAvatar();

}


$(document).ready(function() {

    if(redirection_isURLContainsSSLOrWWW()){
        return;
    }

    authenticationdock_initialize();
    mainLinks_initialize(PAGE_ONEQUESTION);
    onequestion_defineComponentVisibilityAccordingAuthentication();

    $(".shareact").click(function(event){
        event.preventDefault();
        shareDlg_setContent(onequestion_selectedQuestion)
        shareDlg_display($(this), 100, 0);
    });

    $("#txtboxComment").counter({
        dispID:"commentpart_counter",
        goal:"300",
        dispIDColor:"#666"
    });



    $("#btnRandomQuestion").click(function(event){
        event.preventDefault();
        $.ajax({
            url: '../api/questions/random?startIndex='+onequestion_selectedQuestion.id,
            type: "GET",
            success: function(data){
                if(data!=null && data!=TEXT_NULL){
                    window.location.href=data.id;
                }
            },
            error:function (xhr){
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG,"../");
            }
        });
        return false;
    });


    $("#chart_div").hide();
    $("#btnDisplayStat").live("click",function(event){
        event.preventDefault();
        if(onequestion_selectedQuestion.answer!=INDEX_OF_NOT_ANSWERED ||
            onequestion_selectedQuestion.owner==cookie_get(COOKIE_USERNAME)){
            if(!statsDisplayFlag){
                statsDisplayFlag=true;
                $("#chart_div").show();
                //statistics_display(onequestion_selectedQuestion);
            }else{
                $("#chart_div").hide();
                statsDisplayFlag=false;
            }
        }
    });

    $("#deleteQuestionConfirmDialog").hide();
    $("#btnDeleteQuestion").hide();
    
    $("#btnDeleteQuestion").click(function(event){
        event.preventDefault();
        $("#deleteQuestionConfirmDialog").show();
        $('#deleteQuestionConfirmDialog').css("position","absolute");
        var sWidth=$(window).width();
        var dWidth=$('#deleteQuestionConfirmDialog').width();
        $('#deleteQuestionConfirmDialog').css("left",(sWidth-dWidth)/2);
        $('#deleteQuestionConfirmDialog').css("top",300);
    });

    $("#btnDeleteQuestionNo").click(function(event){
        event.preventDefault();
        $("#deleteQuestionConfirmDialog").hide();
    });

    $("#btnDeleteQuestionYes").click(function(event){
        event.preventDefault();
        $.ajax({
            url: '../api/questions/'+onequestion_selectedQuestion.id,
            type: "DELETE",
            success: function(){
                window.location.href="../"+PAGE_HOME;
            },
            error:function (xhr){
                if(xhr.status==HTTP_STATUS_FORBIDDEN){
                    $("#btnDeleteQuestion").hide();
                    $("#deleteQuestionConfirmDialog").hide();
                    notifyBar_display(xhr.responseText,ICON_URL_NOTIFY_WRONG);
                    onequestion_selectedQuestion.totalAnswerCount=1;
                    onequestion_updateLovedAndAnsweredCount();
                }else if(xhr.status==HTTP_STATUS_NOT_FOUND){
                    window.location.href="../"+PAGE_HOME;
                }
            }
        });
        return false;
    });


    tblQuestionRelatedUsers_initialize("../");
    $("#questionRelatedUsers").hide();


    $('#questionRelatedUsersClose').click(function(event){
        event.preventDefault();
        $('#questionRelatedUsers').hide();

    });

    $('#qAnswered').click(function(event){
        event.preventDefault();
        var qID=onequestion_selectedQuestion.id;
        if(onequestion_selectedQuestion!=null){
            $.ajax({
                url: '../api/answers/all/'+qID,
                type: "GET",
                success: function(data){

                    var sWidth=$(window).width();
                    var dWidth=$('#questionRelatedUsers').width();

                    $('#questionRelatedUsers').css("position","absolute");
                    $('#questionRelatedUsers').css("top",200);
                    $('#questionRelatedUsers').css("left",(sWidth-dWidth)/2);
                    $('#questionRelatedUsersTitle').text("Answered");
                    $("#questionRelatedUsers").show();
                    tblQuestionRelatedUsers_render(data,"answers", onequestion_selectedQuestion);
                },
                error:function (xhr){
                    if(xhr.status==HTTP_STATUS_NOT_FOUND){
                        redirection_execute(PAGE_ONEQUESTION, "../"+PAGE_HOME, xhr.responseText);
                    }else{
                        notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG,"../");
                    }
                }
            });
        }
        return false;
    });


    $('#qLoved').click(function(event){
        event.preventDefault();
        var qID=onequestion_selectedQuestion.id;
        if(onequestion_selectedQuestion!=null){
            $.ajax({
                url: '../api/favorites/favoritedUsers/'+qID,
                type: "GET",
                success: function(data){

                    var sWidth=$(window).width();
                    var dWidth=$('#questionRelatedUsers').width();

                    $('#questionRelatedUsers').css("position","absolute");
                    $('#questionRelatedUsers').css("top",200);
                    $('#questionRelatedUsers').css("left",(sWidth-dWidth)/2);
                    $('#questionRelatedUsersTitle').text("Loved");
                    $("#questionRelatedUsers").show();
                    tblQuestionRelatedUsers_render(data,"loved",onequestion_selectedQuestion);
                },
                error:function (xhr){
                    if(xhr.status==HTTP_STATUS_NOT_FOUND){
                        redirection_execute(PAGE_ONEQUESTION, "../"+PAGE_HOME, xhr.responseText);
                    }else{
                        notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG,"../");
                    }
                }
            });

        }
        return false;
    });



    shareDlg_initialize("../");
    coffeeDlg_initialize($("#btnCoffee"));
    coffeeDlg_setRelativePath("../");
    $("#btnCoffee").attr("title","send a cup of coffee");
    $("#btnReask").attr("title","Reask");

    for(i=0;i<10;i++){
        var choice=$('#answers_cho'+i);
        choice.hide();
        choice.data(DATA_CHOICE_INDEX,i);
        $('#answers_cho'+i).data(DATA_CHOICE_INDEX,i);
        $('#ansright'+i).hide();
        $('#anscounter'+i).text("%0");
    }

    $('#waitingIcon').hide();
    $('#btnAnswer').hide();
    $('#ichoosethis_onequestion').hide();
    $('#statistic_onequestion').hide();


    $('#ichooseact_onequestion').click(function(event){
        event.preventDefault();
        if(common_checkAnswerPOST()){
            var prevTrend=cookie_get(COOKIE_LOGINUSER_TREND);
            $('#waitingIcon').show();
            var answer = new Object();
            answer.questionID = onequestion_selectedQuestion.id;
            answer.choiceIndex =onequestion_selectedChoice.data(DATA_CHOICE_INDEX);
            var answerJSON = $.toJSON(answer);
            $.ajax({
                url: '../api/answers',
                type: "POST",
                data: (answerJSON),
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                success: function(data){
                    onequestion_answerSucceeded(prevTrend, answer.choiceIndex,data)

                },
                error:function (xhr){
                    $('#waitingIcon').hide();
                    $('#ichoosethis_onequestion').hide();
                    if(xhr.status==HTTP_STATUS_BAD_REQUEST){
                        window.location.href=jQuery.url.attr("source")
                    }else if(xhr.status==HTTP_STATUS_NOT_FOUND){
                        redirection_execute(PAGE_ONEQUESTION, "../"+PAGE_HOME, xhr.responseText);
                    }else{
                        notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG,"../");
                    }
                }
            });
        }
        return false;
    });

    onequestion_updateQuestion();
    notifyBar_initialize();
    tblComments_initialize();




    $('#btnAddComment').click(function(event){
        event.preventDefault();
        if(common_checkPOST()){

            if($('#txtboxComment').val().length>300){
                notifyBar_display(ERR_MSG_COMMENT_MAX_LENGTH,ICON_URL_NOTIFY_WRONG);
                return false;
            }
        
            var comment = new Object();
            comment.questionID = onequestion_selectedQuestion.id;
            comment.commentText=$('#txtboxComment').val();
            var commentJSON = $.toJSON(comment);
            $.ajax({
                url: '../api/comments/',
                type: "POST",
                data: (commentJSON),
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                success: function(data){
                    $('#txtboxComment').val("");
                    $('#txtboxComment').focus();
                    tblComments_addComment(data);
                },
                error:function (xhr){
                    if(xhr.status==HTTP_STATUS_BAD_REQUEST){
                        notifyBar_display(xhr.responseText,ICON_URL_NOTIFY_WRONG);
                    }else if(xhr.status==HTTP_STATUS_NOT_FOUND){
                        redirection_execute(PAGE_ONEQUESTION, "../"+PAGE_HOME, xhr.responseText);
                    }else{
                        notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG,"../");
                    }
                }
            });
        }
        return false;
    });


    $('#btnReask').click(function(event){
        event.preventDefault();


        $.ajax({
            url: '../api/questions/reask/'+onequestion_selectedQuestion.id,
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
        return false;
    });

    $('#btnDiplayComments').click(function(event){
        event.preventDefault();
        onequestion_displayMoreComments();
    });

   
    common_registerMoreActionListener(function(){

        if ( $('#tableLoadingIcon').is(':visible')==false && onequestion_commentCount>display_comments.length){
            onequestion_displayMoreComments();
        }else if ( $('#tableLoadingIcon').is(':visible')==true && onequestion_commentCount==display_comments.length){
            $('#tableLoadingIcon').hide();
        }
    
    });

    //FOR SEO
    $('#dlgShare_Title').text("Share");
    $('#dlgShare_Info').text("Share one question via:");
    $('#dlgMsg_info').text("Share this question with your friend:");
    $('#dlgShareEmail_Label').text("e-mail:");
    $('#dlgShareEmail_succeedLabel').text("shared via e-mail");
    $('#dlgShareEmail_sendBtn').text("share");
    $('#questionRelatedUsersTitle').text("Answered");
    $('#dlgCoffee_Title').text("Coffee");
    $('#dlgCoffee_lblSucceed').text("your coffee was sent.");
    $('#dlgCoffee_sendBtn').text("send");
    $('#deleteQuestionConfirmDialog_Info').text("Are you sure you want to delete this question?");
    $('#btnDeleteQuestionYes').text("yes");
    $('#btnDeleteQuestionNo').text("no");
    $('#locked_text').html('When oceaner hide her/his answers from settings, the answer is not visible to everyone and you see locked image. for more information: <a href="http://trendocean.com/privacy.html">answer visibility</a>');
    $('#qRelated_More').text('more');

    $('#ichoosethis_onequestion_info').text('i choose! Show me statistics');
    $('#ichooseact_onequestion').text('i choose');
    $('#share_actLink').text('share');
    $('#btnAddComment').text('add comment');
    $('#btnAnswer').text('answer');
    $('#btnDeleteQuestion').text('delete question');
    $('#sepLabel0').text('.');
    $('#sepLabel1').text('.');
    $('#sepLabel2').text('.');
    $('#sepLabel3').text('.');

    
    //SEO MainLinks (Common)
    $('#toMark').text("© 2011 TrendOcean");
    $('#aboutLink').text("About Us");
    $('#blogLink').text("Blog");
    $('#teamLink').text("Team");
    $('#businessLink').text("Business");
    $('#helpLink').text("Help");
    $('#termsLink').text("Terms");

    //SEO AuthenticationDock
    $('#logindock_label').text("Sign in to answer");
    $('#logindock_label2').text("username:");
    $('#logindock_label3').text("password:");
    $('#logindock_label4').text("remember me:");
    $('#btnLogin').text("sign in");


    //SEO MainBar 
    $('#settings_MainBar').text("Settings");
    $('#following_MainBar').text("Following");
    $('#followers_MainBar').text("Followers");
    $('#logout_MainBar').text("Sign Out");
    $('#myOcean_MainBar').text("My Ocean");
    $('#profile_MainBar').text("Profile");
    $('#trendradar_MainBar').text("trendradar");
    $('#addQuestion_MainBar').text("add question");




});