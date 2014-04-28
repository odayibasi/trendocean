var widgetQuestionID;
var onequestion_selectedQuestion=null;
var onequestion_selectedChoice=null;
var DATA_CHOICE_INDEX="towidget_index";



var widgetQuestionDOM='<div id="stage" >'+
'        <!-- interaction with user -->'+
'<div class="que_header">'+
'<div class="que_profile">'+
'<div class="profile_image" id="avatar_onequestion">'+
'<a id="avatarLink_onequestion" href="#"><img id="avatarImg_onequestion" width="48" height="48" src=""></a> </div>'+
'<div class="profile_info">'+
'<div class="profilename" id="fullname_onequestion">NTV Anket</div>'+
'<div class="profileuser" id="username_onequestion"><a id="usernameLink_onequestion" href="#" >ntvhaber</a></div></div>'+
'</div>'+
'</div>'+
'<!-- interaction with user -->'+
'<!-- question stuff -->'+
'<div class="que_up">'+
'</div>'+
'<div class="que_main" id="body_onequestion" >omu �umu bumu?</div>'+
'<div class="que_bottom">'+
'</div>'+
'<!-- question stuff -->'+
'<!-- answer stuff -->'+
'<a class="answers" id="answers_cho0" ></a><div class="ansright" id="ansright0"><a class="anscounter" id="anscounter0">%0</a></div><div class="ansleft" id="ansleft0"><div class="playericon" id="embed_cho0"></div></div>'+
'<a class="answers" id="answers_cho1" ></a><div class="ansright" id="ansright1"><a class="anscounter" id="anscounter1">%0</a></div><div class="ansleft" id="ansleft1"><div class="playericon" id="embed_cho1"></div></div>'+
'<a class="answers" id="answers_cho2" ></a><div class="ansright" id="ansright2"><a class="anscounter" id="anscounter2">%0</a></div><div class="ansleft" id="ansleft2"><div class="playericon" id="embed_cho2"></div></div>'+
'<a class="answers" id="answers_cho3" ></a><div class="ansright" id="ansright3"><a class="anscounter" id="anscounter3">%0</a></div><div class="ansleft" id="ansleft3"><div class="playericon" id="embed_cho3"></div></div>'+
'<a class="answers" id="answers_cho4" ></a><div class="ansright" id="ansright4"><a class="anscounter" id="anscounter4">%0</a></div><div class="ansleft" id="ansleft4"><div class="playericon" id="embed_cho4"></div></div>'+
'<a class="answers" id="answers_cho5" ></a><div class="ansright" id="ansright5"><a class="anscounter" id="anscounter5">%0</a></div><div class="ansleft" id="ansleft5"><div class="playericon" id="embed_cho5"></div></div>'+
'<a class="answers" id="answers_cho6" ></a><div class="ansright" id="ansright6"><a class="anscounter" id="anscounter6">%0</a></div><div class="ansleft" id="ansleft6"><div class="playericon" id="embed_cho6"></div></div>'+
'<a class="answers" id="answers_cho7" ></a><div class="ansright" id="ansright7"><a class="anscounter" id="anscounter7">%0</a></div><div class="ansleft" id="ansleft7"><div class="playericon" id="embed_cho7"></div></div>'+
'<a class="answers" id="answers_cho8" ></a><div class="ansright" id="ansright8"><a class="anscounter" id="anscounter8">%0</a></div><div class="ansleft" id="ansleft8"><div class="playericon" id="embed_cho8"></div></div>'+
'<a class="answers" id="answers_cho9" ></a><div class="ansright" id="ansright9"><a class="anscounter" id="anscounter9">%0</a></div><div class="ansleft" id="ansleft9"><div class="playericon" id="embed_cho9"></div></div>'+
'<!-- answer stuff -->'+
'<!--  statistic here -->'+
'<div id="statistic_onequestion">'+
'<div class="stattop_one"></p></div>'+
'<div class="statbottom_one">'+
'<div id="deltaTrend" class="bigstat_one"></div>'+
'<div id="answerOrder" class="mediumstat_one"></div>'+
'</div>'+
'</div>'+
'<!--  statistic here -->'+
'<!--  i choose act i choose act -->'+
'<div id="ichoosethis_onequestion" class="ichoosethis">'+
'<div id="ichoosethis_onequestion_info" class="ichoose_info>i choose! Show me statistics</div>'+
'<div id="waitingIcon" class="oneque_loader"></div>'+
'<a id="ichooseact_onequestion" class="ichoose_act">i choose</a>'+
'</div>'+
'<!--  comments -->'+
'<div class="commenttop-one"></p></div>'+
'<div class="commentbottom-one">'+
'<!-- navi -->'+
'<div class="commentfrom-navi">'+
'<div class="comment-see-act">'+
'<i id="questionaddedDate">question added 5 hours ago</i>'+
'</div>'+
'<i id="sepLabel3" class="seperator" >.</i>'+
'<div class="answered-loved-act">'+
'<a href="#" id="qLoved" >254845 loved, </a>'+
'<a href="#" id="qAnswered" >25458 answered</a>'+
'</div>'+
'</div>'+
'<!-- navi-->'+
'</div>'+
'</div>'


widget_addCSSLink('onequestion.css');
widget_addCSSLink('default.css');
widget_addCSSLink('dock.css');
widget_addCSSLink('docka.css');
widget_addCSSLink('smallscreen.css');
widget_addCSSLink('comments.css');
widget_addCSSLink('structure.css');


function widget_addCSSLink(cssFile){

    var headID = document.getElementsByTagName("head")[0];
    var cssNode = document.createElement('link');
    cssNode.type = 'text/css';
    cssNode.rel = 'stylesheet';
    cssNode.href = 'css/default/'+cssFile;
    cssNode.media = 'screen';
    headID.appendChild(cssNode);
}


function widget_prepareStatisticsIcon(question,choiceDistb){
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
        if(choice==""){
            $('#answers_cho'+i).hide();
            $('#ansright'+i).hide();
        }else{
            $('#answers_cho'+i).show();
            $('#answers_cho'+i).html(choice);
            $('#ansright'+i).show();
            selected_question_choiceCount++;
        }
    }

    for(i=choices.length;i<10;i++){
        $('#answers_cho'+i).hide();
        $('#ansright'+i).hide();
    }
}


function widget_unbindEvents(){
    $('.answers').unbind();
}


function widget_answerSucceeded(choiceIndex,choiceDistData){

    $('#waitingIcon').hide();
    $('#ichoosethis_onequestion').hide();

    onequestion_selectedQuestion.answer=""+choiceIndex;
    widget_prepareStatisticsIcon(onequestion_selectedQuestion,choiceDistData);
    widget_unbindEvents();
    widget_bindEventToAnsweredQuestion();
    widget_signSelectedChoice();
    onequestion_selectedQuestion.totalAnswerCount++;
    widget_updateLovedAndAnsweredCount();
            
}



function widget_answerQuestion(){

    var selectedChoice=onequestion_selectedChoice.data(DATA_CHOICE_INDEX);
    $.ajax({
        url: 'http://trendocean.com/api/answers/withjsonp?qid='+widgetQuestionID+'&choiceIndex='+selectedChoice,
        type: "GET",
        crossDomain:true,
        dataType: "jsonp",
        success: function(data){
            widget_answerSucceeded(selectedChoice,data);
        },
        error:function (jqXHR, textStatus, errorThrown){
            alert("failed");
        }
    });
    return false;
}






function widget_prepareQuestionChoices(question){
    var selected_question_choiceCount=0;
    var choices=question.choices;
    for(i=0;i<choices.length;i++){
        var choice=choices[i];
        if(choice==""){
            $('#answers_cho'+i).hide();
            $('#embed_cho'+i).hide();
        }else{
            $('#answers_cho'+i).show();
            $('#answers_cho'+i).html(choice);
            selected_question_choiceCount++;
        }
    }

    for(i=choices.length;i<10;i++){
        $('#answers_cho'+i).hide();
        $('#ansright'+i).hide();
        $('#embed_cho'+i).hide();
    }
}



function widget_getRemainingTime(qDate){

    if(qDate>2000000000000){
        qDate=qDate/1000;
    }

    if(qDate < 1397458597){
        qDate=qDate*1000;
    }


    var deltaTime = (new Date()-qDate);

    //make sure success hasn't been reached
    if (deltaTime.valueOf() > 0) {
        //update the values
        var seconds = deltaTime.valueOf()/1000;
        var day = (Math.floor(seconds/86400))%86400;
        var hrs = (Math.floor(seconds/3600))%24;
        var min = (Math.floor(seconds/60))%60;
        var sec = (Math.floor(seconds/1))%60;

        if(day>0){
            return  day +" days ago";
        }else if(hrs>0){
            return hrs +" hours ago";
        }else if(min>0){
            return min +" minutes ago";
        }else if(sec>0){
            return sec +" seconds ago";
        }
    }else{
        return "now";
    }

}


function widget_updateCreationDate(){
    var epoc=onequestion_selectedQuestion.creationDate*1;
    var datum = new Date(epoc);
    $('#questionaddedDate').html("question added " +widget_getRemainingTime(datum));
}



function widget_updateLovedAndAnsweredCount(){
    $('#qLoved').text(onequestion_selectedQuestion.likedCount+" loved, ");
    $('#qAnswered').text(onequestion_selectedQuestion.totalAnswerCount+" answered");
}


function widget_prepareOwnerInfo(){

    var fullname=onequestion_selectedQuestion.ownerFullName;
    $('#fullname_onequestion').html(fullname);

    var username=onequestion_selectedQuestion.owner;

    $('#avatarLink_onequestion').attr('href', 'http://trendocean.com/'+username);
    $('#avatarImg_onequestion').attr('src', onequestion_selectedQuestion.ownerSmallAvatarURL);

    $('#usernameLink_onequestion').attr('href', 'http://trendocean.com/'+username);
    $('#usernameLink_onequestion').text(username);


}


function widget_bindEventToNonAnsweredQuestion(){
    $('.answers').click(function(event){
        event.preventDefault();
        if(onequestion_selectedQuestion.answer=="-1"){
            for(i=0;i<10;i++){
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

function widget_bindEventToAnsweredQuestion(){
    $('.answers').click(function(event){
        event.preventDefault();
    });
}

function widget_signSelectedChoice(){
    for(i=0;i<10;i++){
        var choice=$('#answers_cho'+i);
        choice.removeClass();
        choice.addClass("answers_notselected");
    }
    onequestion_selectedChoice.addClass("answers_selected");
}

function widget_prepareChoiceDistribution(question){

    $.ajax({
        url: 'http://trendocean.com/api/answers/distributionp/'+widgetQuestionID,
        type: "GET",
        crossDomain:true,
        dataType: "jsonp",
        success: function(data){
            widget_prepareStatisticsIcon(question,data);
        },
        error:function (xhr){
            alert("failed");
        }
    });
    return false;
}


function widget_defineStatus(){

    $('#statistic_onequestion').hide();
    $('#ichoosethis_onequestion').hide();

    for(i=0;i<10;i++){
        $('#answers_cho'+i).data(DATA_CHOICE_INDEX,i);
        $('#ansright'+i).hide();
    }



    widget_prepareQuestionChoices(onequestion_selectedQuestion);
    if(onequestion_selectedQuestion.answer=="-1"){
        widget_bindEventToNonAnsweredQuestion(); //Second Status
    }else{
        widget_bindEventToAnsweredQuestion();          //Third Status
        onequestion_selectedChoice=$('#answers_cho'+onequestion_selectedQuestion.answer);
        widget_signSelectedChoice();
        widget_prepareChoiceDistribution(onequestion_selectedQuestion);
    }


}


function widget_displayQuestion(question){
    onequestion_selectedQuestion=question;
    $(".toQuestion").html(widgetQuestionDOM);
    $("#body_onequestion").text(question.body);
    widget_prepareOwnerInfo();
    widget_updateCreationDate();
    widget_updateLovedAndAnsweredCount();
    widget_defineStatus();
    $(".playericon").hide();


    $('#ichooseact_onequestion').live("click",function(event){
        event.preventDefault();
        widget_answerQuestion();
    });

}


function widget_getQuestion(){
    widgetQuestionID=$(".toQuestion").text();
    if(widgetQuestionID!=null){
        $.ajax({
            url: 'http://trendocean.com/api/questions/withjsonp/'+widgetQuestionID,
            type: "GET",
            crossDomain:true,
            dataType:"jsonp",
            success: function(data){
                widget_displayQuestion(data);
            },
            error:function (jqXHR, textStatus, errorThrown){
                jqXHR=jqXHR;
                alert("failed");
            }
        });
    }
}



getScript("https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
tryReady(0); // We will write this function later. It's responsible for waiting until jQuery loads before using it.

// dynamically load any javascript file.
function getScript(filename) {
    var script = document.createElement('script')
    script.setAttribute("type","text/javascript")
    script.setAttribute("src", filename)
    if (typeof script!="undefined")
        document.getElementsByTagName("head")[0].appendChild(script)
}



function tryReady(time_elapsed) {
    // Continually polls to see if jQuery is loaded.
    if (typeof $ == "undefined") { // if jQuery isn't loaded yet...
        if (time_elapsed <= 5000) { // and we havn't given up trying...
            setTimeout("tryReady(" + (time_elapsed + 200) + ")", 200); // set a timer to check again in 200 ms.
        } else {
            alert("Timed out while loading jQuery.")
        }
    } else {
        widget_getQuestion();
    }
}