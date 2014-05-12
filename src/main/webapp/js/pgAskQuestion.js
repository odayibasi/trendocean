var countOfChoice=2;
function reset(){
    $('#qBody').val("");
    $("input[id*='qAnsw']").val("");

    for(i=3;i<11;i++){
        $('#qAnswDiv'+i).hide();
        $('#qAnsw'+i+'Info').hide();
    }
    countOfChoice=2;
}

var youtube="<iframe title='YouTube video player' class='youtube-player' type='text/html' width='240' height='141' src='http://www.youtube.com/embed/$youtubecode$?wmode=transparent' frameborder='0'></iframe>";
var vimeo="<iframe src='http://player.vimeo.com/video/$vimeocode$' width='240' height='141' frameborder='0'></iframe>";
var htmlImgURL="<img src='{url}' width='240'  height='141'/>"
var soundCloud='<object id="toPlayer" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">'+
'<param name=movie" value="http://player.soundcloud.com/player.swf?url=http%3A%2F%2Fsoundcloud.com%2F$soundcloudCode1$%2F$soundcloudCode2$&enable_api=true&object_id=toPlayer"></param>'+
'<param name="allowscriptaccess" value="always"></param>'+
'<embed allowscriptaccess="always" height="81" src="http://player.soundcloud.com/player.swf?url=http%3A%2F%2Fsoundcloud.com%2F$soundcloudCode3$%2F$soundcloudCode4$&enable_api=true&object_id=toPlayer" type="application/x-shockwave-flash" width="240" name="toPlayer"></embed>'+
'</object>';

function askQuestion_preview(){
    var qText=$('#qBody').val();
    if(qText!=null && qText!=TEXT_NULL && common_isContainsMedia(qText)){
        qText=common_contentProcessing(qText, CONTENT_PROCESS_FOR_ASKED_QUESTION_PREVIEW);
        $('#qPreview').html(qText);
        $('#qPreview_upcover').show();
    }else{
        $('#qPreview').html("");
        $('#qPreview_upcover').hide();
    }
}



$(document).ready(function() {

    $('#qPreview_upcover').hide();
    $('#userNameAndLink').text(cookie_get(COOKIE_USERNAME));
    $('#userNameAndLink').attr("href",cookie_get(COOKIE_USERNAME));
    $('#userFullName').text(cookie_get(COOKIE_FULLNAME));
    $('#userAvatarLink').attr("href",cookie_get(COOKIE_USERNAME));
    $('#userAvatar').attr("src",cookie_get(COOKIE_AVATAR_SMALL_URL));

    theme_processDesign();
    document.title="TrendOcean / askquestion";
    mainBar_initialize();
    mainBar_initializeSearch(false);
    notifyBar_initialize();
    mainLinks_initialize(PAGE_ASKQUESTION);

    reset();
    askquick_checkAndPaste();




    $("#btnAddChoice").click(function(event){
        event.preventDefault();
        if(countOfChoice<10){
            countOfChoice++;
            $('#qAnswDiv'+countOfChoice).show();
            $('#qAnsw'+countOfChoice+'Info').show();
        }
    });

    $("#qBody").blur(function(event){
        askQuestion_preview();
    });


    $("#qBody").counter({
        dispID:"quepart_counter",
        goal:"140"
    });

    for(i=1;i<11;i++){
        $("#qAnsw"+i).counter({
            dispID:'qAnsw'+i+'Info',
            goal:"40"
        });
    }


    $("#btnAddQuestion").click(function(event){
        event.preventDefault();
        var question = new Object();
        question.body = $('#qBody').val();
        question.choices = new Array();

        for(i=0;i<countOfChoice;i++){
            question.choices[i]=new Object();
            question.choices[i].text= common_htmlStrip($('#qAnsw'+(i+1)).val());
        }
        var questionJSON = $.toJSON(question);

        var fillCount=0;
        for(i=0;i<countOfChoice;i++){
            if($('#qAnsw'+(i+1)).val()!=""){
                fillCount++;
            }
        }

        var choiceMaxOver=false;
        for(i=0;i<countOfChoice;i++){
            var chc=$('#qAnsw'+(i+1)).val();
            if(chc.length>40 && !common_isContainsSound(chc) && !common_isContainsLink0(chc) && !common_isContainsLink1(chc)){
                choiceMaxOver=true;
                break;
            }
        }


        if($('#qBody').val().length<5){
            notifyBar_display(ERR_MSG_QUESTION_BODY_MIN_LENGTH,ICON_URL_NOTIFY_WRONG);
        }else if(parseInt($('#quepart_counter').text())<0){
            notifyBar_display(ERR_MSG_QUESTION_BODY_MAX_LENGTH,ICON_URL_NOTIFY_WRONG);
        }else if( fillCount<2 ){
            notifyBar_display(ERR_MSG_QUESTION_CHOICE_COUNT_INVALID,ICON_URL_NOTIFY_WRONG);
        }else if( choiceMaxOver ){
            notifyBar_display(ERR_MSG_QUESTION_CHOICES_MAX_LENGTH,ICON_URL_NOTIFY_WRONG);
        }else{
            $.ajax({
                url: 'api/question/addQuestion',
                type: "POST",
                async:false,
                data: {
                  'questionJSON':questionJSON
                },
                success: function(resp){
                    var data=resp.data;
                    common_incrementAskQuestionCount();
                    window.location.href="questions/"+data.id;
                },
                error:function (xhr){
                    if(xhr.status==HTTP_STATUS_BAD_REQUEST){
                        notifyBar_display(xhr.responseText,ICON_URL_NOTIFY_WRONG);
                    }else{
                        notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
                    }
                }
            });
        }
        return false;
    });

    common_preventScreenFlash();
    $('#qBody').focus();

});





  