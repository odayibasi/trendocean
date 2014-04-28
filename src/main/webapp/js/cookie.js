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

    cookie_wrap(COOKIE_ABOUT,loginUserInfo.about, remindMe);
    cookie_wrap(COOKIE_ACOUNT_STATE,loginUserInfo.acountState, remindMe);
    cookie_wrap(COOKIE_BIRTH,loginUserInfo.birthday, remindMe);
    cookie_wrap(COOKIE_CITY,loginUserInfo.city, remindMe );
    cookie_wrap(COOKIE_CITY_ID,loginUserInfo.cityID, remindMe);
    cookie_wrap(COOKIE_COUNTRY,loginUserInfo.country, remindMe);
    cookie_wrap(COOKIE_COUNTRY_CODE,loginUserInfo.countryCode, remindMe);
    cookie_wrap(COOKIE_EDUCATION,loginUserInfo.education, remindMe);
    cookie_wrap(COOKIE_EMAIL,loginUserInfo.email, remindMe);
    cookie_wrap(COOKIE_FALLOWED_COUNT,loginUserInfo.followedCount, remindMe);
    cookie_wrap(COOKIE_FALLOWER_COUNT,loginUserInfo.followerCount,remindMe);
    cookie_wrap(COOKIE_AVATAR_SMALL_URL,loginUserInfo.smallAvatarURL, remindMe);
    cookie_wrap(COOKIE_AVATAR_LARGE_URL,loginUserInfo.largeAvatarURL,remindMe);
    cookie_wrap(COOKIE_FULLNAME,loginUserInfo.fullName, remindMe);
    cookie_wrap(COOKIE_GENDER,loginUserInfo.gender, remindMe);
    cookie_wrap(COOKIE_LANGUAGE,loginUserInfo.language, remindMe);
    cookie_wrap(COOKIE_MARGINAL,loginUserInfo.marginal, remindMe);
    cookie_wrap(COOKIE_QUESTION_ANSWERED,loginUserInfo.questionsAnswered, remindMe);
    cookie_wrap(COOKIE_QUESTION_ASKED,loginUserInfo.questionsAsked, remindMe);
    cookie_wrap(COOKIE_QUESTION_FAVED,loginUserInfo.favoriteCount,remindMe);
    cookie_wrap(COOKIE_USERQUESTIONS_FAVED,loginUserInfo.questionsFavedCount,remindMe);


    cookie_wrap(COOKIE_BG_TILED,loginUserInfo.design.backgroundTiled, remindMe);
    cookie_wrap(COOKIE_BG_URL,loginUserInfo.design.backgroundURL, remindMe);
    cookie_wrap(COOKIE_BG_COLOR,loginUserInfo.design.backgroundColor, remindMe);
    cookie_wrap(COOKIE_THEME_NAME,loginUserInfo.design.themeName, remindMe);

    cookie_wrap(COOKIE_ANSWER_VISB,loginUserInfo.answerVisibility, remindMe);
    cookie_wrap(COOKIE_EMAIL_VISB,loginUserInfo.emailPublic, remindMe);
    cookie_wrap(COOKIE_PROFILE_VISB,loginUserInfo.profilePublic, remindMe);

    cookie_wrap(COOKIE_NOTFY_WHENFRIENDASKEDQUESTION,loginUserInfo.notifications.notifyWhenFriendsAskQuestion, remindMe);
    cookie_wrap(COOKIE_NOTFY_WHENMYQUESTIONARELOVED,loginUserInfo.notifications.notifyWhenMyQuestionAreLoved, remindMe);
    cookie_wrap(COOKIE_NOTFY_WHENMYQUESTIONARECOMMENTED,loginUserInfo.notifications.notifyWhenMyQuestionsAreCommented, remindMe);
    cookie_wrap(COOKIE_NOTFY_WHENMYQUESTIONAREFLAGGED,loginUserInfo.notifications.notifyWhenMyQuestionsAreFlagged, remindMe);
    cookie_wrap(COOKIE_NOTFY_WHENSOMEBODYFOLLOWSME,loginUserInfo.notifications.notifyWhenSomebodyFollowsMe, remindMe);
    cookie_wrap(COOKIE_NOTFY_WHENSOMEBODYSENDCOFFEE,loginUserInfo.notifications.notifyWhenSomebodySendACoffe, remindMe);


    cookie_wrap(COOKIE_CAPABILITY_OF_HASLIVEPLAYER,loginUserInfo.capabilities.hasLivePlayer,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_LIVEPLAYERSOURCE,loginUserInfo.capabilities.livePlayerCapability.source,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_LIVEPLAYERSLOGAN,loginUserInfo.capabilities.livePlayerCapability.slogan,remindMe);

    cookie_wrap(COOKIE_CAPABILITY_OF_HASPODCASTTAB,loginUserInfo.capabilities.hasPodcastTab,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST0_TITLE,loginUserInfo.capabilities.podcastCapability.podcast0Title,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST0_URL,loginUserInfo.capabilities.podcastCapability.podcast0URL,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST1_TITLE,loginUserInfo.capabilities.podcastCapability.podcast1Title,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST1_URL,loginUserInfo.capabilities.podcastCapability.podcast1URL,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST2_TITLE,loginUserInfo.capabilities.podcastCapability.podcast2Title,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST2_URL,loginUserInfo.capabilities.podcastCapability.podcast2URL,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST3_TITLE,loginUserInfo.capabilities.podcastCapability.podcast3Title,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST3_URL,loginUserInfo.capabilities.podcastCapability.podcast3URL,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST4_TITLE,loginUserInfo.capabilities.podcastCapability.podcast4Title,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST4_URL,loginUserInfo.capabilities.podcastCapability.podcast4URL,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST5_TITLE,loginUserInfo.capabilities.podcastCapability.podcast5Title,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST5_URL,loginUserInfo.capabilities.podcastCapability.podcast5URL,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST6_TITLE,loginUserInfo.capabilities.podcastCapability.podcast6Title,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST6_URL,loginUserInfo.capabilities.podcastCapability.podcast6URL,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST7_TITLE,loginUserInfo.capabilities.podcastCapability.podcast7Title,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST7_URL,loginUserInfo.capabilities.podcastCapability.podcast7URL,remindMe);

    cookie_wrap(COOKIE_CAPABILITY_OF_TABVISB,loginUserInfo.capabilities.hasTabVisbConfig,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_ASKED_TAB_VISB,loginUserInfo.capabilities.tabVisibiltyCapability.askedTabVisb,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_ANSWERED_TAB_VISB,loginUserInfo.capabilities.tabVisibiltyCapability.answeredTabVisb,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_LOVED_TAB_VISB,loginUserInfo.capabilities.tabVisibiltyCapability.lovedTabVisb,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_DROPS_TAB_VISB,loginUserInfo.capabilities.tabVisibiltyCapability.dropsTabVisb,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_COFFEES_TAB_VISB,loginUserInfo.capabilities.tabVisibiltyCapability.coffeeTabVisb,remindMe);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST_TAB_VISB,loginUserInfo.capabilities.tabVisibiltyCapability.podcastTabVisb,remindMe);

    cookie_wrap(COOKIE_LOGINUSER_TREND, loginUserInfo.trend, remindMe)
    cookie_wrap(COOKIE_SIGNIN,COOKIE_SIGNIN_VAL, remindMe);
    cookie_wrap(COOKIE_ACTIVATED,loginUserInfo.accountState, remindMe);
    cookie_wrap(COOKIE_USERNAME,loginUserInfo.username, remindMe);

}


function cookie_clearLoginUser(){

    cookie_wrap(COOKIE_ABOUT,null);
    cookie_wrap(COOKIE_ACOUNT_STATE,null);
    cookie_wrap(COOKIE_BIRTH,null);
    cookie_wrap(COOKIE_CITY,null);
    cookie_wrap(COOKIE_CITY_ID,null);
    cookie_wrap(COOKIE_COUNTRY,null);
    cookie_wrap(COOKIE_COUNTRY_CODE,null);
    cookie_wrap(COOKIE_EDUCATION,null);
    cookie_wrap(COOKIE_EMAIL,null);
    cookie_wrap(COOKIE_FALLOWED_COUNT,null);
    cookie_wrap(COOKIE_FALLOWER_COUNT,null);
    cookie_wrap(COOKIE_AVATAR_SMALL_URL,null);
    cookie_wrap(COOKIE_AVATAR_LARGE_URL,null);
    cookie_wrap(COOKIE_FULLNAME,null);
    cookie_wrap(COOKIE_GENDER,null);
    cookie_wrap(COOKIE_LANGUAGE,null);
    cookie_wrap(COOKIE_MARGINAL,null);
    cookie_wrap(COOKIE_QUESTION_ANSWERED,null);
    cookie_wrap(COOKIE_QUESTION_ASKED,null);
    cookie_wrap(COOKIE_QUESTION_FAVED,null);
    cookie_wrap(COOKIE_USERQUESTIONS_FAVED,null);

    cookie_wrap(COOKIE_BG_TILED,null);
    cookie_wrap(COOKIE_BG_URL,null);
    cookie_wrap(COOKIE_BG_COLOR,null);
    cookie_wrap(COOKIE_THEME_NAME,null);

    cookie_wrap(COOKIE_ANSWER_VISB,null);
    cookie_wrap(COOKIE_EMAIL_VISB,null);
    cookie_wrap(COOKIE_PROFILE_VISB,null);

    cookie_wrap(COOKIE_NOTFY_WHENFRIENDASKEDQUESTION,null);
    cookie_wrap(COOKIE_NOTFY_WHENMYQUESTIONARELOVED,null);
    cookie_wrap(COOKIE_NOTFY_WHENMYQUESTIONARECOMMENTED,null);
    cookie_wrap(COOKIE_NOTFY_WHENMYQUESTIONAREFLAGGED,null);
    cookie_wrap(COOKIE_NOTFY_WHENSOMEBODYFOLLOWSME,null);
    cookie_wrap(COOKIE_NOTFY_WHENSOMEBODYSENDCOFFEE,null);

    cookie_wrap(COOKIE_CAPABILITY_OF_HASLIVEPLAYER,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_LIVEPLAYERSOURCE,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_LIVEPLAYERSLOGAN,null);

    cookie_wrap(COOKIE_CAPABILITY_OF_HASPODCASTTAB,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST0_TITLE,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST0_URL,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST1_TITLE,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST1_URL,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST2_TITLE,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST2_URL,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST3_TITLE,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST3_URL,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST4_TITLE,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST4_URL,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST5_TITLE,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST5_URL,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST6_TITLE,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST6_URL,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST7_TITLE,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST7_URL,null);

    cookie_wrap(COOKIE_CAPABILITY_OF_TABVISB,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_ASKED_TAB_VISB,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_ANSWERED_TAB_VISB,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_LOVED_TAB_VISB,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_DROPS_TAB_VISB,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_COFFEES_TAB_VISB,null);
    cookie_wrap(COOKIE_CAPABILITY_OF_PODCAST_TAB_VISB,null);


    cookie_wrap(COOKIE_LOGINUSER_TREND, null);
    cookie_wrap(COOKIE_SIGNIN,null);
    cookie_wrap(COOKIE_USERNAME,null);
    cookie_wrap(COOKIE_ACTIVATED, null);
    cookie_wrap(COOKIE_REMEMBERME,null);

}
