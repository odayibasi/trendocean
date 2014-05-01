if(cookie_get(COOKIE_SIGNIN)==COOKIE_SIGNIN_VAL){
    window.location.href=PAGE_HOME;
}else{
    redirection_toClearURL();
}


var liveQuestionUpdater=null;
var counter=0;
var latestQuestions=null;


function fillLiveQuestion(iLiveQ, iLatestQ){

    index=iLatestQ%20;
    var question=latestQuestions[index];
    if(question!=null){
        $("#liveq"+iLiveQ).attr("href","question/"+question.id);
        $("#liveq"+iLiveQ+"_avatar").attr("src",question.ownerSmallAvatarURL);
        $("#liveq"+iLiveQ+"_fullName").text("by "+question.ownerFullName);

        var date=common_getRemainingTime(question.creationDate);
        var loves=question.likedCount;
        var comments=question.numberOfComments;
        var answers= question.totalAnswerCount;

        $("#liveq"+iLiveQ+"_prop").text(date+"-"+answers+" answered, "+comments+" comments, "+loves+" love");

        var qBodySum="";
        if(question.body.length>40){
            qBodySum=question.body.substr(0, 40)+"...";
        }else{
            qBodySum=question.body+" ";
        }
        $("#liveq"+iLiveQ+"_question").text(qBodySum);

    }

}


function index_getLatestQuestions(){
    $.ajax({
        url: 'api/qstream/listLatestQuestion',
        data:{
            'startIndex':0,
            'endIndex':20
        },
        type: "GET",
        success: function(resp){
            latestQuestions=resp.data;
            fillLiveQuestion(0, 0);
            fillLiveQuestion(1, 1);
            fillLiveQuestion(2, 2);
            fillLiveQuestion(3, 3);
            liveQuestionUpdater=setInterval("index_updateQuestion()", 5000);
            return false;
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+ ":"+xhr.status,ICON_URL_NOTIFY_WRONG);
        }
    });
}


function index_animate(qFirst, qNext, qFirstIndex,counter){
    qFirst.toggle("slow",  function() {
        qFirst.insertAfter(qNext);
        fillLiveQuestion(qFirstIndex, counter+4)
        qFirst.show();
    });

}

function index_updateQuestion(){
    if(counter%4==0){
        index_animate($("#liveq0"),$("#liveq1"),0,counter);
    }else if(counter%4==1){
        index_animate($("#liveq2"),$("#liveq3"),2,counter);
    }else if(counter%4==2){
        index_animate($("#liveq1"),$("#liveq0"),1,counter);
    }else if(counter%4==3){
        index_animate($("#liveq3"),$("#liveq2"),3,counter);
    }
    counter++;
}




$(document).ready(function() {

    if(cookie_get(COOKIE_SIGNIN)==COOKIE_SIGNIN_VAL || redirection_isURLContainsSSLOrWWW()){
        return;
    }
    
    notifyBar_initialize();
    mainLinks_initialize(PAGE_INDEX);
    redirection_executeOrderAfterNewPageLoad();
    authentication_initialize(PAGE_INDEX);
    index_getLatestQuestions();
   

});

$(document).keydown(function(event) {
    if (event.keyCode == KEY_ENTER) {
        event.preventDefault();
        $("#btnLogin").click();
    }
});


