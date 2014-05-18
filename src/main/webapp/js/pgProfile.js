if(redirection_toClearURL("../")){
//Do Nothing
}else{
    var anchor=jQuery.url.attr("anchor");
    if(anchor==null){
        var address=window.location.href+ANCHOR_MYQUESTIONS;
        window.location.href=address.replace("##", "#");
    }
}

theme_addCSSLink('profilebeta.css');
theme_addCSSLink('default.css');
theme_addCSSLink('dock.css');


var profileLoginUserName;
var profileUsername;
var profileFullName;
var profileCity;
var profileEducation;
var profileMail;
var profileAbout;
var profileMarginal;
var profileTrend;
var profileSmallAvatarURL;
var profileLargeAvatarURL;


var profileBgImageURL;
var profileBgImageTiled;

var profileScore=0;
var profileLovedCount=0;
var profileQuestionCount=0;
var profileAnsweredCount=0;
var profileQuestionsFavedCount=0;
var profileVisitedOtherCount=0;
var profileVerified=false;



var profileFollowedCount=0;
var profileFollowerCount=0;

var profileFollowing=TEXT_FALSE;
var profileFollowed=TEXT_FALSE;

var profileVisibility=TEXT_TRUE;


var profileHasLivePlayer=TEXT_FALSE;
var profileLivePlayerSource="";
var profileLivePlayerSlogan="";

var profileAskedTabVisb=TEXT_FALSE;
var profileAnsweredTabVisb=TEXT_FALSE;
var profileLovedTabVisb=TEXT_FALSE;

var profileCurrentAnchor=null;
var coffeeUpdateTimer=null;


function profile_isVisibleToLoginUser(){

    if(profileUsername==profileLoginUserName){
        return true;
    }

    if(profileVisibility==TEXT_TRUE){
        return true;
    }else{
        if(profileFollowing==TEXT_TRUE){
            return true;
        }
    }

    return false;
}


function fireAnchorTabChanged(currentAnchor){

    $('#podc_headline_main').hide();

    if(profile_isVisibleToLoginUser()){
        profileCurrentAnchor=currentAnchor;
        clearInterval(coffeeUpdateTimer);
        if(currentAnchor==ANCHOR_MYQUESTIONS){
            document.title="TrendOcean / "+profileUsername+"'s questions";
            profile_getQuestions(API_PROFILE_MYQUESTIONS);
        }else if(currentAnchor==ANCHOR_ANSWERED){
            document.title="TrendOcean / "+profileUsername+"'s answered";
            profile_getQuestions(API_PROFILE_ANSWEREDS);
        }else if (currentAnchor==ANCHOR_LOVED){
            document.title="TrendOcean / "+profileUsername+"'s loved";
            profile_getQuestions(API_PROFILE_FAVS);
        }else if (currentAnchor==ANCHOR_MYCOFFEE){
            document.title="TrendOcean / "+profileUsername+"'s coffee";
            profile_getMyCoffeees();
            coffeeUpdateTimer=setInterval("profile_getMyCoffeees()", UPDATE_DELAY_MYCOFFEE);
        }else if (currentAnchor==ANCHOR_DROPS){
            if(profileUsername==profileLoginUserName){
                document.title="TrendOcean / "+profileUsername+"'s drops";
                profile_getDrops();
                coffeeUpdateTimer=setInterval("profile_getDrops()", UPDATE_DELAY_MYCOFFEE);
            }else{
                window.location.href=PAGE_OPPS;
            }
        }
    }
}

function profile_setProfileInfo(){



    if(profile_isVisibleToLoginUser()){

        //Visibility
        $('#networks_profile').show();
        $('#education_profile').show();
        $('#email_profile').show();
        $('#about_profile').show();
        $('#trend_profile').show();

        $('#youme_trendocean').show();
        $('#profile_actions').show();
        $('#private_profile').hide();
        $('#seperator_networks').show();
        $('#seperator_email').show();

        $('#askQuickSection').hide();
        $('#navi_act').show(); //tabs
        $('#followTab').show();
        $('#btnMsg').hide(); //Not Used

        if(profileUsername==profileLoginUserName){
            $('#btnCoffee').hide();
        }else{
            $('#btnCoffee').show();
        }

        //Setting
        $('#fullname_profile').html(profileFullName);
        $('#username_profile').html(profileUsername);
        $('#photoID_profile').attr("src", profileSmallAvatarURL);

        $('#networks_profile').html(profileCity);
        $('#education_profile').html(profileEducation);
        $('#email_profile').html(profileMail);
        $('#about_profile').html(profileAbout);


        if(profileUsername==profileLoginUserName){
            $('#budgetquestionLabel_profile').text("you asked");
            $('#info_visit').text(profileVisitedOtherCount+" visit");
            $('#info_visit').show();
        }else{
            $('#budgetquestionLabel_profile').text(profileUsername+" asked");
            $('#info_visit').hide();
        }

        $('#budgetquestion_profile').text(profileQuestionCount+" questions");
        $('#budgetanswered_profile').html(profileAnsweredCount+" answered");
        $('#budgetlove_profile').html(profileLovedCount+" loved");
        $('#budgetLoveLabel_profile').text('and they loved '+ profileQuestionsFavedCount+' times.');




        coffeeDlg_setContent(profileUsername,cookie_get(COOKIE_USERNAME),profileSmallAvatarURL);
        followTab_setContent(profileUsername);
        followTab_followBtn_setContent();
        followTab_fillFollowers(12);
        followTab_fillFolloweds(12);
        

        $("#following_btnAll").text(TEXT_FOLLOWEDS+profileFollowedCount);
        $("#follower_btnAll").text(TEXT_FOLLOWERS+profileFollowerCount);

        //TabVisibility
        //Hidden
        if(profileUsername!=profileLoginUserName){
            $('#tab_drops').hide();
            $("#tab_mycoffee").hide();
        }
    }else{

        //Setting
        $('#fullname_profile').html(profileFullName);
        $('#username_profile').html(profileUsername);
        $('#photoID_profile').attr("src", profileSmallAvatarURL);
        $('#networks_profile').html(profileCity);
        $('#header_private').html(profileFullName+ "'s profile is private");
        $('#about_profile').html(profileAbout);

        coffeeDlg_setContent(profileUsername,cookie_get(COOKIE_USERNAME),profileSmallAvatarURL);
        followTab_setContent(profileUsername);
        followTab_followBtn_setContent();
       
        //Visibility
        $('#education_profile').hide();
        $('#email_profile').hide();
        $('#about_profile').show();
        $('#trend_profile').hide();
        $('#private_profile').show();

        $('#youme_trendocean').hide();
        $('#profile_actions').hide();
        $('#private_profile').show();
        $('#seperator_networks').hide();
        $('#seperator_email').hide();

        $('#askQuickSection').hide();
        $('#navi_act').hide();//tabs
        $('#followTab').hide();

        $('#btnCoffee').show();
        $('#btnMsg').show();

        tblCoffees_renderCoffees(null);
        tblQuestions_renderQuestions(null);
    }


    //verified
    if(profileVerified==TEXT_FALSE){
        $('#verified_profile').hide();
    }else{
        $('#verified_profile').show();
    }

    //design
    if(profileBgImageURL!=TEXT_NULL){
        $('body').css('background-position', '0px 0px');
        $('body').css('background-image',"url("+profileBgImageURL+")");
        if(profileBgImageTiled==TEXT_TRUE){
            $('body').css('background-repeat',"repeat");
        }else{
            $('body').css('background-repeat',"no-repeat");
        }
    }

}




function profile_updateProfile(){
    $.ajax({
        url:'../api/user/'+profileUsername,
        type: "GET",
        success: function(resp){
            var data=resp.data;
            profileFullName=data.fullName;
            profileCity=data.city;
            profileEducation=data.education;
            profileMail=data.email;
            profileAbout=data.about;
            profileMarginal=data.marginal
            profileQuestionCount=data.questionsAsked;
            profileQuestionsFavedCount=data.questionsFavedCount;
            profileAnsweredCount=data.questionsAnswered;
            profileLovedCount=data.favoriteCount;
            profileFollowedCount=data.followedCount;
            profileFollowerCount=data.followerCount;
            profileFollowing=data.following;
            profileFollowed=data.followed;
            profileSmallAvatarURL=data.smallAvatar;
            profileLargeAvatarURL=data.largeAvatar;
            profileVisibility=data.profilePublic;
            profileVisitedOtherCount=data.profileViewCount;
            profileTrend=data.trend
            profileBgImageURL=data.profileOceanDesigns.background;
            profileBgImageTiled=data.profileOceanDesigns.backgroundTiled;
            profileVerified=data.verified;
            profile_setProfileInfo();
            anchorTab_initialize();
            profileMatch_initialize();
            common_preventScreenFlash();
            profile_updateScore();

        },
        error:function (xhr){
            xhr=xhr;
            window.location.href=PAGE_OPPS;
        }
    });
    return false;
}




function profile_updateScore(){
    if(profileUsername!=profileLoginUserName){
        $.ajax({
            url: '../api/trends/'+profileUsername,
            type: "GET",
            success: function(data){
                var scoreObj=$.evalJSON(data);
                profileTrend=scoreObj.trend;

                var trendyOrMarginal=TEXT_TRENDY;
                var score="";
                if(profileMarginal==TEXT_TRUE){
                    trendyOrMarginal=TEXT_MARGINAL;
                    score=100-parseInt(parseFloat(profileTrend)*100);
                }else{
                    trendyOrMarginal=TEXT_TRENDY;
                    score=parseInt(parseFloat(profileTrend)*100);
                }
                $('#trend_profile').text(score+'% '+trendyOrMarginal);

            }
        });
        return false;
    }else{
        var userTrend= cookie_get(COOKIE_LOGINUSER_TREND);
        var trendyOrMarginal=TEXT_TRENDY;
        var isMarginal=cookie_get(COOKIE_MARGINAL)

        var score=0;
        if(isMarginal==TEXT_TRUE){
            trendyOrMarginal=TEXT_MARGINAL;
            score=100-parseInt(parseFloat(userTrend)*100);
        }else{
            score=parseInt(parseFloat(userTrend)*100);
        }
        $('#trend_profile').text(score+'% '+trendyOrMarginal);
    }
}

function profile_reflectActionsOnQuestions(actionType, question){
    if(profileUsername==profileLoginUserName){
        if(actionType==QACTIONS_ANSWERED){
            profileAnsweredCount=cookie_get(COOKIE_QUESTION_ANSWERED);
            $('#budgetanswered_profile').html(profileAnsweredCount+" answered");
        }else if(actionType==QACTIONS_FAVED){
            profileLovedCount=cookie_get(COOKIE_QUESTION_FAVED);
            $('#budgetlove_profile').html(profileLovedCount+" loved");
        }else if(actionType==QACTIONS_UNFAVED){
            profileLovedCount=cookie_get(COOKIE_QUESTION_FAVED);
            $('#budgetlove_profile').html(profileLovedCount+" loved");
            if(profileCurrentAnchor==ANCHOR_LOVED){
                tblQuestions_removeQuestion(question.id);
            }
        }
    }
}


function profile_getQuestions(apiURL){
    $.ajax({
        url: apiURL+profileUsername,
        type: "GET",
        success: function(data){
            tblQuestions_renderQuestions(data);
            return false;
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
        }
    });
    return false;
}


function profile_getMoreQuestions(apiURL){
    
    var length=0;
    if(display_questions!=null){
        length=display_questions.length;
    }

    if(length>0){
        var qID=display_questions[length-1].id;
        $('#tableLoadingIcon').show();
        $.ajax({
            url: apiURL+profileUsername+'?startIndex='+qID+'&size=20',
            type: "GET",
            success: function(data){
                if(data!=null){
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
    }
    return false;
}


function profile_getMyCoffeees(){
    $.ajax({
        url: '../api/messages/public/'+profileUsername,
        type: "GET",
        success: function(data){
            tblCoffees_renderCoffees(data);
            if(profileLoginUserName==profileUsername){
                $('#coffees_MainBar_Count').hide();
                $('#coffees_MainBar_Count').text("0"); //Reset Main Bar
            }
            return false;
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
        }
    });
    return false;
}

function profile_getMoreMyCoffeees(){
    var length=display_coffees.length;
    if(length>0){
        var cID=display_coffees[length-1].id;
        $('#tableLoadingIcon').show();
        $.ajax({
            url: API_PROFILE_COFFEES+profileUsername+'?startIndex='+cID+'&size=20',
            type: "GET",
            success: function(data){
                if(data!=null){
                    data.message=display_coffees.concat(data.message);
                    tblCoffees_renderCoffees(data);
                }
                $('#tableLoadingIcon').hide();
            },
            error:function (xhr){
                $('#tableLoadingIcon').hide();
                notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
            }
        });
    }
    return false;
}


function profile_getDrops(){
    $.ajax({
        url: '../api/notification/',
        type: "GET",
        success: function(data){
            tblNotifications_render(data);
            if(profileLoginUserName==profileUsername){
                $('#drops_MainBar_Count').hide();
                $('#drops_MainBar_Count').text("0"); //Reset Main Bar
            }
            return false;
        },
        error:function (xhr){
            notifyBar_display(ERR_MSG_WEBSERVICE+":"+xhr.status,ICON_URL_NOTIFY_WRONG);
        }
    });
    return false;
}


function profile_getMoreDrops(){
//Do Nothing
}


$(document).ready(function() {

    profileUsername=common_getURLSegment(1);
    profileLoginUserName=cookie_get(COOKIE_USERNAME);
    mainLinks_initialize(PAGE_PROFILE);
    shareDlg_initialize();
    coffeeDlg_initialize($("#btnCoffee"), PAGE_PROFILE);
    followTab_fallowBtn_initialize($("#btnFollow"));

    $("#askquick_textArea").counter({
        dispID:"asknow_counter",
        goal:"140"
    });

    $("#headerdock").hide();
    $('.right-person-navi').show();
    mainBar_signPageName(MAINBAR_LINK_PROFILE);
    $(window).unload(function() {
         mainBar_unsignPageName(MAINBAR_LINK_PROFILE);
    });

    mainBar_initialize();
    mainBar_initializeSearch();
    notifyBar_initialize();
    askquick_initialize();
    tblQuestions_initialize(PAGE_PROFILE);
    tblCoffees_initialize();
    tblNotifications_initialize();
    profile_updateProfile();

    common_registerMoreActionListener(function(){

        if ( $('#tableLoadingIcon').is(':visible')==false){
            if(profileCurrentAnchor==ANCHOR_MYQUESTIONS){
                profile_getMoreQuestions(API_PROFILE_MYQUESTIONS);
            }else if(profileCurrentAnchor==ANCHOR_ANSWERED){
                profile_getMoreQuestions(API_PROFILE_ANSWEREDS);
            }else if (profileCurrentAnchor==ANCHOR_LOVED){
                profile_getMoreQuestions(API_PROFILE_FAVS);
            }else if (profileCurrentAnchor==ANCHOR_MYCOFFEE){
                profile_getMoreMyCoffeees();
            }else if (profileCurrentAnchor==ANCHOR_PODCAST){
                profile_getMorePodcasts();
            }else if (profileCurrentAnchor==ANCHOR_DROPS){
                profile_getMoreDrops();
            }
        }
    });

    //SEO Message
    $('#dlgMsg_title').text("Message");
    $('#dlgMsg_info').text("Send Trend Ocean a message:");
    $('#message_labelText').text("message:");
    $('#message_textcounter').text("300");
    $('#dlgMsg_lblSucceed').text("your  message has been sent.");
    $('#dlgMsg_sendBtn').text("send");

    //SEO Coffee
    $('#dlgCoffee_Title').text("Coffee");
    $('#dlgCoffee_lblSucceed').text("your coffee was sent.");
    $('#dlgCoffee_sendBtn').text("send");

    //SEO Share
    $('#dlgShare_Title').text("Share");
    $('#dlgShare_Info').text("Share one question via:");
    $('#dlgMsg_info').text("Share this question with your friend:");
    $('#dlgShareEmail_Label').text("e-mail:");
    $('#dlgShareEmail_succeedLabel').text("shared via e-mail");
    $('#dlgShareEmail_sendBtn').text("share");

    $('#locked_text').html('When oceaner hide her/his answers from settings, the answer is not visible to everyone and you see locked image. for more information: <a href="http://trendocean.com/privacy.html">answer visibility</a>');
    $('#qRelated_More').text('more');
    $('#questionRelatedUsersTitle').text("Answered");

    //SEO MainBar
    $('#settings_MainBar').text("Settings");
    $('#following_MainBar').text("Following");
    $('#followers_MainBar').text("Followers");
    $('#logout_MainBar').text("Sign Out");
    $('#myOcean_MainBar').text("My Ocean");
    $('#profile_MainBar').text("Profile");
    $('#trendradar_MainBar').text("trendradar");
    $('#addQuestion_MainBar').text("add question");

    //SEO MainLinks (Common)
    $('#toMark').text("© 2011 TrendOcean");
    $('#aboutLink').text("About Us");
    $('#blogLink').text("Blog");
    $('#teamLink').text("Team");
    $('#businessLink').text("Business");
    $('#helpLink').text("Help");
    $('#termsLink').text("Terms");

});

