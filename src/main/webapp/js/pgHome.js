if(redirection_toClearURL()){
//Do Nothing
}else if(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL){
    redirection_execute(PAGE_HOME, PAGE_INDEX, ERR_MSG_PLEASE_SIGNIN);
}


//Theme Settings
theme_addCSSLink('home.css');
theme_addCSSLink('default.css');
theme_addCSSLink('dock.css');

var searchPageIndex=1;
var homeQuestionQueryMode=QUESTIONS_IN_LATEST;
var homeQuestionUpdateRequired=false;

function home_updateQuestiotblComments(){
    homeQuestionUpdateRequired=false;
    if(homeQuestionQueryMode==QUESTIONS_IN_FOLLOW){
        $("#btnFriendsLatest").click();
    }else if(homeQuestionQueryMode==QUESTIONS_IN_LATEST){
        $("#btnLatest").click();
    }else if(homeQuestionQueryMode==QUESTIONS_IN_TODAY){
        $("#btnTodaySpecials").click();
    }else if(homeQuestionQueryMode==QUESTIONS_IN_PROMOTED){
        $("#btnPromoted").click();
    }else{
        $("#btnMostPopular").click();
    }
}


function home_automaticUpdate(){
    if($(window).scrollTop()==0 && selected_question==null){
        home_updateQuestiotblComments();
    }else{
        homeQuestionUpdateRequired=true;
    }
}

function home_removeQuickLinksClass(){
    $("#btnFriendsLatest").removeClass();
    $("#btnMostPopular").removeClass();
    $("#btnLatest").removeClass();
    $("#btnTodaySpecials").removeClass();
    $("#btnPromoted").removeClass();
}

function home_setQuestionQueryMode(mode){
    homeQuestionQueryMode=mode;
    home_removeQuickLinksClass();
    switch(homeQuestionQueryMode){
        case  QUESTIONS_IN_PROMOTED:
            $("#btnFriendsLatest").addClass("quick_link");
            $("#btnMostPopular").addClass("quick_link");
            $("#btnLatest").addClass("quick_link");
            $("#btnTodaySpecials").addClass("quick_link");
            $("#btnPromoted").addClass("quick_link_selected");
            break;
        case  QUESTIONS_IN_LATEST:
            $("#btnFriendsLatest").addClass("quick_link");
            $("#btnMostPopular").addClass("quick_link");
            $("#btnLatest").addClass("quick_link_selected");
            $("#btnTodaySpecials").addClass("quick_link");
            $("#btnPromoted").addClass("quick_link");
            break;
        case  QUESTIONS_IN_YEAR:
            $("#btnFriendsLatest").addClass("quick_link");
            $("#btnMostPopular").addClass("quick_link_selected");
            $("#btnLatest").addClass("quick_link");
            $("#btnTodaySpecials").addClass("quick_link");
            $("#btnPromoted").addClass("quick_link");
            break;
        case  QUESTIONS_IN_TODAY:
            $("#btnFriendsLatest").addClass("quick_link");
            $("#btnMostPopular").addClass("quick_link");
            $("#btnLatest").addClass("quick_link");
            $("#btnTodaySpecials").addClass("quick_link_selected");
            $("#btnPromoted").addClass("quick_link");
            break;
        default:
            $("#btnFriendsLatest").addClass("quick_link_selected");
            $("#btnMostPopular").addClass("quick_link");
            $("#btnLatest").addClass("quick_link");
            $("#btnTodaySpecials").addClass("quick_link");
            $("#btnPromoted").addClass("quick_link");
            break;
    }
}


function home_getPromotedQuestions(){
    home_setQuestionQueryMode(QUESTIONS_IN_PROMOTED);
    $.ajax({
        url: 'api/questions/promoted?size=50',
        type: "GET",
        success: function(data){
            tblQuestions_renderQuestions(data);
            return false;
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
        }
    });
}

function home_displayMorePromotedQuestions(){

    $('#tableLoadingIcon').show();
    var length=display_questions.length;
    if(length>0){
        var qID=display_questions[length-1].id;
        $.ajax({
            url: 'api/questions/promoted?startQuestion='+qID+'&size=20',
            type: "GET",
            success: function(data){
                if(data!=null){
                    data.question=display_questions.concat(data.question);
                    tblQuestions_renderQuestions(data);
                }
                $('#tableLoadingIcon').hide();
                return false;
            },
            error:function (xhr){
                $('#tableLoadingIcon').hide();
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
            }
        });
    }
}



function home_getFollowedQuestions(){
    home_setQuestionQueryMode(QUESTIONS_IN_FOLLOW);
    $.ajax({
        url: 'api/questions/followed?size=20',
        type: "GET",
        success: function(data){
            tblQuestions_renderQuestions(data);
            return false;
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
        }
    });
}


function home_displayMoreFollowedQuestions(){

    $('#tableLoadingIcon').show();
    var length=display_questions.length;
    if(length>0){
        var qID=display_questions[length-1].id;
        $.ajax({
            url: 'api/questions/followed?startQuestion='+qID+'&size=20',
            type: "GET",
            success: function(data){
                if(data!=null){
                    data.question=display_questions.concat(data.question);
                    tblQuestions_renderQuestions(data);
                }
                $('#tableLoadingIcon').hide();
                return false;
            },
            error:function (xhr){
                $('#tableLoadingIcon').hide();
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
            }
        });
    }
}



function home_getLatestQuestions(){
    home_setQuestionQueryMode(QUESTIONS_IN_LATEST);
    $.ajax({
        url: 'api/qstream/listLatestQuestion',
        data:{
          'startIndex':0,
          'endIndex':20
        },
        type: "GET",
        success: function(data){
            tblQuestions_renderQuestions(data);
            return false;
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
        }
    });
}

function home_displayMoreLatestQuestions(){

    $('#tableLoadingIcon').show();
    var length=display_questions.length;
    if(length>0){
        var qID=display_questions[length-1].id;
        $.ajax({
            url: 'api/questions?startIndex='+qID+'&size=20',
            type: "GET",
            success: function(data){
                if(data!=null){
                    data.question=display_questions.concat(data.question);
                    tblQuestions_renderQuestions(data);
                }
                $('#tableLoadingIcon').hide();
                return false;
            },
            error:function (xhr){
                $('#tableLoadingIcon').hide();
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
            }
        });
    }
}


function home_getPopularQuestions(type){
    home_setQuestionQueryMode(type);
    $.ajax({
        url: 'api/questions/popular?type='+type,
        type: "GET",
        success: function(data){
            tblQuestions_renderQuestions(data);
            return false;
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
        }
    });
}

function home_displayMorePopularQuestions(){

    $('#tableLoadingIcon').show();
    var length=display_questions.length;
    if(length>0){
        $.ajax({
            url: 'api/questions/popular?type='+homeQuestionQueryMode+'&startIndex='+length,
            type: "GET",
            success: function(data){
                if(data!=null){
                    data.question=display_questions.concat(data.question);
                    tblQuestions_renderQuestions(data);
                }
                $('#tableLoadingIcon').hide();
                return false;
            },
            error:function (xhr){
                $('#tableLoadingIcon').hide();
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
            }
        });
    }
}


function home_displayMoreSearchQuestions(){

    $('#tableLoadingIcon').show();
    $.ajax({
        url: 'api/questions/search?searchTerm='+QUESTIONS_IN_TRENDS_TYPE+'&pageIndex='+searchPageIndex,
        type: "GET",
        success: function(data){
            if(data!=null){
                searchPageIndex++;
                data.question=display_questions.concat(data.question);
                tblQuestions_renderQuestions(data);
            }
            $('#tableLoadingIcon').hide();
        },
        error:function (xhr){
            $('#tableLoadingIcon').hide();
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
        }
    });
    return false;
}



function home_searchInQuestions(searchText){
    searchPageIndex=1;
    home_setQuestionQueryMode(QUESTIONS_IN_TRENDS);
    QUESTIONS_IN_TRENDS_TYPE=searchText;
    $.ajax({
        url: 'api/questions/search?searchTerm='+searchText,
        type: "GET",
        success: function(data){
            tblQuestions_renderQuestions(data);
        },
        error:function (){
            tblQuestions_renderQuestions();
        }
    });
    return false;
}


$(document).ready(function() {

    if(cookie_get(COOKIE_SIGNIN)!=COOKIE_SIGNIN_VAL || redirection_isURLContainsSSLOrWWW()){
        return;
    } 

    theme_processDesign();
    document.title="TrendOcean / "+cookie_get(COOKIE_USERNAME)+"'s home";
    mainBar_signPageName(MAINBAR_LINK_MYOCEAN);
    $(window).unload(function() {
        mainBar_unsignPageName(MAINBAR_LINK_MYOCEAN);
    });


    mainLinks_initialize(PAGE_HOME);
    mainBar_initialize();
    mainBar_initializeSearch();
    notifyBar_initialize();
    redirection_executeOrderAfterNewPageLoad();
    shareDlg_initialize();
    askquick_initialize();

    profileTab_initialize();
    profileTab_setContent();

    tblQuestions_initialize();
    coffeeDlg_initialize();
    home_getLatestQuestions();

    homeTrb_initialize();

    $("#askquick_textArea").counter({
        dispID:"asknow_counter",
        goal:"140",
        dispIDColor:"#ccc"
    });

    $('.answers_cho').click(function(){
        var answer = new Object();
        answer.questionID = selected_question.id;
        answer.choiceIndex ="2";
        var answerJSON = $.toJSON(answer);
        $.ajax({
            url: 'api/answers',
            type: "POST",
            data: (answerJSON),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function(){
                $("#rounder").show();
                $("#que_linked_part1").show();
                $("#que_linked_part2").show();
            },
            error:function (xhr){
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
            }
        });

        return false;
    });


    common_preventScreenFlash();
    common_registerMoreActionListener(function(){

        if ( $('#tableLoadingIcon').is(':visible')==false){
            if(homeQuestionQueryMode==QUESTIONS_IN_FOLLOW){
                home_displayMoreFollowedQuestions();
            }else if(homeQuestionQueryMode==QUESTIONS_IN_LATEST){
                home_displayMoreLatestQuestions();
            }else if(homeQuestionQueryMode==QUESTIONS_IN_PROMOTED){
                //home_displayMorePromotedQuestions();
                //home_getPromotedQuestions();
            }else if(homeQuestionQueryMode==QUESTIONS_IN_TRENDS){
                home_displayMoreSearchQuestions();

            }else{
                home_displayMorePopularQuestions(homeQuestionQueryMode);
            }
        }
    });


    setInterval("home_automaticUpdate()", 90000);
    $(window).scroll(function() {
        if  ($(window).scrollTop()==0 && selected_question==null && homeQuestionUpdateRequired==true){
            home_updateQuestiotblComments();
        }
    });

    //$("#btnLatest").hide();
    $("#btnPromoted").hide();

});





