function cookie_wrap(definition, value, remindMe){

    if(remindMe==undefined){
        $.cookie(definition, value, {
            path: '/'
        });
    }else{
        $.cookie(definition, value, {
            expires: 30,
            path: '/'
        });
    }
    
}

function cookie_get(definition){
    return $.cookie(definition);
}


function cookie_saveLoginUser(loginUserInfo, remindMe){

    //Profile
    cookie_wrap(COOKIE_USERNAME,loginUserInfo.username, remindMe);
    cookie_wrap(COOKIE_EMAIL,loginUserInfo.email, remindMe);
    cookie_wrap(COOKIE_FULLNAME,loginUserInfo.fullName, remindMe);
    cookie_wrap(COOKIE_ABOUT,loginUserInfo.about, remindMe);
    cookie_wrap(COOKIE_CITY,loginUserInfo.cityName, remindMe );
    cookie_wrap(COOKIE_CITY_ID,loginUserInfo.cityCode, remindMe);
    cookie_wrap(COOKIE_COUNTRY,loginUserInfo.countryName, remindMe);
    cookie_wrap(COOKIE_COUNTRY_CODE,loginUserInfo.countryCode, remindMe);
    cookie_wrap(COOKIE_BIRTH,loginUserInfo.birthday, remindMe);
    cookie_wrap(COOKIE_GENDER,loginUserInfo.gender, remindMe);
    cookie_wrap(COOKIE_ACOUNT_STATE,loginUserInfo.acountState, remindMe);
    cookie_wrap(COOKIE_EDUCATION,loginUserInfo.education, remindMe);

    //Design
    cookie_wrap(COOKIE_AVATAR_SMALL_URL,loginUserInfo.profileOceanDesigns.smallAvatar, remindMe);
    cookie_wrap(COOKIE_AVATAR_LARGE_URL,loginUserInfo.profileOceanDesigns.largeAvatar,remindMe);
    cookie_wrap(COOKIE_BG_TILED,loginUserInfo.profileOceanDesigns.backgroundTiled, remindMe);
    cookie_wrap(COOKIE_BG_URL,loginUserInfo.profileOceanDesigns.backgroundURL, remindMe);
    cookie_wrap(COOKIE_BG_COLOR,loginUserInfo.profileOceanDesigns.backgroundColor, remindMe);
    cookie_wrap(COOKIE_THEME_NAME,loginUserInfo.profileOceanDesigns.themeName, remindMe);

    //Setting
    cookie_wrap(COOKIE_PROFILE_VISB,loginUserInfo.profileOceanSettings.profilePublic, remindMe);
    cookie_wrap(COOKIE_ANSWER_VISB,loginUserInfo.profileOceanSettings.answerVisibility, remindMe);
    cookie_wrap(COOKIE_NOTFY_WHENFRIENDASKEDQUESTION,loginUserInfo.profileOceanSettings.notifyWhenFriendsAskQuestion, remindMe);
    cookie_wrap(COOKIE_NOTFY_WHENMYQUESTIONARELOVED,loginUserInfo.profileOceanSettings.notifyWhenMyQuestionAreLoved, remindMe);
    cookie_wrap(COOKIE_NOTFY_WHENMYQUESTIONARECOMMENTED,loginUserInfo.profileOceanSettings.notifyWhenMyQuestionsAreCommented, remindMe);
    cookie_wrap(COOKIE_NOTFY_WHENMYQUESTIONAREFLAGGED,loginUserInfo.profileOceanSettings.notifyWhenMyQuestionsAreFlagged, remindMe);
    cookie_wrap(COOKIE_NOTFY_WHENSOMEBODYFOLLOWSME,loginUserInfo.profileOceanSettings.notifyWhenSomebodyFollowsMe, remindMe);
    cookie_wrap(COOKIE_NOTFY_WHENSOMEBODYSENDCOFFEE,loginUserInfo.profileOceanSettings.notifyWhenSomebodySendACoffe, remindMe);

    //Stat
    cookie_wrap(COOKIE_QUESTION_ANSWERED,loginUserInfo.profileOceanStats.questionsAnswered, remindMe);
    cookie_wrap(COOKIE_QUESTION_ASKED,loginUserInfo.profileOceanStats.questionsAsked, remindMe);
    cookie_wrap(COOKIE_QUESTION_FAVED,loginUserInfo.profileOceanStats.favoriteCount,remindMe);
    cookie_wrap(COOKIE_USERQUESTIONS_FAVED,loginUserInfo.profileOceanStats.questionsFavedCount,remindMe);
    cookie_wrap(COOKIE_FALLOWED_COUNT,loginUserInfo.profileOceanStats.followedCount, remindMe);
    cookie_wrap(COOKIE_FALLOWER_COUNT,loginUserInfo.profileOceanStats.followerCount,remindMe);

}


function cookie_clearLoginUser(){

    //Profile
    cookie_wrap(COOKIE_USERNAME,null, remindMe);
    cookie_wrap(COOKIE_EMAIL,null, remindMe);
    cookie_wrap(COOKIE_FULLNAME,null, remindMe);
    cookie_wrap(COOKIE_ABOUT,null, remindMe);
    cookie_wrap(COOKIE_CITY,null, remindMe );
    cookie_wrap(COOKIE_CITY_ID,null, remindMe);
    cookie_wrap(COOKIE_COUNTRY,null, remindMe);
    cookie_wrap(COOKIE_COUNTRY_CODE,null, remindMe);
    cookie_wrap(COOKIE_BIRTH,null, remindMe);
    cookie_wrap(COOKIE_GENDER,null, remindMe);
    cookie_wrap(COOKIE_ACOUNT_STATE,null, remindMe);
    cookie_wrap(COOKIE_EDUCATION,null, remindMe);

    //Design
    cookie_wrap(COOKIE_AVATAR_SMALL_URL,null, remindMe);
    cookie_wrap(COOKIE_AVATAR_LARGE_URL,null,remindMe);
    cookie_wrap(COOKIE_BG_TILED,null, remindMe);
    cookie_wrap(COOKIE_BG_URL,null, remindMe);
    cookie_wrap(COOKIE_BG_COLOR,null, remindMe);
    cookie_wrap(COOKIE_THEME_NAME,null, remindMe);

    //Setting
    cookie_wrap(COOKIE_PROFILE_VISB,null, remindMe);
    cookie_wrap(COOKIE_ANSWER_VISB,null, remindMe);
    cookie_wrap(COOKIE_NOTFY_WHENFRIENDASKEDQUESTION,null, remindMe);
    cookie_wrap(COOKIE_NOTFY_WHENMYQUESTIONARELOVED,null, remindMe);
    cookie_wrap(COOKIE_NOTFY_WHENMYQUESTIONARECOMMENTED,null, remindMe);
    cookie_wrap(COOKIE_NOTFY_WHENMYQUESTIONAREFLAGGED,null, remindMe);
    cookie_wrap(COOKIE_NOTFY_WHENSOMEBODYFOLLOWSME,null, remindMe);
    cookie_wrap(COOKIE_NOTFY_WHENSOMEBODYSENDCOFFEE,null, remindMe);

    //Stat
    cookie_wrap(COOKIE_QUESTION_ANSWERED,null, remindMe);
    cookie_wrap(COOKIE_QUESTION_ASKED,null, remindMe);
    cookie_wrap(COOKIE_QUESTION_FAVED,null,remindMe);
    cookie_wrap(COOKIE_USERQUESTIONS_FAVED,null,remindMe);
    cookie_wrap(COOKIE_FALLOWED_COUNT,null, remindMe);
    cookie_wrap(COOKIE_FALLOWER_COUNT,null,remindMe);

}
